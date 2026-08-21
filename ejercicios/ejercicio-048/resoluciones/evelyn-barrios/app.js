import express from 'express';

const app = express();
app.use(express.json());

// In-memory cache and data store
const cache = new Map();
let products = [
  { id: 1, name: 'Laptop' },
  { id: 2, name: 'Monitor' },
];

// --- Cache Middleware ---
const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl;
  if (cache.has(key)) {
    res.setHeader('X-Cache-Status', 'HIT');
    return res.status(200).json(cache.get(key));
  }

  const originalJson = res.json;
  res.json = (body) => {
    cache.set(key, body);
    res.setHeader('X-Cache-Status', 'MISS');
    return originalJson.call(res, body);
  };
  next();
};

// --- Endpoints ---

app.get('/products', cacheMiddleware, (req, res) => {
  // In a real app, this would be a slow database call.
  // We return a copy to avoid mutations affecting the original array.
  res.status(200).json([...products]);
});

app.post('/products', (req, res) => {
  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
  };
  products.push(newProduct);

  // FIX: Invalidate the cache for the /products endpoint.
  // The original bug was the absence of this line.
  // Without it, subsequent GET requests would serve stale data.
  if (cache.has('/products')) {
    cache.delete('/products');
  }

  res.status(201).json(newProduct);
});

export default app;
