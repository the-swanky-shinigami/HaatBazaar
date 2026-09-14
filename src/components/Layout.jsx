// src/components/Layout.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Store, UserCheck, Shield } from 'lucide-react';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      {/* App Header */}
      <header className="bg-orange-600 text-white shadow-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-3.5 flex items-center justify-between">
          {/* Logo & Brand Name */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-orange-600 shadow-sm font-bold text-xl group-hover:scale-105 transition">
              🏪
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-black tracking-tight text-white">HaatBazaar</span>
                <span className="hidden xs:inline bg-orange-700/80 text-orange-100 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border border-orange-500/40">
                  Haat
                </span>
              </div>
              <p className="text-xs text-orange-100 font-medium">ग्रामीण बाज़ार • Village Market</p>
            </div>
          </Link>

          {/* Quick Access Links */}
          <div className="flex items-center space-x-2">
            <Link
              to="/seller/login"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-orange-700/60 hover:bg-orange-700 text-white border border-orange-500/50 transition active:scale-95"
            >
              <Store className="w-3.5 h-3.5 text-orange-200" />
              <span className="hidden sm:inline">Seller Portal</span>
              <span className="sm:hidden">Seller</span>
            </Link>

            <Link
              to="/admin/login"
              className="p-2 rounded-xl text-orange-200 hover:text-white hover:bg-orange-700/50 transition"
              title="Admin Portal"
            >
              <Shield className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl w-full mx-auto px-4 py-6 flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500 mt-12">
        <div className="max-w-4xl mx-auto px-4 space-y-1">
          <p className="font-semibold text-slate-700">HaatBazaar (ग्रामीण बाज़ार)</p>
          <p>Your Village Market, In Your Pocket • 100% Free-Tier Edge Discovery</p>
          <p className="text-[11px] text-slate-400">Powered by Cloudflare Pages & D1 (Serverless SQLite)</p>
        </div>
      </footer>
    </div>
  );
}
