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

        // Si el payload esta vacio o faltan campos obligatorios
        if (!name || score === undefined) {
            return res.status(400).json({ error: 'invalid payload' });
        }

        // Si los datos no cumplen con las reglas de negocio (ej. score negativo o tipo erroneo) -> 422
        if (typeof score !== 'number' || score < 0) {
            return res.status(422).json({ error: 'unprocessable entity' });
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