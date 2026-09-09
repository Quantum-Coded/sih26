import React, { useState } from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { API_ENDPOINTS, ApiEndpoint } from '../data/apiEndpoints';
import { Terminal, Copy, Download, Play, FileCode } from 'lucide-react';
import { useDemoMode } from '../context/DemoModeContext';
import clsx from 'clsx';

export const GovernmentApiExplorer: React.FC = () => {
  const [selectedEndpointId, setSelectedEndpointId] = useState<string>(API_ENDPOINTS[0].id);
  const [isOpenApiModalOpen, setIsOpenApiModalOpen] = useState<boolean>(false);
  const { showToast } = useDemoMode();

  const currentEndpoint = API_ENDPOINTS.find((e: ApiEndpoint) => e.id === selectedEndpointId) || API_ENDPOINTS[0];
  const responseJsonString = JSON.stringify(currentEndpoint.sampleResponse, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(responseJsonString);
    showToast('Copied API JSON response to clipboard');
  };

  const handleDownload = () => {
    const blob = new Blob([responseJsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentEndpoint.id}-response.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`Downloaded ${currentEndpoint.id}-response.json`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <SectionHeader
        title="Government & Institutional API Explorer"
        subtitle="RESTful machine-readable endpoints providing real-time and historical airfare price indexes for National Statistical Office (NSO) and Reserve Bank of India (RBI) analytical pipelines."
        badge={
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-emerald-600" />
            OpenAPI 3.0 Standard
          </span>
        }
        actions={
          <button
            onClick={() => setIsOpenApiModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-brand-700 hover:bg-brand-800 text-white text-xs font-semibold shadow-sm transition-all active:scale-95"
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>View OpenAPI 3.0 Spec</span>
          </button>
        }
      />

      {/* 3-Panel Playground Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Panel 1: Endpoint List (4 cols) */}
        <div className="lg:col-span-4 bg-surface rounded-lg border border-border p-4 shadow-sm-subtle space-y-3">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <span className="text-xs font-bold text-ink-primary uppercase tracking-wider">
              Available Endpoints
            </span>
            <span className="text-[10px] font-mono text-ink-muted">
              v1.2 REST
            </span>
          </div>

          <div className="space-y-2">
            {API_ENDPOINTS.map((ep: ApiEndpoint) => {
              const isSelected = ep.id === selectedEndpointId;

              return (
                <button
                  key={ep.id}
                  onClick={() => setSelectedEndpointId(ep.id)}
                  className={clsx(
                    'w-full text-left p-2.5 rounded-lg border transition-all text-xs space-y-1 block',
                    isSelected
                      ? 'bg-brand-50 border-brand-400 ring-1 ring-brand-300'
                      : 'bg-white border-border hover:bg-subtle/50'
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-mono font-bold text-[10px]">
                      {ep.method}
                    </span>
                    <span className="font-mono font-bold text-ink-primary truncate">
                      {ep.path}
                    </span>
                  </div>
                  <p className="text-[11px] text-ink-muted line-clamp-1">
                    {ep.title}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Panel 2 & 3: Request Params + Live JSON Response (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Request Config & Parameters Form */}
          <div className="bg-surface rounded-lg border border-border p-5 shadow-sm-subtle space-y-3">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold bg-brand-50 text-brand-700 px-2 py-0.5 rounded border border-brand-200">
                  {currentEndpoint.category} Service
                </span>
                <h3 className="text-sm font-bold text-ink-primary mt-1">
                  {currentEndpoint.title}
                </h3>
                <p className="text-xs text-ink-muted mt-0.5">
                  {currentEndpoint.description}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => showToast('Executed live API query simulation')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-transform active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Execute Query</span>
                </button>
              </div>
            </div>

            {/* Request Parameter Inputs */}
            <div>
              <span className="text-[11px] font-semibold text-ink-muted uppercase tracking-wider block mb-2">
                Request Query Parameters:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentEndpoint.params.map((param: any) => (
                  <div key={param.name} className="p-2.5 rounded bg-subtle border border-border text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="font-mono font-bold text-ink-primary">{param.name}</span>
                      <span className="text-[10px] text-ink-muted font-mono">{param.type}</span>
                    </div>
                    <input
                      type="text"
                      defaultValue={param.defaultValue}
                      className="w-full bg-white border border-border rounded px-2 py-1 text-xs text-ink-primary font-mono focus:outline-none focus:border-brand-600"
                    />
                    <span className="text-[10px] text-ink-muted block truncate">{param.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Response JSON Output Container */}
          <div className="bg-slate-900 rounded-lg border border-slate-800 p-5 shadow-lg space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="font-mono text-xs font-bold text-slate-200">
                  HTTP 200 OK • Content-Type: application/json
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy JSON</span>
                </button>
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            {/* Syntax Highlighted JSON Box */}
            <pre className="p-4 rounded-md bg-slate-950 text-emerald-400 font-mono text-xs overflow-x-auto max-h-[380px] border border-slate-800 leading-relaxed">
              {responseJsonString}
            </pre>

            <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>Schema: <strong>urn:mospi:apix:v1:response</strong></span>
              <span>Rate Limit: <strong>10,000 req/hr (Government Whitelist)</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* OpenAPI Specification Modal */}
      {isOpenApiModalOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpenApiModalOpen(false)}
          />
          <div className="relative w-full max-w-2xl bg-surface rounded-xl shadow-2xl border border-border p-6 space-y-4 z-10 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <h3 className="text-base font-bold text-ink-primary">
                  OpenAPI 3.0 Specification Schema
                </h3>
                <p className="text-xs text-ink-muted">
                  Formal Swagger / OpenAPI definition for government API integrations
                </p>
              </div>
              <button
                onClick={() => setIsOpenApiModalOpen(false)}
                className="text-ink-muted hover:text-ink-primary text-lg"
              >
                &times;
              </button>
            </div>

            <pre className="p-4 rounded bg-slate-900 text-slate-200 font-mono text-xs overflow-y-auto flex-1 border border-slate-800">
{`openapi: 3.0.3
info:
  title: APIx - India Real-Time Airfare Price Index
  version: 1.2.0
  description: Official machine-readable high-frequency airfare intelligence for CPI augmentation.
paths:
  /api/v1/index/latest:
    get:
      summary: Latest National Airfare Price Index
      responses:
        '200':
          description: OK
  /api/v1/routes/{route_id}:
    get:
      summary: Sector-Specific Price Movement and Elasticity
      parameters:
        - name: route_id
          in: path
          required: true
          schema:
            type: string
            example: DEL-BOM
  /api/v1/surge:
    get:
      summary: Statistical Surge Anomaly Detector
  /api/v1/events:
    get:
      summary: External Contextual Signals and Weather Feeds
  /api/v1/forecast/{route_id}:
    get:
      summary: Machine Learning Price Forecast and Confidence Intervals`}
            </pre>

            <div className="flex justify-end pt-2 border-t border-border">
              <button
                onClick={() => setIsOpenApiModalOpen(false)}
                className="px-4 py-1.5 rounded-md bg-brand-700 text-white text-xs font-semibold"
              >
                Close Spec
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
