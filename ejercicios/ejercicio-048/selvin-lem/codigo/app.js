import express from 'express';

export function createApp() {
  const app = express();
  app.use(express.json());

  const items = [
    { id: 1, name: 'alpha', score: 10 },
    { id: 2, name: 'beta', score: 20 }
  ];

  app.get('/health', (req, res) => {
    res.status(200).json({ ok: true });
  });

  app.get('/items/:id', (req, res) => {
    const item = items.find(current => current.id === Number(req.params.id));
    if (!item) return res.status(404).json({ error: 'not found' });
    return res.json(item);
  });

  app.post('/items', (req, res) => {
    const item = { id: items.length + 1, ...req.body };
    items.push(item);
    return res.status(201).json(item);
  });

  return app;
}