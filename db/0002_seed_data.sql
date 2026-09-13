-- =============================================================
-- HaatBazaar Sample Seed Data
-- =============================================================

-- Clean existing data
DELETE FROM seller_sessions;
DELETE FROM items;
DELETE FROM subscriptions;
DELETE FROM shops;

-- Sample Shops
-- Default PIN for seed shops is '1234'
-- Salt: a1b2c3d4e5f678901234567890abcdef
-- Hash of '1234a1b2c3d4e5f678901234567890abcdef' (SHA-256)
-- = e5e9fa1ba31ecd1ae84f75caaa474f3a663f05f4cedd97dbbf830b501bf0353c

INSERT INTO shops (
    id, name, owner_name, phone, pin_hash, pin_salt,
    category, hamlet_ward, landmark, upi_id,
    status, subscription_expires_at, last_active_at, created_at, updated_at
) VALUES 
(
    'shop-1-ramesh-kirana',
    'Ramesh Kirana Store',
    'Ramesh Kumar Patel',
    '9876543210',
    'e5e9fa1ba31ecd1ae84f75caaa474f3a663f05f4cedd97dbbf830b501bf0353c',
    'a1b2c3d4e5f678901234567890abcdef',
    'groceries',
    'Ward 4 (Bazaar Chowk)',
    'Near Old Banyan Tree',
    'ramesh@upi',
    'active',
    datetime('now', '+25 days'),
    datetime('now'),
    datetime('now', '-5 days'),
    datetime('now')
),
(
    'shop-2-geeta-medical',
    'Geeta Medical Store',
    'Geeta Devi Sharma',
    '9876543211',
    'e5e9fa1ba31ecd1ae84f75caaa474f3a663f05f4cedd97dbbf830b501bf0353c',
    'a1b2c3d4e5f678901234567890abcdef',
    'medical',
    'Ward 2 (Hospital Road)',
    'Opposite Primary Health Centre',
    'geetamedical@upi',
    'active',
    datetime('now', '+20 days'),
    datetime('now', '-1 day'),
    datetime('now', '-10 days'),
    datetime('now', '-1 day')
),
(
    'shop-3-kisan-seeds',
    'Kisan Beej & Khad Bhandar',
    'Suresh Yadav',
    '9876543212',
    'e5e9fa1ba31ecd1ae84f75caaa474f3a663f05f4cedd97dbbf830b501bf0353c',
    'a1b2c3d4e5f678901234567890abcdef',
    'fertilizer',
    'Ward 7 (Mandi Gate)',
    'Beside State Warehousing Godown',
    'kisanseeds@upi',
    'pending',
    NULL,
    datetime('now', '-2 days'),
    datetime('now', '-2 days'),
    datetime('now', '-2 days')
);

-- Sample Items for Ramesh Kirana
INSERT INTO items (
    id, shop_id, name, price, unit, is_in_stock, sort_order, last_stock_update, created_at, updated_at
) VALUES
(
    'item-101',
    'shop-1-ramesh-kirana',
    'Desi Toor Dal',
    140.00,
    'kg',
    1,
    1,
    datetime('now'),
    datetime('now', '-5 days'),
    datetime('now')
),
(
    'item-102',
    'shop-1-ramesh-kirana',
    'Mustard Oil (Kacchi Ghani)',
    165.00,
    'liter',
    1,
    2,
    datetime('now'),
    datetime('now', '-5 days'),
    datetime('now')
),
(
    'item-103',
    'shop-1-ramesh-kirana',
    'Chakki Fresh Atta (MP Sharbati)',
    38.00,
    'kg',
    1,
    3,
    datetime('now'),
    datetime('now', '-5 days'),
    datetime('now')
),
(
    'item-104',
    'shop-1-ramesh-kirana',
    'Basmati Rice Grade A',
    95.00,
    'kg',
    0,
    4,
    datetime('now', '-1 day'),
    datetime('now', '-5 days'),
    datetime('now', '-1 day')
);

-- Sample Items for Geeta Medical
INSERT INTO items (
    id, shop_id, name, price, unit, is_in_stock, sort_order, last_stock_update, created_at, updated_at
) VALUES
(
    'item-201',
    'shop-2-geeta-medical',
    'Paracetamol 650mg (Strip of 15)',
    32.00,
    'strip',
    1,
    1,
    datetime('now', '-1 day'),
    datetime('now', '-10 days'),
    datetime('now', '-1 day')
),
(
    'item-202',
    'shop-2-geeta-medical',
    'ORS Electrolyte Powder (Sachet)',
    22.00,
    'piece',
    1,
    2,
    datetime('now', '-1 day'),
    datetime('now', '-10 days'),
    datetime('now', '-1 day')
),
(
    'item-203',
    'shop-2-geeta-medical',
    'Digital Thermometer',
    180.00,
    'piece',
    0,
    3,
    datetime('now', '-2 days'),
    datetime('now', '-10 days'),
    datetime('now', '-2 days')
);

-- Sample Subscriptions
INSERT INTO subscriptions (
    id, shop_id, utr_number, amount, submitted_at, reviewed_at, reviewed_by, status, notes
) VALUES
(
    'sub-101',
    'shop-1-ramesh-kirana',
    '423190823412',
    99.00,
    datetime('now', '-5 days'),
    datetime('now', '-5 days'),
    'admin',
    'approved',
    'Verified via bank statement'
),
(
    'sub-102',
    'shop-3-kisan-seeds',
    '430182749102',
    99.00,
    datetime('now', '-2 days'),
    NULL,
    NULL,
    'under_review',
    'Pending admin verification'
);
