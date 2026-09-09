import React, { useState } from 'react';
import { PIPELINE_STEPS, PipelineStep } from '../../data/auditData';
import { CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';
import clsx from 'clsx';

export const DataPipelineFlow: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<PipelineStep>(PIPELINE_STEPS[4]); // Outlier check

  return (
    <div className="bg-surface rounded-lg border border-border p-5 shadow-sm-subtle space-y-4">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-700" />
            <h3 className="text-sm font-bold text-ink-primary tracking-tight">
              End-to-End Data Ingestion & Sanitization Pipeline
            </h3>
            <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
              Audit Status: Verified
            </span>
          </div>
          <p className="text-xs text-ink-muted mt-0.5">
            Cryptographically verifiable pipeline transforming raw HTTP scraper HTML/JSON payloads into official index metrics
          </p>
        </div>
        <span className="text-xs font-mono text-ink-muted hidden sm:inline">
          Total Latency: 2,465ms
        </span>
      </div>

      {/* Horizontal Pipeline Steps Stepper */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {PIPELINE_STEPS.map((step, idx) => {
          const isSelected = selectedStep.id === step.id;

          return (
            <button
              key={step.id}
              onClick={() => setSelectedStep(step)}
              className={clsx(
                'p-2.5 rounded-lg border text-left transition-all flex flex-col justify-between space-y-1.5 cursor-pointer',
                isSelected
                  ? 'bg-brand-50 border-brand-500 shadow-sm ring-1 ring-brand-400'
                  : 'bg-white border-border hover:bg-subtle/50'
              )}
            >
              <div className="flex items-center justify-between text-[10px] font-bold">
                <span className={isSelected ? 'text-brand-800' : 'text-ink-muted'}>
                  STEP {idx + 1}
                </span>
                {step.status === 'passed' ? (
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                ) : (
                  <AlertTriangle className="w-3 h-3 text-amber-600" />
                )}
              </div>

              <div className="text-[11px] font-bold text-ink-primary truncate">
                {step.name.split('. ')[1]}
              </div>

              <div className="text-[10px] text-ink-muted font-mono">
                {step.countLabel.split(' ')[0]}
              </div>
            </button>
          );
        })}
      </div>

      {/* Detail card of selected stage */}
      <div className="p-4 rounded-lg bg-subtle/70 border border-border space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-bold text-xs text-ink-primary flex items-center gap-2">
            <span>{selectedStep.name}</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white text-ink-muted border border-border">
              Pass Rate: {selectedStep.passRate}
            </span>
          </span>
          <span className="text-[11px] font-mono text-ink-muted">
            Processing Execution Time: {selectedStep.processingTimeMs}ms
          </span>
        </div>
        <p className="text-xs text-ink-secondary leading-relaxed">
          {selectedStep.description}
        </p>
      </div>
    </div>
  );
};
