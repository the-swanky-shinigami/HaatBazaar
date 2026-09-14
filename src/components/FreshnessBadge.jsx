// src/components/FreshnessBadge.jsx
import React from 'react';
import { Clock } from 'lucide-react';
import { formatRelativeTime } from '../lib/formatters';

export default function FreshnessBadge({ lastActiveAt, className = '' }) {
  const { en, hi, isFresh } = formatRelativeTime(lastActiveAt);

  if (isFresh) {
    return (
      <span
        className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80 ${className}`}
        title={`Seller active today (${en})`}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span>{en}</span>
        <span className="hidden sm:inline text-emerald-600/75">• {hi}</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200 ${className}`}
      title={en}
    >
      <Clock className="w-3 h-3 text-slate-400" />
      <span>{en}</span>
    </span>
  );
}
