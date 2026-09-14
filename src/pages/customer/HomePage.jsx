// src/pages/customer/HomePage.jsx
import React from 'react';
import { Store, Sparkles, SlidersHorizontal } from 'lucide-react';
import { useShops } from '../../hooks/useShops';
import { getCategoryMeta } from '../../lib/formatters';
import SearchBar from '../../components/SearchBar';
import CategoryFilter from '../../components/CategoryFilter';
import ShopCard from '../../components/ShopCard';
import { ShopGridSkeleton } from '../../components/LoadingSkeleton';
import EmptyState from '../../components/EmptyState';

export default function HomePage() {
  const {
    shops,
    loading,
    error,
    category,
    setCategory,
    query,
    setQuery,
    refetch,
  } = useShops('all', '');

  const activeCategoryMeta = category !== 'all' ? getCategoryMeta(category) : null;

  return (
    <div className="space-y-6">
      {/* Welcome & Discovery Banner */}
      <section className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-3xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-xl">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-white mb-3">
            <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
            <span>Direct Village Commerce</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
            Find local haat shops & fresh stock today
          </h2>
          <p className="text-orange-100 text-xs sm:text-sm mt-1.5 font-medium">
            Connect directly with village sellers. No commission, no middlemen.
          </p>
        </div>
        <div className="absolute right-[-20px] bottom-[-20px] opacity-15 text-8xl pointer-events-none select-none">
          🏪
        </div>
      </section>

      {/* Sticky Search & Filter Controls */}
      <section className="space-y-3 sticky top-[68px] z-30 bg-slate-50/95 backdrop-blur-md pt-1 pb-2">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search by shop name, item, or owner..."
        />
        <CategoryFilter
          selectedCategory={category}
          onSelectCategory={setCategory}
        />
      </section>

      {/* Active Filter Info / Count */}
      <div className="flex items-center justify-between px-1 text-xs text-slate-500 font-medium">
        <div className="flex items-center space-x-2">
          <span>
            {loading ? (
              'Searching market...'
            ) : (
              <>
                Showing <strong className="text-slate-800">{shops.length}</strong> {shops.length === 1 ? 'shop' : 'shops'}
                {activeCategoryMeta && (
                  <> in <strong className="text-orange-600">{activeCategoryMeta.label}</strong></>
                )}
                {query && (
                  <> for "<strong className="text-slate-700">{query}</strong>"</>
                )}
              </>
            )}
          </span>
        </div>
        {(category !== 'all' || query) && (
          <button
            type="button"
            onClick={() => {
              setCategory('all');
              setQuery('');
            }}
            className="text-orange-600 hover:text-orange-700 font-semibold underline underline-offset-2"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Content Area */}
      {loading ? (
        <ShopGridSkeleton count={4} />
      ) : error ? (
        <div className="bg-rose-50 border border-rose-200 rounded-3xl p-6 text-center text-rose-700 space-y-3">
          <p className="font-semibold">{error}</p>
          <button
            onClick={refetch}
            className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700 transition"
          >
            Try Again
          </button>
        </div>
      ) : shops.length === 0 ? (
        <EmptyState
          title={query ? `No shops found for "${query}"` : 'No shops in this category'}
          titleHi="इस श्रेणी में कोई दुकान नहीं है"
          description="Try selecting 'All Shops' or search for a different item or village ward."
          onReset={() => {
            setCategory('all');
            setQuery('');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {shops.map((shop) => (
            <ShopCard key={shop.id} shop={shop} />
          ))}
        </div>
      )}
    </div>
  );
}
