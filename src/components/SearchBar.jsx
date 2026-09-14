// src/components/SearchBar.jsx
import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder = 'Search shops, items, or owner...', className = '' }) {
  return (
    <div className={`relative w-full ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
        <Search className="w-5 h-5" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-3 bg-white text-slate-900 placeholder:text-slate-400 text-sm sm:text-base font-normal rounded-2xl border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition"
          aria-label="Clear search"
        >
          <X className="w-4 h-4 bg-slate-100 hover:bg-slate-200 rounded-full p-0.5" />
        </button>
      )}
    </div>
  );
}
