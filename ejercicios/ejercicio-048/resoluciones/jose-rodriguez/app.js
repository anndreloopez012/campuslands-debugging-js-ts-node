import express from 'express';

export function createApp() {
    const app = express();
    app.use(express.json());

    const items = [
        { id: 1, name: 'alpha', score: 10 },
        { id: 2, name: 'beta', score: 20 }
    ];

    // Map para el almacenamiento del caché en memoria
    const cache = new Map();

    app.get('/health', (req, res) => {
        res.status(200).json({ ok: true });
    });

    app.get('/items/:id', (req, res) => {
        const id = Number(req.params.id);

        // Retornar de caché si existe
        if (cache.has(id)) {
            return res.status(200).json(cache.get(id));
        }

        const item = items.find(current => current.id === id);

        if (!item) {
            return res.status(404).json({ error: 'not found' });
        }

        // Almacenar en caché y retornar
        cache.set(id, item);
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

        // Invalidar todo el caché tras crear un nuevo elemento
        cache.clear();

        return res.status(201).json(newItem);
    });

    app.put('/items/:id', (req, res) => {
        const id = Number(req.params.id);
        const { name, score } = req.body || {};

        const itemIndex = items.findIndex(current => current.id === id);

        if (itemIndex === -1) {
            return res.status(404).json({ error: 'not found' });
        }

        if (!name || score === undefined) {
            return res.status(400).json({ error: 'invalid payload' });
        }

        const updatedItem = { id, name, score };
        items[itemIndex] = updatedItem;

        // Invalidar la clave específica del caché tras actualizar
        cache.delete(id);

        return res.status(200).json(updatedItem);
    });

    return app;
}