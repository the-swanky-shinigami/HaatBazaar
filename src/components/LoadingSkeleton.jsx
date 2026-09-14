// src/components/LoadingSkeleton.jsx
import React from 'react';

export function ShopCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm animate-pulse space-y-4">
      <div className="flex items-center justify-between">
        <div className="h-6 w-24 bg-slate-200 rounded-xl"></div>
        <div className="h-5 w-20 bg-slate-200 rounded-full"></div>
      </div>
      <div className="space-y-2">
        <div className="h-5 w-3/4 bg-slate-200 rounded-lg"></div>
        <div className="h-4 w-1/2 bg-slate-150 rounded-lg"></div>
      </div>
      <div className="h-10 w-full bg-slate-100 rounded-2xl"></div>
      <div className="h-4 w-1/3 bg-slate-150 rounded-md"></div>
      <div className="pt-2 border-t border-slate-100 flex gap-2">
        <div className="h-9 flex-1 bg-slate-200 rounded-xl"></div>
        <div className="h-9 flex-1 bg-slate-200 rounded-xl"></div>
      </div>
    </div>
  );
}

export function ShopGridSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <ShopCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ItemListSkeleton({ count = 3 }) {
  return (
    <div className="space-y-2.5">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="p-4 bg-white rounded-2xl border border-slate-150 animate-pulse flex justify-between items-center">
          <div className="space-y-2 w-2/3">
            <div className="h-4 w-1/2 bg-slate-200 rounded"></div>
            <div className="h-3 w-1/4 bg-slate-150 rounded"></div>
          </div>
          <div className="h-8 w-16 bg-slate-200 rounded-xl"></div>
        </div>
      ))}
    </div>
  );
}
