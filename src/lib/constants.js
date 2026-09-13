// src/lib/constants.js
// Single source of truth for categories, statuses, and app constants

export const CATEGORIES = [
  { id: 'groceries',      label: 'Groceries / Kirana',    emoji: '🛒', labelHi: 'किराना' },
  { id: 'dairy',          label: 'Dairy & Milk',          emoji: '🥛', labelHi: 'डेयरी' },
  { id: 'vegetables',     label: 'Vegetables & Fruits',   emoji: '🥬', labelHi: 'सब्जी-फल' },
  { id: 'livestock',      label: 'Livestock & Poultry',   emoji: '🐄', labelHi: 'पशुधन' },
  { id: 'hardware',       label: 'Hardware & Tools',      emoji: '🔧', labelHi: 'हार्डवेयर' },
  { id: 'farm_equipment', label: 'Farm Equipment',        emoji: '🚜', labelHi: 'कृषि उपकरण' },
  { id: 'clothing',       label: 'Clothing & Textiles',   emoji: '👕', labelHi: 'कपड़े' },
  { id: 'medical',        label: 'Medical / Pharmacy',    emoji: '💊', labelHi: 'दवाई' },
  { id: 'electronics',    label: 'Electronics & Mobile',  emoji: '📱', labelHi: 'इलेक्ट्रॉनिक्स' },
  { id: 'food_stall',     label: 'Food Stall / Dhaba',    emoji: '🍛', labelHi: 'खाना' },
  { id: 'fertilizer',     label: 'Fertilizer & Seeds',    emoji: '🌱', labelHi: 'खाद-बीज' },
  { id: 'other',          label: 'Other',                 emoji: '📦', labelHi: 'अन्य' },
];

export const SHOP_STATUS = {
  PENDING: 'pending',
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
  EXPIRED: 'expired',
};

export const SUBSCRIPTION_STATUS = {
  UNDER_REVIEW: 'under_review',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};

export const SUBSCRIPTION_AMOUNT = 99; // INR per month

export const ADMIN_UPI_VPA = 'haatbazaar@upi'; // Default fallback

export const COMMON_UNITS = [
  'kg',
  'gram',
  'liter',
  'piece',
  'packet',
  'dozen',
  'quintal',
  'meter',
  'pair',
];
