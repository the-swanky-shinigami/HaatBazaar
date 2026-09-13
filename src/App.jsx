import React, { useState, useEffect } from 'react';
import { Store, CheckCircle, RefreshCw, AlertCircle, Database, Server, Smartphone, ShieldCheck } from 'lucide-react';
import { CATEGORIES } from './lib/constants';
import { api } from './lib/api';

export default function App() {
  const [apiStatus, setApiStatus] = useState({ loading: true, data: null, error: null });
  const [dbStatus, setDbStatus] = useState({ loading: true, data: null, error: null });

  const checkHealth = async () => {
    setApiStatus({ loading: true, data: null, error: null });
    setDbStatus({ loading: true, data: null, error: null });

    try {
      const healthData = await api.get('/health');
      setApiStatus({ loading: false, data: healthData, error: null });
    } catch (err) {
      setApiStatus({ loading: false, data: null, error: err.message });
    }

    try {
      const dbData = await api.get('/health/db');
      setDbStatus({ loading: false, data: dbData, error: null });
    } catch (err) {
      setDbStatus({ loading: false, data: null, error: err.message });
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      {/* Header */}
      <header className="bg-orange-600 text-white shadow-md sticky top-0 z-30">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-orange-600 shadow-sm font-bold text-xl">
              🏪
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">HaatBazaar</h1>
              <p className="text-xs text-orange-100 font-medium">ग्रामीण बाज़ार • Your Village Market</p>
            </div>
          </div>
          <span className="bg-orange-700/70 text-orange-100 text-xs px-2.5 py-1 rounded-full font-semibold border border-orange-500/50">
            Phase 1 Foundation
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-3xl mx-auto px-4 pt-6 space-y-6">
        {/* Banner */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                <Store className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">Edge Platform Scaffolding Active</h2>
                <p className="text-sm text-slate-500">
                  Cloudflare Pages Functions + Hono + Cloudflare D1 (SQLite)
                </p>
              </div>
            </div>
            <button
              onClick={checkHealth}
              disabled={apiStatus.loading || dbStatus.loading}
              className="flex items-center space-x-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 text-sm font-medium rounded-lg transition"
            >
              <RefreshCw className={`w-4 h-4 ${(apiStatus.loading || dbStatus.loading) ? 'animate-spin' : ''}`} />
              <span>Ping Edge</span>
            </button>
          </div>

          {/* Diagnostic Status Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {/* API Health Card */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-orange-600" /> API Gateway
                </span>
                {apiStatus.loading ? (
                  <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded">Checking...</span>
                ) : apiStatus.error ? (
                  <span className="text-xs bg-red-100 text-red-700 font-semibold px-2 py-0.5 rounded flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Offline
                  </span>
                ) : (
                  <span className="text-xs bg-emerald-100 text-emerald-700 font-semibold px-2 py-0.5 rounded flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Live
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-700 font-mono">
                {apiStatus.error ? (
                  <span className="text-xs text-red-600 break-all">{apiStatus.error}</span>
                ) : apiStatus.data ? (
                  `Hono Base: /api (v${apiStatus.data.version || '1.0.0'})`
                ) : (
                  'Connecting to endpoint...'
                )}
              </p>
            </div>

            {/* D1 DB Card */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-emerald-600" /> D1 Database
                </span>
                {dbStatus.loading ? (
                  <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded">Checking...</span>
                ) : dbStatus.error ? (
                  <span className="text-xs bg-amber-100 text-amber-700 font-semibold px-2 py-0.5 rounded flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Standby
                  </span>
                ) : (
                  <span className="text-xs bg-emerald-100 text-emerald-700 font-semibold px-2 py-0.5 rounded flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Connected
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-700 font-mono">
                {dbStatus.error ? (
                  <span className="text-xs text-amber-600">{dbStatus.error}</span>
                ) : dbStatus.data ? (
                  `Local D1: ${dbStatus.data.shopCount} seeded shops`
                ) : (
                  'Checking D1 binding...'
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Phase 1 Deliverables Checklist */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            Phase 1 Technical Checklist
          </h3>
          <ul className="space-y-3">
            {[
              { label: 'React 18 + Vite + Tailwind CSS configured with brand palette', done: true },
              { label: 'Hono router on Cloudflare Pages Functions (/functions/api/[[route]].ts)', done: true },
              { label: 'Cloudflare D1 SQLite schema with random PIN salt (db/0001_initial_schema.sql)', done: true },
              { label: 'Wrangler Pages Dev config with local D1 database binding', done: true },
              { label: 'Centralized API fetch client (src/lib/api.js) with JWT/Admin token headers', done: true },
              { label: 'Master category definitions and status enums (src/lib/constants.js)', done: true },
            ].map((item, idx) => (
              <li key={idx} className="flex items-start space-x-3 text-sm">
                <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories Preview */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-base font-bold text-slate-800 mb-3">
            Registered Categories ({CATEGORIES.length})
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="flex items-center space-x-2.5 p-2.5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-orange-50/50 hover:border-orange-200 transition text-left"
              >
                <span className="text-xl">{cat.emoji}</span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-800 truncate">{cat.label}</p>
                  <p className="text-[11px] text-slate-500 truncate">{cat.labelHi}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
