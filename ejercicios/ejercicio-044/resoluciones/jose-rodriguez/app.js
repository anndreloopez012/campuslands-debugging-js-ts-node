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
        const id = Number(req.params.id);
        const item = items.find(current => current.id === id);
        if (!item) return res.status(404).json({ error: 'not found' });
        return res.status(200).json(item);
    });

    app.post('/items', (req, res) => {
        const { id, name, score } = req.body || {};

        const errors = [];

        if (!name || typeof name !== 'string' || name.trim() === '') {
            errors.push('name is required and must be a string');
        }

        if (score === undefined || typeof score !== 'number') {
            errors.push('score is required and must be a number');
        }

        if (errors.length > 0) {
            return res.status(400).json({
                error: 'invalid payload',
                details: errors
            });
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