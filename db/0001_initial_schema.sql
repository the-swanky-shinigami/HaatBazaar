-- =============================================================
-- HaatBazaar Database Schema v1.0
-- Target: Cloudflare D1 (SQLite)
-- =============================================================


-- ---------------------------------------------------------
-- SHOPS TABLE
-- Core entity: each row = one seller's shop listing.
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS shops (
    id TEXT PRIMARY KEY,                          -- UUID v4
    name TEXT NOT NULL,                           -- Shop display name ("Ramesh Kirana Store")
    owner_name TEXT NOT NULL,                     -- Owner's full name
    phone TEXT NOT NULL UNIQUE,                   -- 10-digit Indian mobile (unique per shop)
    pin_hash TEXT NOT NULL,                       -- SHA-256 hash of (pin + salt)
    pin_salt TEXT NOT NULL,                       -- Random 16-byte hex salt (generated at registration)
    category TEXT NOT NULL,                       -- Enum: see CATEGORIES constant
    hamlet_ward TEXT NOT NULL,                    -- Village/Ward name or number
    landmark TEXT,                                -- Nearby landmark for easy discovery
    upi_id TEXT,                                  -- Seller's own UPI ID (for customers, future use)
    status TEXT NOT NULL DEFAULT 'pending',        -- 'pending' | 'active' | 'suspended' | 'expired'
    subscription_expires_at TEXT,                 -- ISO 8601 datetime string
    last_active_at TEXT DEFAULT (datetime('now')),-- Last time seller pressed "I'm open today"
    created_at TEXT DEFAULT (datetime('now')),    -- Row creation timestamp
    updated_at TEXT DEFAULT (datetime('now'))     -- Last modification timestamp
);

-- Index for common queries
CREATE INDEX IF NOT EXISTS idx_shops_status ON shops(status);
CREATE INDEX IF NOT EXISTS idx_shops_category ON shops(category);
CREATE INDEX IF NOT EXISTS idx_shops_hamlet ON shops(hamlet_ward);
CREATE INDEX IF NOT EXISTS idx_shops_phone ON shops(phone);

-- ---------------------------------------------------------
-- ITEMS TABLE
-- Each row = one product/item listed by a shop.
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS items (
    id TEXT PRIMARY KEY,                          -- UUID v4
    shop_id TEXT NOT NULL,                        -- FK → shops.id
    name TEXT NOT NULL,                           -- Item display name ("Toor Dal", "Buffalo Calf")
    price REAL,                                   -- Price in INR (NULL = "Ask seller")
    unit TEXT,                                    -- Unit: 'kg', 'piece', 'liter', 'dozen', 'quintal', etc.
    is_in_stock INTEGER NOT NULL DEFAULT 1,       -- 1 = in stock, 0 = out of stock (SQLite boolean)
    sort_order INTEGER NOT NULL DEFAULT 0,        -- For manual ordering within shop
    last_stock_update TEXT DEFAULT (datetime('now')), -- When stock status last changed
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (shop_id) REFERENCES shops(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_items_shop ON items(shop_id);
CREATE INDEX IF NOT EXISTS idx_items_stock ON items(is_in_stock);

-- ---------------------------------------------------------
-- SUBSCRIPTIONS TABLE
-- Payment ledger: each row = one UPI payment submission.
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS subscriptions (
    id TEXT PRIMARY KEY,                          -- UUID v4
    shop_id TEXT NOT NULL,                        -- FK → shops.id
    utr_number TEXT NOT NULL,                     -- 12-digit UPI Transaction Reference
    amount REAL NOT NULL,                         -- Amount in INR (e.g., 99.00)
    screenshot_url TEXT,                          -- (Future) R2 URL of payment screenshot
    submitted_at TEXT DEFAULT (datetime('now')),  -- When seller submitted the UTR
    reviewed_at TEXT,                             -- When admin reviewed
    reviewed_by TEXT,                             -- Admin identifier (for audit)
    status TEXT NOT NULL DEFAULT 'under_review',  -- 'under_review' | 'approved' | 'rejected'
    rejection_reason TEXT,                        -- Why admin rejected (shown to seller)
    notes TEXT,                                   -- Internal admin notes
    FOREIGN KEY (shop_id) REFERENCES shops(id)
);

CREATE INDEX IF NOT EXISTS idx_subs_shop ON subscriptions(shop_id);
CREATE INDEX IF NOT EXISTS idx_subs_status ON subscriptions(status);

-- ---------------------------------------------------------
-- SELLER SESSIONS TABLE (Lightweight auth)
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS seller_sessions (
    id TEXT PRIMARY KEY,                          -- Session token (UUID v4 or JWT jti)
    shop_id TEXT NOT NULL,                        -- FK → shops.id
    created_at TEXT DEFAULT (datetime('now')),
    expires_at TEXT NOT NULL,                     -- Session expiry (e.g., 30 days from creation)
    is_active INTEGER NOT NULL DEFAULT 1,         -- 1 = valid, 0 = revoked
    FOREIGN KEY (shop_id) REFERENCES shops(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_sessions_shop ON seller_sessions(shop_id);
