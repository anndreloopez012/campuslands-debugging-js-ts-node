import express from 'express';

export function createApp() {
  const app = express();
  app.use(express.json());

  let inventory = [
    { id: 1, name: 'Health Potion', type: 'Potion', quantity: 10 },
    { id: 2, name: 'Iron Sword', type: 'Weapon', quantity: 1 },
  ];

  app.patch('/inventory/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const itemIndex = inventory.findIndex(item => item.id === id);

    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // FIX: Merge the existing item with the request body to perform a partial update.
    // The original bug was replacing the object, e.g., { id, ...req.body }
    inventory[itemIndex] = { ...inventory[itemIndex], ...req.body };
    
    res.json(inventory[itemIndex]);
  });

  return app;
}
