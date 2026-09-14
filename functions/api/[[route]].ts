import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { handle } from 'hono/cloudflare-pages';

export type Bindings = {
  DB: D1Database;
  ADMIN_SECRET_KEY: string;
  JWT_SECRET: string;
  ADMIN_UPI_VPA: string;
};

// Master Categories (Bilingual with icons)
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

const app = new Hono<{ Bindings: Bindings }>().basePath('/api');

// Global CORS middleware
app.use('*', cors());

// Health check endpoint
app.get('/health', (c) => {
  return c.json({
    status: 'ok',
    app: 'HaatBazaar',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// D1 Database diagnostic health check
app.get('/health/db', async (c) => {
  try {
    if (!c.env.DB) {
      return c.json({ status: 'error', message: 'D1 binding DB is not configured' }, 500);
    }
    const result = await c.env.DB.prepare('SELECT count(*) as count FROM shops').first<{ count: number }>();
    return c.json({
      status: 'ok',
      database: 'connected',
      shopCount: result ? result.count : 0,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return c.json({ status: 'error', message: err.message }, 500);
  }
});

// -------------------------------------------------------------
// Customer Public Routes
// -------------------------------------------------------------

// GET /api/categories - Master category list
app.get('/categories', (c) => {
  return c.json({
    success: true,
    categories: CATEGORIES,
  });
});

// GET /api/shops - List active shops with search, category filter, pagination, item counts
app.get('/shops', async (c) => {
  try {
    const db = c.env.DB;
    if (!db) {
      return c.json({ error: 'Database connection unavailable' }, 500);
    }

    const q = (c.req.query('q') || '').trim();
    const category = (c.req.query('category') || '').trim();
    const ward = (c.req.query('ward') || '').trim();
    const page = Math.max(1, parseInt(c.req.query('page') || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(c.req.query('limit') || '30', 10)));
    const offset = (page - 1) * limit;

    let whereClause = "WHERE s.status = 'active'";
    const params: any[] = [];

    if (q) {
      whereClause += " AND (s.name LIKE ? OR s.owner_name LIKE ? OR s.landmark LIKE ?)";
      const pattern = `%${q}%`;
      params.push(pattern, pattern, pattern);
    }

    if (category && category !== 'all') {
      whereClause += " AND s.category = ?";
      params.push(category);
    }

    if (ward) {
      whereClause += " AND s.hamlet_ward LIKE ?";
      params.push(`%${ward}%`);
    }

    // Count total matching
    const countSql = `SELECT COUNT(*) as total FROM shops s ${whereClause}`;
    const countStmt = db.prepare(countSql).bind(...params);
    const countRes = await countStmt.first<{ total: number }>();
    const total = countRes ? countRes.total : 0;

    // Fetch shops with aggregated item inventory summary (excluding sensitive pin_salt / pin_hash)
    const sql = `
      SELECT 
        s.id,
        s.name,
        s.owner_name,
        s.phone,
        s.category,
        s.hamlet_ward,
        s.landmark,
        s.upi_id,
        s.status,
        s.last_active_at,
        s.created_at,
        COALESCE(COUNT(i.id), 0) as total_items,
        COALESCE(SUM(CASE WHEN i.is_in_stock = 1 THEN 1 ELSE 0 END), 0) as in_stock_items
      FROM shops s
      LEFT JOIN items i ON s.id = i.shop_id
      ${whereClause}
      GROUP BY s.id
      ORDER BY s.last_active_at DESC, s.created_at DESC
      LIMIT ? OFFSET ?
    `;

    const selectParams = [...params, limit, offset];
    const { results } = await db.prepare(sql).bind(...selectParams).all();

    return c.json({
      success: true,
      shops: results || [],
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err: any) {
    console.error('Error fetching shops:', err);
    return c.json({ error: err.message || 'Failed to retrieve shops' }, 500);
  }
});

// GET /api/shops/:id - Get single shop details
app.get('/shops/:id', async (c) => {
  try {
    const db = c.env.DB;
    const id = c.req.param('id');

    if (!db) {
      return c.json({ error: 'Database connection unavailable' }, 500);
    }

    const sql = `
      SELECT 
        s.id,
        s.name,
        s.owner_name,
        s.phone,
        s.category,
        s.hamlet_ward,
        s.landmark,
        s.upi_id,
        s.status,
        s.last_active_at,
        s.created_at,
        COALESCE(COUNT(i.id), 0) as total_items,
        COALESCE(SUM(CASE WHEN i.is_in_stock = 1 THEN 1 ELSE 0 END), 0) as in_stock_items
      FROM shops s
      LEFT JOIN items i ON s.id = i.shop_id
      WHERE s.id = ? AND s.status = 'active'
      GROUP BY s.id
    `;

    const shop = await db.prepare(sql).bind(id).first();

    if (!shop) {
      return c.json({ error: 'Shop not found or currently inactive' }, 404);
    }

    return c.json({
      success: true,
      shop,
    });
  } catch (err: any) {
    console.error('Error fetching shop:', err);
    return c.json({ error: err.message || 'Failed to retrieve shop' }, 500);
  }
});

// GET /api/shops/:id/items - List all items for a single shop
app.get('/shops/:id/items', async (c) => {
  try {
    const db = c.env.DB;
    const shopId = c.req.param('id');
    const inStockOnly = c.req.query('in_stock') === '1';

    if (!db) {
      return c.json({ error: 'Database connection unavailable' }, 500);
    }

    let sql = `
      SELECT id, shop_id, name, price, unit, is_in_stock, sort_order, last_stock_update, created_at, updated_at
      FROM items
      WHERE shop_id = ?
    `;
    const params: any[] = [shopId];

    if (inStockOnly) {
      sql += " AND is_in_stock = 1";
    }

    sql += " ORDER BY is_in_stock DESC, sort_order ASC, name ASC";

    const { results } = await db.prepare(sql).bind(...params).all();

    return c.json({
      success: true,
      items: results || [],
    });
  } catch (err: any) {
    console.error('Error fetching items:', err);
    return c.json({ error: err.message || 'Failed to retrieve items' }, 500);
  }
});

// 404 catch-all
app.notFound((c) => c.json({ error: 'Endpoint Not Found' }, 404));

// Global error handler
app.onError((err, c) => {
  console.error('API Error:', err);
  return c.json({ error: err.message || 'Internal Server Error' }, 500);
});

export const onRequest = handle(app);
