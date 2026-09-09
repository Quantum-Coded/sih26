import React, { useState } from 'react';
import { PROVENANCE_TREE, ProvenanceNode } from '../../data/auditData';
import { GitCommit, ChevronDown, ChevronRight, ShieldCheck, CheckCircle2, ArrowDown } from 'lucide-react';
import clsx from 'clsx';

interface TreeNodeProps {
  node: ProvenanceNode;
  depth?: number;
}

const TreeNodeItem: React.FC<TreeNodeProps> = ({ node, depth = 0 }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(depth < 2);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="space-y-1.5">
      <div
        onClick={() => hasChildren && setIsExpanded(!isExpanded)}
        className={clsx(
          'p-3 rounded-lg border transition-all flex items-start justify-between gap-3 text-xs',
          hasChildren ? 'cursor-pointer' : '',
          depth === 0 ? 'bg-brand-900 text-white border-brand-800 shadow-md' :
          depth === 1 ? 'bg-white border-slate-300 shadow-sm' :
          depth === 2 ? 'bg-slate-50 border-slate-200' : 'bg-subtle border-border'
        )}
      >
        <div className="flex items-start gap-2.5">
          {hasChildren && (
            <button className="mt-0.5 text-ink-muted hover:text-ink-primary">
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          )}
          {!hasChildren && (
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
          )}
          <div>
            <div className="flex items-center gap-2">
              <span className={clsx('font-bold', depth === 0 ? 'text-white text-sm' : 'text-ink-primary')}>
                {node.label}
              </span>
              {node.badge && (
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-brand-500/20 text-brand-300 border border-brand-400/30">
                  {node.badge}
                </span>
              )}
            </div>
            <p className={clsx('text-[11px] mt-0.5', depth === 0 ? 'text-slate-300' : 'text-ink-muted')}>
              {node.subtext}
            </p>
          </div>
        </div>

        <div className="text-right shrink-0">
          <span className={clsx('font-mono font-extrabold', depth === 0 ? 'text-xl text-white' : 'text-sm text-brand-700')}>
            {node.value}
          </span>
        </div>
      </div>

      {/* Children Nodes */}
      {hasChildren && isExpanded && (
        <div className="pl-6 border-l-2 border-brand-200/80 space-y-2 mt-2">
          {node.children!.map((child) => (
            <TreeNodeItem key={child.id} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export const TraceThisNumberSection: React.FC = () => {
  return (
    <div className="bg-surface rounded-lg border border-border p-5 shadow-sm-subtle space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-3">
        <div>
          <div className="flex items-center gap-2">
            <GitCommit className="w-4 h-4 text-brand-700" />
            <h3 className="text-sm font-bold text-ink-primary tracking-tight">
              Signature Provenance Graph: Trace Index "117.4"
            </h3>
            <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
              100% Verifiable Chain
            </span>
          </div>
          <p className="text-xs text-ink-muted mt-0.5">
            Click nodes to trace the mathematical lineage from the national CPI index down to raw carrier flight fares
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs text-ink-muted block">Verified Observations</span>
          <span className="text-sm font-bold text-emerald-700 font-mono">
            1,248 Valid Quotes
          </span>
        </div>
      </div>

      <div className="pt-2">
        <TreeNodeItem node={PROVENANCE_TREE} depth={0} />
      </div>

      <div className="pt-2 border-t border-border flex items-center justify-between text-[11px] text-ink-muted">
        <span>Formula: <strong>Laspeyres Base 2024 = 100 with DGCA seat weights</strong></span>
        <span>Cryptographic Audit Stamp: <strong className="font-mono text-slate-600">SHA-256 0x8f2d...9a04f21</strong></span>
      </div>
    </div>
  );
};
