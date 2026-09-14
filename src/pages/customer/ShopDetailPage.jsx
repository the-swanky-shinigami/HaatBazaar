// src/pages/customer/ShopDetailPage.jsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, User, Phone, QrCode, CheckCircle2, PackageSearch } from 'lucide-react';
import { useShopDetail } from '../../hooks/useShopDetail';
import { getCategoryMeta } from '../../lib/formatters';
import FreshnessBadge from '../../components/FreshnessBadge';
import CallWhatsAppButtons from '../../components/CallWhatsAppButtons';
import ItemRow from '../../components/ItemRow';
import { ItemListSkeleton } from '../../components/LoadingSkeleton';

export default function ShopDetailPage() {
  const { id } = useParams();
  const { shop, items, loading, error, refetch } = useShopDetail(id);

  const [inStockOnly, setInStockOnly] = useState(false);
  const [itemSearch, setItemSearch] = useState('');

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-6 w-32 bg-slate-200 rounded-lg animate-pulse"></div>
        <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-4 animate-pulse">
          <div className="h-6 w-24 bg-slate-200 rounded-xl"></div>
          <div className="h-8 w-2/3 bg-slate-200 rounded-xl"></div>
          <div className="h-4 w-1/3 bg-slate-150 rounded"></div>
        </div>
        <ItemListSkeleton count={4} />
      </div>
    );
  }

  if (error || !shop) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-4 my-8">
        <h3 className="text-lg font-bold text-slate-800">Shop Not Found</h3>
        <p className="text-sm text-slate-500">{error || 'This shop is currently inactive or does not exist.'}</p>
        <Link
          to="/"
          className="inline-flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-xl text-xs font-bold hover:bg-orange-700 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Market / वापस जाएं</span>
        </Link>
      </div>
    );
  }

  const category = getCategoryMeta(shop.category);

  // Filter items
  const filteredItems = items.filter((item) => {
    if (inStockOnly && item.is_in_stock !== 1) return false;
    if (itemSearch.trim() && !item.name.toLowerCase().includes(itemSearch.toLowerCase().trim())) {
      return false;
    }
    return true;
  });

  const inStockCount = items.filter((i) => i.is_in_stock === 1).length;

  return (
    <div className="space-y-6 pb-12">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-500 hover:text-orange-600 transition group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition" />
        <span>Back to Market / वापस जाएं</span>
      </Link>

      {/* Shop Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
        {/* Category & Freshness Header */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-orange-50 text-orange-700 border border-orange-200">
            <span>{category.emoji}</span>
            <span>{category.label}</span>
            <span className="text-orange-600/70 font-normal">({category.labelHi})</span>
          </span>
          <FreshnessBadge lastActiveAt={shop.last_active_at} />
        </div>

        {/* Title & Owner */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {shop.name}
          </h2>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-xs text-slate-600 font-medium">
            <span className="flex items-center space-x-1">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>Owner: <strong className="text-slate-800">{shop.owner_name}</strong></span>
            </span>
            <span className="flex items-center space-x-1">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>{shop.phone}</span>
            </span>
          </div>
        </div>

        {/* Location & Landmark Box */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-start space-x-3 text-xs text-slate-700">
          <MapPin className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-bold text-slate-900">{shop.hamlet_ward}</p>
            {shop.landmark && (
              <p className="text-slate-500">Landmark: {shop.landmark}</p>
            )}
          </div>
        </div>

        {/* UPI ID Info (if configured) */}
        {shop.upi_id && (
          <div className="flex items-center space-x-2 text-xs text-slate-600 bg-emerald-50/70 border border-emerald-100 px-3 py-2 rounded-xl">
            <QrCode className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Pay directly via UPI: <strong className="font-mono text-emerald-800">{shop.upi_id}</strong></span>
          </div>
        )}

        {/* Direct Contact Buttons */}
        <div className="pt-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Contact Seller Directly
          </p>
          <CallWhatsAppButtons
            phone={shop.phone}
            shopName={shop.name}
            size="lg"
            fullWidth={true}
          />
        </div>
      </div>

      {/* Inventory / Items Section */}
      <div className="space-y-4">
        {/* Section Header & Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Items & Stock</span>
              <span className="bg-slate-100 text-slate-700 text-xs px-2.5 py-0.5 rounded-full font-bold">
                {items.length}
              </span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              {inStockCount} of {items.length} items currently in stock
            </p>
          </div>

          {/* Filter Toggles */}
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setInStockOnly(!inStockOnly)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border ${
                inStockOnly
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {inStockOnly ? '✓ Showing In Stock Only' : 'Only In Stock'}
            </button>
          </div>
        </div>

        {/* Local Item Search (if items > 4) */}
        {items.length > 4 && (
          <div className="relative">
            <PackageSearch className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={itemSearch}
              onChange={(e) => setItemSearch(e.target.value)}
              placeholder="Search items in this shop..."
              className="w-full pl-10 pr-4 py-2 bg-white text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-orange-500"
            />
          </div>
        )}

        {/* Item List */}
        {items.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-3">
            <p className="text-sm font-semibold text-slate-700">No items listed in the digital catalog yet.</p>
            <p className="text-xs text-slate-500">
              You can still tap <strong>Call</strong> or <strong>WhatsApp</strong> above to check with the seller directly!
            </p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 text-center text-xs text-slate-500">
            No items matched your filter.
          </div>
        ) : (
          <div className="space-y-2.5">
            {filteredItems.map((item) => (
              <ItemRow
                key={item.id}
                item={item}
                shopPhone={shop.phone}
                shopName={shop.name}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
