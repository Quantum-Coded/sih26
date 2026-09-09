import React, { useState, useEffect } from 'react';
import { X, Mic, Volume2, Globe, ArrowRight, Check, Sparkles } from 'lucide-react';
import { useDemoMode } from '../../context/DemoModeContext';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

type VoiceState = 'idle' | 'listening' | 'understanding' | 'analyzing' | 'ready';

const LANGUAGES = [
  { id: 'en', name: 'English', native: 'English' },
  { id: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { id: 'mr', name: 'Marathi', native: 'मराठी' },
  { id: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { id: 'bn', name: 'Bengali', native: 'বাংলা' },
];

const PRESET_QUERIES = [
  {
    lang: 'hi',
    text: 'दिल्ली से मुंबई का एयरफेयर आज क्यों बढ़ रहा है?',
    subtext: 'Delhi se Mumbai ka airfare aaj kyun badh raha hai?',
    targetRoute: '/route?id=DEL-BOM',
    summary: 'मौसम और रनवे मेंटेनेंस के कारण दिल्ली-मुंबई का किराया 28.4% बढ़ा है।'
  },
  {
    lang: 'mr',
    text: 'मुंबई विमानतळावरून कोणते मार्ग सर्वात जास्त सर्ज करत आहेत?',
    subtext: 'Mumbai vimanatala-varun konte marga sarvat jasta surge karat ahet?',
    targetRoute: '/surges',
    summary: 'मुंबईशी जोडलेले DEL, BLR, COK मार्ग उच्च दाबाखाली आहेत.'
  },
  {
    lang: 'en',
    text: 'Show me routes with high fare pressure and severe weather.',
    subtext: 'Identifies DEL-BOM and BOM-BLR corridors',
    targetRoute: '/surges',
    summary: 'Identified 14 routes under surge; Mumbai weather alert is primary driver.'
  },
  {
    lang: 'en',
    text: 'Why is the National Airfare Price Index up 3.8% today?',
    subtext: 'National APIx decomposition analysis',
    targetRoute: '/policy',
    summary: 'DEL-BOM (+1.4) and BOM-BLR (+0.9) drove 60% of today’s index movement.'
  }
];

export const VoiceModal: React.FC = () => {
  const { isVoiceOpen, setIsVoiceOpen, selectedLanguage, setSelectedLanguage } = useDemoMode();
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [activeQueryText, setActiveQueryText] = useState('');
  const [interpretedTarget, setInterpretedTarget] = useState<string | null>(null);
  const [responseSummary, setResponseSummary] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isVoiceOpen) {
      setVoiceState('idle');
      setActiveQueryText('');
      setInterpretedTarget(null);
      setResponseSummary(null);
    }
  }, [isVoiceOpen]);

  if (!isVoiceOpen) return null;

  const simulateVoiceQuery = (queryItem: typeof PRESET_QUERIES[0]) => {
    setActiveQueryText(queryItem.text);
    setVoiceState('listening');

    setTimeout(() => {
      setVoiceState('understanding');
    }, 1100);

    setTimeout(() => {
      setVoiceState('analyzing');
    }, 2000);

    setTimeout(() => {
      setVoiceState('ready');
      setInterpretedTarget(queryItem.targetRoute);
      setResponseSummary(queryItem.summary);
    }, 2900);
  };

  const handleStartListening = () => {
    // Pick first matching preset for current language or fallback
    const matched = PRESET_QUERIES.find(q =>
      selectedLanguage.toLowerCase().startsWith(q.lang)
    ) || PRESET_QUERIES[0];

    simulateVoiceQuery(matched);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-brand-900/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsVoiceOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-surface rounded-xl shadow-2xl border border-border overflow-hidden z-10 flex flex-col animate-scale-up">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-border bg-brand-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-700 flex items-center justify-center">
              <Mic className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm">Sarvam AI Indian-Language Voice</h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono border border-emerald-500/30">
                  Multilingual ASR
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Natural speech query & voice-directed observatory navigation
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsVoiceOpen(false)}
            className="p-1 rounded-md text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Language Selector Chips */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                Select Audio Language
              </span>
              <span className="text-[11px] text-ink-muted">Powered by Sarvam ASR Engine</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setSelectedLanguage(lang.name)}
                  className={clsx(
                    'px-3 py-1.5 rounded-md text-xs font-medium border transition-all flex items-center gap-1.5',
                    selectedLanguage.toLowerCase() === lang.name.toLowerCase()
                      ? 'bg-brand-700 text-white border-brand-800 shadow-sm font-semibold'
                      : 'bg-subtle text-ink-secondary border-border hover:bg-white'
                  )}
                >
                  <span>{lang.name}</span>
                  <span className="opacity-70 text-[11px]">({lang.native})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Central Voice Waveform & Microphone Interaction Area */}
          <div className="py-6 flex flex-col items-center justify-center rounded-xl bg-slate-50 border border-slate-200/80 p-6 text-center">
            {voiceState === 'idle' && (
              <div className="space-y-4">
                <button
                  onClick={handleStartListening}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-600 to-brand-800 text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform group mx-auto"
                >
                  <Mic className="w-8 h-8 text-white group-hover:animate-pulse" />
                </button>
                <div>
                  <p className="text-sm font-semibold text-ink-primary">
                    Tap to speak or select a preset query below
                  </p>
                  <p className="text-xs text-ink-muted mt-0.5">
                    Speak naturally in {selectedLanguage}
                  </p>
                </div>
              </div>
            )}

            {(voiceState === 'listening' || voiceState === 'understanding' || voiceState === 'analyzing') && (
              <div className="space-y-4">
                {/* Visual Audio Waveform */}
                <div className="h-16 flex items-center justify-center gap-1.5 px-4">
                  <div className="w-1.5 bg-brand-600 rounded-full animate-wave-1" />
                  <div className="w-1.5 bg-brand-500 rounded-full animate-wave-2" />
                  <div className="w-1.5 bg-brand-700 rounded-full animate-wave-3" />
                  <div className="w-1.5 bg-indigo-600 rounded-full animate-wave-4" />
                  <div className="w-1.5 bg-brand-500 rounded-full animate-wave-5" />
                  <div className="w-1.5 bg-brand-600 rounded-full animate-wave-2" />
                  <div className="w-1.5 bg-brand-700 rounded-full animate-wave-1" />
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-700">
                    {voiceState === 'listening' && '● Listening to input...'}
                    {voiceState === 'understanding' && 'Transcribing Indian speech (Sarvam ASR)...'}
                    {voiceState === 'analyzing' && 'Analyzing Airfare Price Index & Route feeds...'}
                  </span>
                  {activeQueryText && (
                    <p className="text-sm font-medium text-ink-primary italic">
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
                      Interpreted Query ({selectedLanguage})
                    </span>
                    <span className="text-[10px] bg-emerald-200 text-emerald-800 px-1.5 py-0.2 rounded font-mono">
                      Confidence 98.4%
                    </span>
                  </div>
                  <p className="text-sm font-bold text-ink-primary">
                    "{activeQueryText}"
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-white border border-border space-y-2">
                  <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider block">
                    Synthesized Intelligence Response:
                  </span>
                  <p className="text-xs text-ink-secondary leading-relaxed">
                    {responseSummary}
                  </p>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    onClick={() => setVoiceState('idle')}
                    className="px-3 py-1.5 rounded-md border border-border text-xs font-medium text-ink-secondary hover:bg-subtle"
                  >
                    Try Another Query
                  </button>
                  {interpretedTarget && (
                    <button
                      onClick={() => {
                        setIsVoiceOpen(false);
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
          </div>

          {/* Quick Preset Voice Samples */}
          <div>
            <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider block mb-2">
              Sample Voice Queries to Test:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {PRESET_QUERIES.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => simulateVoiceQuery(item)}
                  className="text-left p-2.5 rounded-lg border border-border bg-white hover:border-brand-400 hover:bg-brand-50/50 transition-all text-xs space-y-0.5 group"
                >
                  <p className="font-semibold text-ink-primary group-hover:text-brand-800 flex items-center justify-between">
                    <span>{item.text}</span>
                    <Volume2 className="w-3.5 h-3.5 text-ink-muted group-hover:text-brand-600 shrink-0 ml-1" />
                  </p>
                  <p className="text-[11px] text-ink-muted truncate">{item.subtext}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
