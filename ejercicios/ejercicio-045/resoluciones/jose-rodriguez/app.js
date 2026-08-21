import express from 'express';

// Simulación de servicio de persistencia asincrónico
const itemService = {
    items: [
        { id: 1, name: 'alpha', score: 10 },
        { id: 2, name: 'beta', score: 20 }
    ],
    async findById(id) {
        return new Promise(resolve => {
            setTimeout(() => {
                const item = this.items.find(current => current.id === id);
                resolve(item || null);
            }, 10);
        });
    },
    async create(data) {
        return new Promise(resolve => {
            setTimeout(() => {
                const newItem = { id: this.items.length + 1, ...data };
                this.items.push(newItem);
                resolve(newItem);
            }, 10);
        });
    }
};

export function createApp() {
    const app = express();
    app.use(express.json());

    app.get('/health', (req, res) => {
        res.status(200).json({ ok: true });
    });

    app.get('/items/:id', async (req, res) => {
        try {
            const id = Number(req.params.id);
            const item = await itemService.findById(id);

            if (!item) {
                return res.status(404).json({ error: 'not found' });
            }

            return res.status(200).json(item);
        } catch (error) {
            return res.status(500).json({ error: 'internal server error' });
        }
    });

    app.post('/items', async (req, res) => {
        try {
            const { id, name, score } = req.body || {};

            if (!name || score === undefined) {
                return res.status(400).json({ error: 'invalid payload' });
            }

            if (id !== undefined) {
                const exists = await itemService.findById(Number(id));
                if (exists) {
                    return res.status(409).json({ error: 'id already exists' });
                }
            }

            const newItem = await itemService.create({
                ...(id !== undefined && { id: Number(id) }),
                name,
                score
            });

            return res.status(201).json(newItem);
        } catch (error) {
            return res.status(500).json({ error: 'internal server error' });
        }
    });

    return app;
}