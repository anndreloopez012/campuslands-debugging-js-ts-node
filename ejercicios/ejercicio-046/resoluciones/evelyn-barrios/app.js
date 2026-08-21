import express from 'express';

const app = express();

// In-memory cache using a Map
const cache = new Map();

/**
 * Simulates a slow, expensive database call.
 */
const productService = {
  getProducts: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, name: 'Laptop' },
          { id: 2, name: 'Monitor' },
        ]);
      }, 100); // Simulate 100ms latency
    });
  },
};

/**
 * Cache middleware.
 */
const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl;
  if (cache.has(key)) {
    res.setHeader('X-Cache-Status', 'HIT');
    return res.status(200).json(cache.get(key));
  }
  
  // If not in cache, monkey-patch the res.json function
  const originalJson = res.json;
  res.json = (body) => {
    cache.set(key, body); // Store the response body in cache
    res.setHeader('X-Cache-Status', 'MISS');
    return originalJson.call(res, body);
  };
  next();
};

app.get('/products', cacheMiddleware, async (req, res) => {
  const products = await productService.getProducts();
  res.status(200).json(products);
});

export default app;