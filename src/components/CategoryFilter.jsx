// src/components/CategoryFilter.jsx
import React from 'react';
import { CATEGORIES } from '../lib/constants';

export default function CategoryFilter({ selectedCategory = 'all', onSelectCategory, className = '' }) {
  const allCategories = [
    { id: 'all', label: 'All Shops', emoji: '🏪', labelHi: 'सभी' },
    ...CATEGORIES,
  ];

  return (
    <div className={`w-full overflow-x-auto no-scrollbar py-1 ${className}`}>
      <div className="flex items-center space-x-2.5 min-w-max px-0.5">
        {allCategories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`inline-flex items-center space-x-2 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition shadow-sm active:scale-95 border ${
                isSelected
                  ? 'bg-orange-600 text-white border-orange-600 shadow-orange-600/20'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200 hover:border-slate-300'
              }`}
            >
              <span className="text-base">{cat.emoji}</span>
              <span className="tracking-tight">{cat.label}</span>
              <span className={`text-[11px] font-normal ${isSelected ? 'text-orange-100' : 'text-slate-400'}`}>
                {cat.labelHi}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
