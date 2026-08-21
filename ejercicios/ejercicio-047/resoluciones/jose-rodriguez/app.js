import express from 'express';

// Capa Service: Lógica de negocio y manejo de datos
export class ItemService {
    constructor(initialItems = []) {
        this.items = [...initialItems];
    }

    getItemById(id) {
        const numericId = Number(id);
        return this.items.find(item => item.id === numericId) || null;
    }

    addItem(payload) {
        const { id, name, score } = payload || {};

        if (!name || score === undefined) {
            throw new Error('INVALID_PAYLOAD');
        }

        if (id !== undefined) {
            const exists = this.items.some(item => item.id === Number(id));
            if (exists) {
                throw new Error('ID_EXISTS');
            }
        }

        const newItem = {
            id: id !== undefined ? Number(id) : this.items.length + 1,
            name,
            score
        };

        this.items.push(newItem);
        return newItem;
    }
}

// Capa Controller: Adaptador de peticiones y respuestas HTTP
export class ItemController {
    constructor(itemService) {
        this.itemService = itemService;
    }

    getById = (req, res) => {
        const item = this.itemService.getItemById(req.params.id);
        if (!item) {
            return res.status(404).json({ error: 'not found' });
        }
        return res.status(200).json(item);
    };

    create = (req, res) => {
        try {
            const newItem = this.itemService.addItem(req.body);
            return res.status(201).json(newItem);
        } catch (error) {
            if (error.message === 'INVALID_PAYLOAD') {
                return res.status(400).json({ error: 'invalid payload' });
            }
            if (error.message === 'ID_EXISTS') {
                return res.status(409).json({ error: 'id already exists' });
            }
            return res.status(500).json({ error: 'internal server error' });
        }
    };
}

export function createApp() {
    const app = express();
    app.use(express.json());

    const initialItems = [
        { id: 1, name: 'alpha', score: 10 },
        { id: 2, name: 'beta', score: 20 }
    ];

    const itemService = new ItemService(initialItems);
    const itemController = new ItemController(itemService);

    app.get('/health', (req, res) => {
        res.status(200).json({ ok: true });
    });

    app.get('/items/:id', itemController.getById);
    app.post('/items', itemController.create);

    return app;
}