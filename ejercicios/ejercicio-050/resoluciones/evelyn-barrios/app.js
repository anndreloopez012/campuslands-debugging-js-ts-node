import express from 'express';

const app = express();
app.use(express.json());

// Base de datos en memoria
let items = [];
let currentId = 1;

// CREATE
app.post('/items', (req, res) => {
  const newItem = { id: currentId++, ...req.body };
  items.push(newItem);
  // FIX: El status correcto para creación es 201 Created.
  res.status(201).json(newItem);
});

// READ (All)
app.get('/items', (req, res) => {
  res.status(200).json(items);
});

// READ (by ID)
app.get('/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = items.find(i => i.id === id);
  // FIX: Si no se encuentra, el status debe ser 404 Not Found.
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  res.status(200).json(item);
});

// UPDATE
app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const itemIndex = items.findIndex(i => i.id === id);
  // FIX: Manejar el caso de que el item a actualizar no exista.
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  // FIX: La actualización debe preservar el ID y fusionar los nuevos datos.
  const updatedItem = { ...items[itemIndex], ...req.body };
  items[itemIndex] = updatedItem;
  res.status(200).json(updatedItem);
});

// DELETE
app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const itemIndex = items.findIndex(i => i.id === id);
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  items.splice(itemIndex, 1);
  // FIX: El status correcto para un borrado exitoso es 204 No Content.
  res.status(204).send();
});

export default app;
