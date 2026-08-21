import express from 'express';

export function createApp() {
  const app = express();
  app.use(express.json());

  let orders = [
    { id: 1, product: 'Laptop', status: 'pending' },
    { id: 2, product: 'Mouse', status: 'completed' },
  ];

  app.put('/orders/:id/status', (req, res) => {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    const order = orders.find(o => o.id === id);

    // FIX 1: 
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    
    if (order.status === 'completed') {
      return res.status(422).json({ error: 'Cannot update a completed order' });
    }

    order.status = status;
    res.json(order);
  });

  return app;
}