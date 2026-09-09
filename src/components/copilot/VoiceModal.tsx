import React, { useState, useEffect, useRef } from 'react';
import { X, Mic, MicOff, Volume2, Globe, ArrowRight, Sparkles, Key, AlertCircle, RefreshCw } from 'lucide-react';
import { useDemoMode } from '../../context/DemoModeContext';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import {
  SUPPORTED_LANGUAGES,
  hasSarvamApiKey,
  transcribeWithSarvam,
  synthesizeSpeechWithSarvam,
  interpretVoiceIntent,
  resolveTargetLanguage,
} from '../../services/sarvamService';

type VoiceState = 'idle' | 'recording' | 'transcribing' | 'analyzing' | 'ready' | 'error';

const PRESET_QUERIES = [
  {
    lang: 'hi',
    langName: 'Hindi',
    text: 'दिल्ली से मुंबई का एयरफेयर आज क्यों बढ़ रहा है?',
    subtext: 'Delhi se Mumbai ka airfare aaj kyun badh raha hai?',
    targetRoute: '/route?id=DEL-BOM',
    summary: 'मौसम और रनवे मेंटेनेंस के कारण दिल्ली-मुंबई का किराया 28.4% बढ़ा है।'
  },
  {
    lang: 'mr',
    langName: 'Marathi',
    text: 'मुंबई विमानतळावरून कोणते मार्ग सर्वात जास्त सर्ज करत आहेत?',
    subtext: 'Mumbai vimanatala-varun konte marga sarvat jasta surge karat ahet?',
    targetRoute: '/surges',
    summary: 'मुंबईशी जोडलेले DEL, BLR, COK मार्ग उच्च दाबाखाली आहेत.'
  },
  {
    lang: 'ta',
    langName: 'Tamil',
    text: 'சென்னை மற்றும் டெல்லி விமான கட்டண முன்னறிவிப்பு என்ன?',
    subtext: 'Chennai mattrum Delhi vimaana kattana mun-arivippu enna?',
    targetRoute: '/forecast',
    summary: 'அடுத்த 7 நாட்களில் சென்னை-டெல்லி கட்டணம் +4.2% அதிகரிக்கும் என கணிக்கப்பட்டுள்ளது.'
  },
  {
    lang: 'bn',
    langName: 'Bengali',
    text: 'জাতীয় বিমানভাড়া মূল্য সূচক কেন বৃদ্ধি পাচ্ছে?',
    subtext: 'Jatiyo bimanbhara mulya suchak keno briddhi pachhe?',
    targetRoute: '/policy',
    summary: 'মেট্রো রুটের জ্বালানি সারচার্জ ও উৎসবের চাহিদার কারণে জাতীয় সূচক ১১৭.৪ এ উঠেছে।'
  },
  {
    lang: 'en',
    langName: 'English',
    text: 'Why is the National Airfare Price Index up 3.8% today?',
    subtext: 'National APIx decomposition analysis',
    targetRoute: '/policy',
    summary: 'DEL-BOM (+1.4) and BOM-BLR (+0.9) drove 60% of today’s aggregate index delta.'
  },
  {
    lang: 'en',
    langName: 'English',
    text: 'Show me routes with high surge pressure and severe weather alerts.',
    subtext: 'Algorithmic Anomaly & NOTAM Tracker',
    targetRoute: '/surges',
    summary: 'Identified 14 sectors exceeding 2.0σ threshold; Mumbai weather alert is primary driver.'
  }
];

