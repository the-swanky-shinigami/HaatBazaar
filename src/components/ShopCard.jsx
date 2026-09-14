// src/components/ShopCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, User, Package, ChevronRight } from 'lucide-react';
import { getCategoryMeta } from '../lib/formatters';
import FreshnessBadge from './FreshnessBadge';
import CallWhatsAppButtons from './CallWhatsAppButtons';

export default function ShopCard({ shop }) {
  const navigate = useNavigate();
  const category = getCategoryMeta(shop.category);

  const handleCardClick = () => {
    navigate(`/shop/${shop.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:border-orange-300 transition-all cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Top bar: Category chip + Freshness badge */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold bg-orange-50 text-orange-700 border border-orange-100">
            <span>{category.emoji}</span>
            <span>{category.label}</span>
          </span>
          <FreshnessBadge lastActiveAt={shop.last_active_at} />
        </div>

        {/* Shop Name & Owner */}
        <div className="mb-3">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition tracking-tight">
              {shop.name}
            </h3>
            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-orange-500 group-hover:translate-x-0.5 transition flex-shrink-0 mt-0.5" />
          </div>
          <p className="text-xs font-medium text-slate-500 flex items-center space-x-1 mt-0.5">
            <User className="w-3.5 h-3.5 text-slate-400" />
            <span>{shop.owner_name}</span>
          </p>
        </div>

        {/* Location & Landmark */}
        <div className="flex items-start space-x-1.5 text-xs text-slate-600 mb-4 bg-slate-50/80 p-2.5 rounded-2xl border border-slate-100">
          <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
          <div className="min-w-0">
            <p className="font-semibold text-slate-800 truncate">{shop.hamlet_ward}</p>
            {shop.landmark && (
              <p className="text-slate-500 text-[11px] truncate">Near: {shop.landmark}</p>
            )}
          </div>
        </div>

        {/* Inventory preview counter */}
        <div className="flex items-center space-x-1.5 text-xs text-slate-500 mb-4 font-medium">
          <Package className="w-3.5 h-3.5 text-slate-400" />
          <span>
            {shop.total_items > 0 ? (
              <>
                <strong className="text-slate-700">{shop.total_items}</strong> items listed
                <span className="text-slate-300 mx-1">•</span>
                <strong className="text-emerald-600">{shop.in_stock_items}</strong> in stock
              </>
            ) : (
              'Catalog available on request'
            )}
          </span>
        </div>
      </div>

      {/* Bottom Contact Actions */}
      <div className="pt-2 border-t border-slate-100">
        <CallWhatsAppButtons
          phone={shop.phone}
          shopName={shop.name}
          size="sm"
          fullWidth={true}
        />
      </div>
    </div>
  );
}
