// src/hooks/useShopDetail.js
// Custom hook to fetch a single shop profile and its inventory

import { useState, useEffect, useCallback } from 'react';
import { api } from '../lib/api';

export function useShopDetail(shopId) {
  const [shop, setShop] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchShopData = useCallback(async () => {
    if (!shopId) return;

    setLoading(true);
    setError(null);

    try {
      const [shopResponse, itemsResponse] = await Promise.all([
        api.get(`/shops/${shopId}`),
        api.get(`/shops/${shopId}/items`),
      ]);

      if (shopResponse && shopResponse.shop) {
        setShop(shopResponse.shop);
      } else {
        throw new Error('Shop not found');
      }

      setItems(itemsResponse && itemsResponse.items ? itemsResponse.items : []);
    } catch (err) {
      console.error('Failed to load shop details:', err);
      setError(err.message || 'Failed to load shop details');
    } finally {
      setLoading(false);
    }
  }, [shopId]);

  useEffect(() => {
    fetchShopData();
  }, [fetchShopData]);

  return {
    shop,
    items,
    loading,
    error,
    refetch: fetchShopData,
  };
}
