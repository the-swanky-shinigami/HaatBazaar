// src/components/CallWhatsAppButtons.jsx
import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { getCallLink, getWhatsAppLink } from '../lib/formatters';

export default function CallWhatsAppButtons({
  phone,
  shopName = '',
  itemName = null,
  size = 'md',
  fullWidth = false,
  className = '',
}) {
  const callLink = getCallLink(phone);
  const waLink = getWhatsAppLink(phone, shopName, itemName);

  const isSmall = size === 'sm';

  return (
    <div className={`flex items-center gap-2 ${fullWidth ? 'w-full' : ''} ${className}`}>
      {/* Call Button */}
      <a
        href={callLink}
        onClick={(e) => e.stopPropagation()}
        className={`inline-flex items-center justify-center font-semibold rounded-xl transition shadow-sm active:scale-95 bg-slate-900 hover:bg-slate-800 text-white ${
          isSmall
            ? 'px-3 py-1.5 text-xs gap-1.5'
            : 'px-4 py-2.5 text-sm gap-2'
        } ${fullWidth ? 'flex-1' : ''}`}
        aria-label={`Call ${shopName || 'seller'}`}
      >
        <Phone className={isSmall ? 'w-3.5 h-3.5 text-emerald-400' : 'w-4 h-4 text-emerald-400'} />
        <span>Call</span>
      </a>

      {/* WhatsApp Button */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className={`inline-flex items-center justify-center font-semibold rounded-xl transition shadow-sm active:scale-95 bg-emerald-600 hover:bg-emerald-700 text-white ${
          isSmall
            ? 'px-3 py-1.5 text-xs gap-1.5'
            : 'px-4 py-2.5 text-sm gap-2'
        } ${fullWidth ? 'flex-1' : ''}`}
        aria-label={`Chat with ${shopName || 'seller'} on WhatsApp`}
      >
        <MessageCircle className={isSmall ? 'w-3.5 h-3.5 text-white' : 'w-4 h-4 text-white'} />
        <span>WhatsApp</span>
      </a>
    </div>
  );
}