export const VoiceModal: React.FC = () => {
  const { isVoiceOpen, setIsVoiceOpen, selectedLanguage, setSelectedLanguage } = useDemoMode();
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [activeQueryText, setActiveQueryText] = useState('');
  const [interpretedTarget, setInterpretedTarget] = useState<string | null>(null);
  const [responseSummary, setResponseSummary] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlayingTts, setIsPlayingTts] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<number | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const navigate = useNavigate();

  const isApiConfigured = hasSarvamApiKey();

  const currentLangObj =
    SUPPORTED_LANGUAGES.find((l) => l.name.toLowerCase() === selectedLanguage.toLowerCase()) ||
    SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVoiceOpen) {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVoiceOpen]);

  const handleCloseModal = () => {
    stopRecordingCleanup();
    if (audioPlayerRef.current) {
      try {
        audioPlayerRef.current.pause();
        audioPlayerRef.current.currentTime = 0;
      } catch {
        // ignore
      }
    }
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // ignore
      }
    }
    setIsPlayingTts(false);
    setVoiceState('idle');
    setActiveQueryText('');
    setInterpretedTarget(null);
    setResponseSummary(null);
    setErrorMessage(null);
    setRecordingSeconds(0);
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    setIsVoiceOpen(false);
  };

  useEffect(() => {
    if (!isVoiceOpen) {
      stopRecordingCleanup();
      if (audioPlayerRef.current) {
        try {
          audioPlayerRef.current.pause();
        } catch {
          // ignore
        }
      }
      if ('speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel();
        } catch {
          // ignore
        }
      }
      setIsPlayingTts(false);
      setVoiceState('idle');
      setActiveQueryText('');
      setInterpretedTarget(null);
      setResponseSummary(null);
      setErrorMessage(null);
      setRecordingSeconds(0);
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
        setAudioUrl(null);
      }
    }
  }, [isVoiceOpen]);

  // Clean up recording timer
  const stopRecordingCleanup = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch {
        // ignore
      }
    }
  };

  const getAudioStream = async (): Promise<MediaStream> => {
    // 1. Check modern standard navigator.mediaDevices
    if (navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {
      return await navigator.mediaDevices.getUserMedia({ audio: true });
    }

    // 2. Check legacy browser implementations
    const legacyGetUserMedia =
      (navigator as any).getUserMedia ||
      (navigator as any).webkitGetUserMedia ||
      (navigator as any).mozGetUserMedia ||
      (navigator as any).msGetUserMedia;

    if (legacyGetUserMedia) {
      return new Promise((resolve, reject) => {
        legacyGetUserMedia.call(navigator, { audio: true }, resolve, reject);
      });
    }

    // 3. Explain why getUserMedia is undefined
    if (!window.isSecureContext && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      throw new Error(
        `Microphone access is blocked by your browser because this page is not running in a Secure Context. Please open the dashboard via http://localhost:5173 or HTTPS.`
      );
    }

    throw new Error(
      'Audio recording is not supported in this browser environment. You can still test multilingual voice recognition using the preset queries below.'
    );
  };

  const startLiveRecording = async () => {
    try {
      setErrorMessage(null);
      const stream = await getAudioStream();
      audioChunksRef.current = [];

      // Check MediaRecorder support
      if (typeof MediaRecorder === 'undefined') {
        throw new Error('MediaRecorder is not supported in this browser. Please use Chrome, Edge, or Firefox.');
      }

      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop());
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        await handleAudioProcessing(audioBlob);
      };

      recorder.start();
      setVoiceState('recording');
      setRecordingSeconds(0);

      timerIntervalRef.current = window.setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err: any) {
      console.error('Microphone access error:', err);
      const isNotAllowed = err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError';
      setErrorMessage(
        isNotAllowed
          ? 'Microphone permission was denied. Please allow microphone access in your browser address bar permissions.'
          : err.message || 'Could not access microphone.'
      );
      setVoiceState('error');
    }
  };

  const stopLiveRecording = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  };

  const handleAudioProcessing = async (audioBlob: Blob) => {
    setVoiceState('transcribing');

    if (!isApiConfigured) {
      // Graceful fallback to interactive simulation when API key is not yet set
      setTimeout(() => {
        const matched =
          PRESET_QUERIES.find((q) =>
            selectedLanguage.toLowerCase().startsWith(q.lang)
          ) || PRESET_QUERIES[0];

        setActiveQueryText(matched.text);
        setVoiceState('analyzing');

        setTimeout(() => {
          setVoiceState('ready');
          setInterpretedTarget(matched.targetRoute);
          setResponseSummary(matched.summary);
        }, 1200);
      }, 1000);
      return;
    }

    try {
      // 1. Call Sarvam AI Speech-to-Text
      const result = await transcribeWithSarvam(audioBlob, currentLangObj.code);
      const transcribedText = result.transcript.trim();

      if (!transcribedText) {
        throw new Error('No speech detected in the audio. Please try speaking clearly again.');
      }

      setActiveQueryText(transcribedText);
      setVoiceState('analyzing');

      // 2. Classify intent and generate intelligence summary
      const intent = interpretVoiceIntent(transcribedText, selectedLanguage, result.languageCode);

      setInterpretedTarget(intent.targetRoute);
      setResponseSummary(intent.summary);

      // 3. Synthesize Indian Language Audio via Sarvam Bulbul TTS
      try {
        const ttsAudio = await synthesizeSpeechWithSarvam(
          intent.summary,
          intent.targetLangCode,
          intent.speaker
        );
        if (ttsAudio) {
          setAudioUrl(ttsAudio);
        }
      } catch (e) {
        console.warn('Sarvam TTS pre-fetch warning:', e);
      }

      setVoiceState('ready');
    } catch (err: any) {
      console.error('Sarvam AI transcription error:', err);
      setErrorMessage(err.message || 'Failed to process voice query via Sarvam AI.');
      setVoiceState('error');
    }
  };

  const playSynthesizedVoice = async () => {
    if (!responseSummary) return;

    if (audioUrl) {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
      }
      const audio = new Audio(audioUrl);
      audioPlayerRef.current = audio;
      setIsPlayingTts(true);
      audio.onended = () => setIsPlayingTts(false);
      audio.onerror = () => setIsPlayingTts(false);
      audio.play().catch(() => setIsPlayingTts(false));
      return;
    }

    const resolved = resolveTargetLanguage(activeQueryText || responseSummary, selectedLanguage);

    // If audioUrl is not generated yet, try fetching from Sarvam TTS on-demand
    if (isApiConfigured) {
      setIsPlayingTts(true);
      try {
        const freshAudio = await synthesizeSpeechWithSarvam(
          responseSummary,
          resolved.code,
          resolved.speaker
        );
        if (freshAudio) {
          setAudioUrl(freshAudio);
          const audio = new Audio(freshAudio);
          audioPlayerRef.current = audio;
          audio.onended = () => setIsPlayingTts(false);
          audio.onerror = () => setIsPlayingTts(false);
          await audio.play();
          return;
        }
      } catch (e) {
        console.warn('On-demand TTS error:', e);
      } finally {
        setIsPlayingTts(false);
      }
      return;
    }

    // Only fallback to browser speech synthesizer if a native matching voice exists
    if ('speechSynthesis' in window) {
      const voices = window.speechSynthesis.getVoices();
      const matchedVoice = voices.find(
        (v) =>
          v.lang.toLowerCase().startsWith(resolved.id) ||
          v.lang.toLowerCase().replace('_', '-').startsWith(resolved.code.toLowerCase())
      );

      if (matchedVoice) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(responseSummary);
        utterance.lang = resolved.code;
        utterance.voice = matchedVoice;
        setIsPlayingTts(true);
        utterance.onend = () => setIsPlayingTts(false);
        utterance.onerror = () => setIsPlayingTts(false);
        window.speechSynthesis.speak(utterance);
      } else {
        console.warn(`No native ${resolved.name} browser voice installed on this device.`);
      }
    }
  };

  const simulateVoiceQuery = async (queryItem: typeof PRESET_QUERIES[0]) => {
    setErrorMessage(null);
    setActiveQueryText(queryItem.text);
    setVoiceState('transcribing');
    setAudioUrl(null);

    setTimeout(async () => {
      setVoiceState('analyzing');

      setTimeout(async () => {
        setInterpretedTarget(queryItem.targetRoute);
        setResponseSummary(queryItem.summary);
        setVoiceState('ready');

        // Optional Sarvam Bulbul TTS for simulated queries if API key exists
        if (isApiConfigured) {
          try {
            const ttsAudio = await synthesizeSpeechWithSarvam(
              queryItem.summary,
              currentLangObj.code,
              currentLangObj.speaker
            );
            if (ttsAudio) setAudioUrl(ttsAudio);
          } catch {
            // ignore
          }
        }
      }, 900);
    }, 900);
  };

  if (!isVoiceOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-brand-950/75 backdrop-blur-sm transition-opacity"
        onClick={handleCloseModal}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-surface rounded-xl shadow-2xl border border-border overflow-hidden z-10 flex flex-col animate-scale-up my-auto max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-border bg-gradient-to-r from-brand-900 via-brand-850 to-brand-950 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
              <Mic className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm">Sarvam AI Indian-Language Voice</h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Saaras ASR v3
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Live speech recognition & automated observatory routing
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block text-[10px] text-slate-400 bg-white/10 px-1.5 py-0.5 rounded font-mono">
              ESC
            </span>
            <button
              onClick={handleCloseModal}
              className="p-1.5 rounded-md text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              title="Close Voice Assistant (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* API Key Status Notice */}
        {!isApiConfigured && (
          <div className="px-6 py-2.5 bg-amber-500/10 border-b border-amber-500/20 text-amber-900 text-xs flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>Demo Mode active:</strong> Add <code className="bg-amber-100 px-1 py-0.5 rounded font-mono text-[11px]">VITE_SARVAM_API_KEY</code> to <code className="bg-amber-100 px-1 py-0.5 rounded font-mono text-[11px]">.env</code> for live Sarvam API calls.
              </span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 space-y-5 overflow-y-auto">
          {/* Language Selector Chips */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                Select Audio Language
              </span>
              <span className="text-[11px] text-ink-muted font-mono">
                Code: {currentLangObj.code}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setSelectedLanguage(lang.name)}
                  className={clsx(
                    'px-3 py-1.5 rounded-md text-xs font-medium border transition-all flex items-center gap-1.5',
                    selectedLanguage.toLowerCase() === lang.name.toLowerCase()
                      ? 'bg-brand-700 text-white border-brand-800 shadow-sm font-semibold'
                      : 'bg-subtle text-ink-secondary border-border hover:bg-white hover:border-slate-300'
                  )}
                >
                  <span>{lang.name}</span>
                  <span className="opacity-75 text-[11px]">({lang.native})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Central Microphone / Recording Area */}
          <div className="py-6 flex flex-col items-center justify-center rounded-xl bg-slate-50/80 border border-slate-200/90 p-6 text-center shadow-inner relative overflow-hidden">
            {voiceState === 'idle' && (
              <div className="space-y-4">
                <button
                  onClick={startLiveRecording}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 text-white flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all group mx-auto ring-4 ring-brand-100"
                  title="Click to start live recording from microphone"
                >
                  <Mic className="w-8 h-8 text-white group-hover:animate-pulse" />
                </button>
                <div>
                  <p className="text-sm font-bold text-ink-primary">
                    Click to start speaking in {currentLangObj.name} ({currentLangObj.native})
                  </p>
                  <p className="text-xs text-ink-muted mt-0.5">
                    Ask about route surges, airfare index movement, weather lag, or policy
                  </p>
                </div>
              </div>
            )}

            {voiceState === 'recording' && (
              <div className="space-y-4">
                {/* Visual Audio Waveform */}
                <div className="h-14 flex items-center justify-center gap-1.5 px-4">
                  <div className="w-1.5 bg-red-500 rounded-full animate-wave-1 h-8" />
                  <div className="w-1.5 bg-red-600 rounded-full animate-wave-2 h-12" />
                  <div className="w-1.5 bg-rose-500 rounded-full animate-wave-3 h-14" />
                  <div className="w-1.5 bg-red-700 rounded-full animate-wave-4 h-10" />
                  <div className="w-1.5 bg-red-500 rounded-full animate-wave-5 h-13" />
                  <div className="w-1.5 bg-rose-600 rounded-full animate-wave-2 h-9" />
                  <div className="w-1.5 bg-red-600 rounded-full animate-wave-1 h-6" />
                </div>

                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 border border-red-200 text-red-700 text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                    Recording live audio ({recordingSeconds}s)...
                  </div>
                  <p className="text-xs text-ink-muted">
                    Speak naturally. Click the stop button when done.
                  </p>
                </div>

                <button
                  onClick={stopLiveRecording}
                  className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md inline-flex items-center gap-2 transition-all active:scale-95 mx-auto"
                >
                  <MicOff className="w-4 h-4" />
                  <span>Stop & Transcribe with Sarvam</span>
                </button>
              </div>
            )}

            {(voiceState === 'transcribing' || voiceState === 'analyzing') && (
              <div className="space-y-4 py-2">
                <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mx-auto text-brand-700 animate-spin">
                  <RefreshCw className="w-6 h-6" />
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-700">
                    {voiceState === 'transcribing'
                      ? 'Transcribing speech via Sarvam Saaras ASR...'
                      : 'Classifying Observatory Intent & Routing...'}
                  </span>
                  {activeQueryText && (
                    <p className="text-sm font-medium text-ink-primary italic max-w-md mx-auto">
                      "{activeQueryText}"
                    </p>
                  )}
                </div>
              </div>
            )}

            {voiceState === 'ready' && (
              <div className="w-full space-y-4 text-left">
                <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200">
                  <div className="flex items-center justify-between text-xs font-semibold text-emerald-900 mb-1">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      Sarvam ASR Transcription ({selectedLanguage})
                    </span>
                    <span className="text-[10px] bg-emerald-200 text-emerald-800 px-1.5 py-0.5 rounded font-mono font-bold">
                      Confidence 98.4%
                    </span>
                  </div>
                  <p className="text-sm font-bold text-ink-primary">
                    "{activeQueryText}"
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-white border border-border space-y-2 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-ink-muted uppercase tracking-wider">
                      Observatory Intelligence Response:
                    </span>
                    <button
                      onClick={playSynthesizedVoice}
                      className={clsx(
                        'text-xs font-medium inline-flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors',
                        isPlayingTts
                          ? 'bg-brand-100 text-brand-800 animate-pulse font-semibold'
                          : 'text-brand-700 bg-brand-50 hover:bg-brand-100'
                      )}
                      title="Listen to synthesized voice"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{isPlayingTts ? 'Speaking...' : 'Listen (TTS)'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-ink-secondary leading-relaxed font-medium">
                    {responseSummary}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => {
                      setVoiceState('idle');
                      setActiveQueryText('');
                    }}
                    className="px-3 py-1.5 rounded-md border border-border text-xs font-medium text-ink-secondary hover:bg-subtle"
                  >
                    Try Another Query
                  </button>
                  {interpretedTarget && (
                    <button
                      onClick={() => {
                        handleCloseModal();
                        navigate(interpretedTarget);
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-md bg-brand-700 text-white text-xs font-semibold hover:bg-brand-800 shadow-sm transition-transform active:scale-95"
                    >
                      <span>Navigate to Workspace</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {voiceState === 'error' && (
              <div className="w-full space-y-3">
                <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-900 text-xs flex items-start gap-2.5 text-left">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div className="flex-1 space-y-1">
                    <p className="font-bold">Microphone or API Notice</p>
                    <p className="text-red-700 leading-relaxed">{errorMessage}</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => {
                      setVoiceState('idle');
                      setErrorMessage(null);
                    }}
                    className="px-3.5 py-1.5 rounded-md bg-brand-700 text-white text-xs font-semibold hover:bg-brand-800"
                  >
                    Try Microphone Again
                  </button>
                  <button
                    onClick={() => {
                      const sample =
                        PRESET_QUERIES.find((q) => selectedLanguage.toLowerCase().startsWith(q.lang)) ||
                        PRESET_QUERIES[0];
                      simulateVoiceQuery(sample);
                    }}
                    className="px-3.5 py-1.5 rounded-md border border-border bg-white text-ink-primary text-xs font-semibold hover:bg-subtle"
                  >
                    Run Sample Query Instead
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Preset Voice Samples */}
          <div>
            <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider block mb-2">
              Or Click a Sample Multilingual Query:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {PRESET_QUERIES.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedLanguage(item.langName);
                    simulateVoiceQuery(item);
                  }}
                  className="text-left p-2.5 rounded-lg border border-border bg-white hover:border-brand-400 hover:bg-brand-50/50 transition-all text-xs space-y-0.5 group shadow-sm"
                >
                  <p className="font-semibold text-ink-primary group-hover:text-brand-800 flex items-center justify-between">
                    <span>{item.text}</span>
                    <span className="text-[10px] text-ink-muted group-hover:text-brand-600 uppercase font-mono px-1 bg-slate-100 rounded">
                      {item.lang}
                    </span>
                  </p>
                  <p className="text-[11px] text-ink-muted truncate">{item.subtext}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer with Dismiss & Quick Links */}
        <div className="px-6 py-3 border-t border-border bg-slate-50 flex items-center justify-between shrink-0">
          <div className="text-[11px] text-ink-muted">
            Press <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-[10px]">Esc</kbd> or click outside to close
          </div>
          <button
            onClick={handleCloseModal}
            className="px-4 py-1.5 rounded-md border border-border bg-white text-ink-primary hover:bg-slate-100 text-xs font-semibold shadow-sm transition-all"
          >
            Close Assistant
          </button>
        </div>
      </div>
    </div>
  );
};
