app.get('/health', (req, res) => {
  res.status(200).json({ ok: true });
});

app.get('/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = items.find(current => current.id === id);
  if (!item) return res.status(404).json({ error: 'not found' });
  return res.json(item);
});

app.post('/items', (req, res) => {
  const item = { id: items.length + 1, ...req.body };
  items.push(item);
  return res.status(200).json(item);
});

return app;
}
