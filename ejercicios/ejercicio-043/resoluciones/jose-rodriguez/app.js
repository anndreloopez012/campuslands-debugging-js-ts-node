import express from 'express';

export function createApp() {
    const app = express();
    app.use(express.json());

    const items = [
        { id: 1, name: 'alpha', score: 10 },
        { id: 2, name: 'beta', score: 20 },
        { id: 3, name: 'gamma', score: 30 },
        { id: 4, name: 'delta', score: 40 }
    ];

    app.get('/health', (req, res) => {
        res.status(200).json({ ok: true });
    });

    app.get('/items', (req, res) => {
        const limit = req.query.limit !== undefined ? Number(req.query.limit) : 10;
        const offset = req.query.offset !== undefined ? Number(req.query.offset) : 0;

        const data = items.slice(offset, offset + limit);

        return res.status(200).json({
            data,
            total: items.length,
            limit,
            offset
        });
    });

    app.get('/items/:id', (req, res) => {
        const id = Number(req.params.id);
        const item = items.find(current => current.id === id);
        if (!item) return res.status(404).json({ error: 'not found' });
        return res.status(200).json(item);
    });

    app.post('/items', (req, res) => {
        const { id, name, score } = req.body || {};

        if (!name || score === undefined) {
            return res.status(400).json({ error: 'invalid payload' });
        }

        if (id !== undefined) {
            const exists = items.some(current => current.id === Number(id));
            if (exists) {
                return res.status(409).json({ error: 'id already exists' });
            }
        }

        const newItem = {
            id: id !== undefined ? Number(id) : items.length + 1,
            name,
            score
        };

        items.push(newItem);
        return res.status(201).json(newItem);
    });

    return app;
}