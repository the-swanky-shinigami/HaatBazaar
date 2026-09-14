// src/components/StockBadge.jsx
import React from 'react';
import { Check, X } from 'lucide-react';

export default function StockBadge({ isInStock, size = 'sm', className = '' }) {
  const inStock = Boolean(isInStock === 1 || isInStock === true);

  if (inStock) {
    return (
      <span
        className={`inline-flex items-center space-x-1 font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 ${
          size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'
        } ${className}`}
      >
        <Check className={size === 'sm' ? 'w-3 h-3 text-emerald-600' : 'w-4 h-4 text-emerald-600'} />
        <span>In Stock</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center space-x-1 font-medium rounded-full bg-rose-50 text-rose-600 border border-rose-200 ${
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'
      } ${className}`}
    >
      <X className={size === 'sm' ? 'w-3 h-3 text-rose-500' : 'w-4 h-4 text-rose-500'} />
      <span>Out of Stock</span>
    </span>
  );
}
