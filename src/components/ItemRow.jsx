// src/components/ItemRow.jsx
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { formatPrice, getWhatsAppLink } from '../lib/formatters';
import StockBadge from './StockBadge';

export default function ItemRow({ item, shopPhone, shopName }) {
  const isAvailable = Boolean(item.is_in_stock === 1 || item.is_in_stock === true);
  const waLink = getWhatsAppLink(shopPhone, shopName, item.name);

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-150 hover:border-slate-300 transition shadow-sm">
      <div className="min-w-0 pr-3">
        <div className="flex items-center space-x-2">
          <h4 className={`text-base font-bold tracking-tight truncate ${isAvailable ? 'text-slate-900' : 'text-slate-500'}`}>
            {item.name}
          </h4>
        </div>
        <div className="flex items-center space-x-2.5 mt-1">
          <span className={`text-sm font-semibold ${isAvailable ? 'text-orange-600' : 'text-slate-400'}`}>
            {formatPrice(item.price, item.unit)}
          </span>
          <StockBadge isInStock={item.is_in_stock} size="sm" />
        </div>
      </div>

      {/* Quick WhatsApp Inquiry for this specific item */}
      {shopPhone && (
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition border border-emerald-200 active:scale-95"
          title={`Ask about ${item.name} on WhatsApp`}
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
          <span className="hidden sm:inline">Ask</span>
        </a>
      )}
    </div>
  );
}
