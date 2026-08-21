import express from 'express';
import { randomUUID } from 'node:crypto';

export function createApp() {
    const app = express();
    app.use(express.json());

    // Middleware para asignar y propagar x-request-id
    app.use((req, res, next) => {
        const requestId = req.headers['x-request-id'] || randomUUID();
        req.requestId = requestId;
        res.setHeader('x-request-id', requestId);
        next();
    });

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

        if (!item) {
            return res.status(404).json({
                error: 'not found',
                requestId: req.requestId
            });
        }

        return res.status(200).json(item);
    });

    app.post('/items', (req, res) => {
        const { id, name, score } = req.body || {};

        if (!name || score === undefined) {
            return res.status(400).json({
                error: 'invalid payload',
                requestId: req.requestId
            });
        }

        if (id !== undefined) {
            const exists = items.some(current => current.id === Number(id));
            if (exists) {
                return res.status(409).json({
                    error: 'id already exists',
                    requestId: req.requestId
                });
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