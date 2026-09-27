import React, { useState } from 'react';
import {
  Code2,
  Copy,
  Check,
  X,
  Terminal,
  ExternalLink,
  Shield,
  Key,
} from 'lucide-react';

export default function ApiAccessModal({ isOpen, onClose }) {
  const [copiedEndpoint, setCopiedEndpoint] = useState(null);
  const [selectedEndpoint, setSelectedEndpoint] = useState('index');

  if (!isOpen) return null;

  const endpoints = [
    {
      id: 'index',
      method: 'GET',
      path: '/api/v1/index',
      description: 'Fetch current Airfare Price Index (APIx), baseline deviation, and period change.',
      sampleResponse: `{
  "status": "success",
  "data": {
    "apix": 108.72,
    "change_percentage": 3.4,
    "base_period": 100.0,
    "average_domestic_fare": 5426,
    "timestamp": "2026-09-01T10:42:00Z"
  }
}`,
    },
    {
      id: 'trends',
      method: 'GET',
      path: '/api/v1/trends?cadence=daily&limit=30',
      description: 'Retrieve time-series index observations for econometric models.',
      sampleResponse: `{
  "status": "success",
  "cadence": "daily",
  "series": [
    { "date": "2026-08-03", "apix": 100.0, "avg_fare": 4990 },
    { "date": "2026-09-01", "apix": 108.72, "avg_fare": 5426 }
  ]
}`,
    },
    {
      id: 'routes',
      method: 'GET',
      path: '/api/v1/routes/inflation',
      description: 'Extract route-wise inflation rates and passenger seat weights.',
      sampleResponse: `{
  "status": "success",
  "routes": [
    { "route": "DEL-BOM", "inflation_pct": 18.0, "weight": 0.284 },
    { "route": "DEL-BLR", "inflation_pct": 12.0, "weight": 0.221 }
  ]
}`,
    },
    {
      id: 'fares',
      method: 'GET',
      path: '/api/v1/fares?window=T%2B1&route=DEL-BOM',
      description: 'Query granular normalized ticket quotations across monitored carriers.',
      sampleResponse: `{
  "status": "success",
  "count": 1248,
  "results": [
    {
      "id": "OBS-1001",
      "route": "DEL-BOM",
      "airline": "IndiGo",
      "base_fare": 6200,
      "taxes": 1000,
      "total_fare": 7200,
      "status": "Available"
    }
  ]
}`,
    },
  ];

  const current = endpoints.find((e) => e.id === selectedEndpoint) || endpoints[0];

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(id);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-3xl w-full p-6 relative flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[18px] font-bold text-slate-900">
                  AirFareX REST API Explorer
                </h3>
                <span className="text-[10px] font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
                  v1.2 OpenAPI
                </span>
              </div>
              <p className="text-[12px] text-slate-500">
                High-frequency programatic data feeds for RBI, MoSPI, and policy modeling
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* API Key Banner */}
        <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between text-[12px]">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-amber-600" />
            <span className="text-slate-600 font-medium">Institutional Access Token:</span>
            <code className="bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-800 font-mono text-[11px]">
              afx_live_mospi_987293848123
            </code>
          </div>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Authenticated
          </span>
        </div>

        {/* Body: Endpoints Selector & Code Preview */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 overflow-y-auto min-h-0">
          {/* Endpoint List */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1 mb-1">
              Available Endpoints
            </div>
            {endpoints.map((ep) => (
              <button
                key={ep.id}
                onClick={() => setSelectedEndpoint(ep.id)}
                className={`w-full text-left p-2.5 rounded-xl border text-[12px] transition-all ${
                  selectedEndpoint === ep.id
                    ? 'bg-blue-50/80 border-blue-300 font-semibold shadow-xs'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-1.5 font-mono text-[11px]">
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-1 rounded">
                    {ep.method}
                  </span>
                  <span className="truncate">{ep.path.split('?')[0]}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Code Details & Response */}
          <div className="md:col-span-2 bg-slate-900 rounded-xl p-4 text-slate-200 font-mono text-[12px] flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px]">
                <span className="text-blue-400 font-semibold flex items-center gap-1">
                  <Terminal className="w-3.5 h-3.5" />
                  cURL Request
                </span>
                <button
                  onClick={() =>
                    handleCopy(
                      `curl -X GET "https://api.airfarex.gov.in${current.path}" -H "Authorization: Bearer afx_live_token"`,
                      'curl'
                    )
                  }
                  className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                >
                  {copiedEndpoint === 'curl' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedEndpoint === 'curl' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="mt-2 text-slate-300 text-[11px] bg-slate-950/60 p-2 rounded border border-slate-800">
                curl -X {current.method} "https://api.airfarex.gov.in{current.path}" \<br />
                &nbsp;&nbsp;-H "Authorization: Bearer afx_live_token"
              </div>

              <div className="mt-3 text-[11px] text-slate-400 pb-1 border-b border-slate-800">
                Sample JSON Response (200 OK)
              </div>
              <pre className="mt-2 text-[11px] text-emerald-400 overflow-x-auto">
                {current.sampleResponse}
              </pre>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[12px]">
          <span className="text-slate-500">
            Rate limit: 10,000 req/min for verified government agencies
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold"
          >
            Close Explorer
          </button>
        </div>
      </div>
    </div>
  );
}
