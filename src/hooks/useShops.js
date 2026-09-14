// src/hooks/useShops.js
// Custom hook to fetch and filter active shops

import { useState, useEffect, useCallback, useRef } from 'react';
import { api } from '../lib/api';

export function useShops(initialCategory = 'all', initialQuery = '') {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(initialCategory);
  const [query, setQuery] = useState(initialQuery);
  const [pagination, setPagination] = useState({ page: 1, total: 0, totalPages: 1 });

  const debounceTimeoutRef = useRef(null);

  const fetchShops = useCallback(async (cat, q) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (cat && cat !== 'all') params.append('category', cat);
      if (q && q.trim()) params.append('q', q.trim());
      params.append('limit', '50');

      const data = await api.get(`/shops?${params.toString()}`);
      if (data && data.shops) {
        setShops(data.shops);
        setPagination(data.pagination || { page: 1, total: data.shops.length, totalPages: 1 });
      } else {
        setShops([]);
      }
    } catch (err) {
      console.error('Failed to load shops:', err);
      setError(err.message || 'Could not load shops from marketplace');
    } finally {
      setLoading(false);
    }
  }, []);

  // Trigger fetch with debounce for search query
  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      fetchShops(category, query);
    }, 250);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [category, query, fetchShops]);

  return {
    shops,
    loading,
    error,
    category,
    setCategory,
    query,
    setQuery,
    pagination,
    refetch: () => fetchShops(category, query),
  };
}
