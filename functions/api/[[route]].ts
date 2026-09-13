import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { handle } from 'hono/cloudflare-pages';

export type Bindings = {
  DB: D1Database;
  ADMIN_SECRET_KEY: string;
  JWT_SECRET: string;
  ADMIN_UPI_VPA: string;
};

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

// 404 catch-all
app.notFound((c) => c.json({ error: 'Endpoint Not Found' }, 404));

// Global error handler
app.onError((err, c) => {
  console.error('API Error:', err);
  return c.json({ error: err.message || 'Internal Server Error' }, 500);
});

export const onRequest = handle(app);
