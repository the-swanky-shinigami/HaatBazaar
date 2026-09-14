// src/lib/formatters.js
// Utility helpers for prices, dates, categories, and direct contact links

import { CATEGORIES } from './constants';

/**
 * Format item price with unit
 * e.g., formatPrice(140, 'kg') => "₹140 / kg"
 * e.g., formatPrice(null) => "Price on call"
 */
export function formatPrice(price, unit) {
  if (price === null || price === undefined || price === '') {
    return 'Price on call';
  }
  const formatted = Number(price).toLocaleString('en-IN', {
    maximumFractionDigits: 2,
  });
  return unit ? `₹${formatted} / ${unit}` : `₹${formatted}`;
}

/**
 * Calculate humanized relative freshness of a shop's inventory
 */
export function formatRelativeTime(dateString) {
  if (!dateString) {
    return { en: 'Recently active', hi: 'सक्रिय', isFresh: false };
  }

  // SQLite timestamps are UTC by default: 'YYYY-MM-DD HH:MM:SS'
  const normalized = dateString.includes('T') ? dateString : dateString.replace(' ', 'T') + 'Z';
  const timestamp = new Date(normalized).getTime();
  const now = Date.now();
  const diffMs = now - timestamp;

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (hours < 18) {
    return { en: 'Updated Today', hi: 'आज अपडेट हुआ', isFresh: true };
  } else if (hours < 36 || days <= 1) {
    return { en: 'Yesterday', hi: 'कल', isFresh: false };
  } else if (days < 7) {
    return { en: `${days} days ago`, hi: `${days} दिन पहले`, isFresh: false };
  } else {
    return { en: 'A while ago', hi: 'कुछ दिन पहले', isFresh: false };
  }
}

/**
 * Find category metadata (label, emoji, Hindi label) by ID
 */
export function getCategoryMeta(categoryId) {
  const found = CATEGORIES.find((c) => c.id === categoryId);
  return (
    found || {
      id: categoryId || 'other',
      label: categoryId ? categoryId.charAt(0).toUpperCase() + categoryId.slice(1) : 'General',
      emoji: '🏪',
      labelHi: 'दुकान',
    }
  );
}

/**
 * Clean and format 10-digit Indian mobile number for dialing/WhatsApp
 */
export function cleanPhoneNumber(phone) {
  if (!phone) return '';
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `91${digits}`;
  }
  if (digits.length > 10 && digits.startsWith('91')) {
    return digits;
  }
  return digits;
}

/**
 * Generate a pre-filled WhatsApp click-to-chat URL
 */
export function getWhatsAppLink(phone, shopName, itemName) {
  const cleanPhone = cleanPhoneNumber(phone);
  if (!cleanPhone) return '#';

  let message = `Namaste ${shopName || 'Bhaiya'}, I saw your shop on HaatBazaar.`;
  if (itemName) {
    message += ` Is "${itemName}" available right now?`;
  } else {
    message += ` Are you open today and what items are available?`;
  }

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Generate direct telephone dialer link
 */
export function getCallLink(phone) {
  const cleanPhone = cleanPhoneNumber(phone);
  return cleanPhone ? `tel:+${cleanPhone}` : '#';
}
