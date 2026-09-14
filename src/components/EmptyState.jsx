// src/components/EmptyState.jsx
import React from 'react';
import { Store, RefreshCw } from 'lucide-react';

export default function EmptyState({
  title = 'No shops found',
  titleHi = 'कोई दुकान नहीं मिली',
  description = 'Try adjusting your search terms or clearing selected category filters.',
  onReset,
}) {
  return (
    <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 text-center flex flex-col items-center justify-center space-y-4 max-w-md mx-auto my-6 shadow-sm">
      <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-3xl flex items-center justify-center shadow-inner">
        <Store className="w-8 h-8" />
      </div>
      <div>
        <h3 className="text-lg font-bold text-slate-800 tracking-tight">{title}</h3>
        <p className="text-xs text-slate-400 font-medium">{titleHi}</p>
        <p className="text-sm text-slate-500 mt-2">{description}</p>
      </div>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition shadow-sm active:scale-95"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Filters / फ़िल्टर हटाएं</span>
        </button>
      )}
    </div>
  );
}
