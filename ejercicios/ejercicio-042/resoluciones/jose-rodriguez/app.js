import express from 'express';

export function createApp() {
    const app = express();
    app.use(express.json());

    // Mapeo simulación de tokens a roles
    const validTokens = {
        'user-token': 'user',
        'admin-token': 'admin'
    };

    // Middleware de Autenticación
    const authenticate = (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'unauthorized' });
        }

        const token = authHeader.split(' ')[1];
        const role = validTokens[token];

        if (!role) {
            return res.status(401).json({ error: 'unauthorized' });
        }

        req.user = { token, role };
        next();
    };

    // Middleware de Autorización por Roles
    const authorize = (allowedRoles = []) => {
        return (req, res, next) => {
            if (!req.user || !allowedRoles.includes(req.user.role)) {
                return res.status(403).json({ error: 'forbidden' });
            }
            next();
        };
    };

    const items = [
        { id: 1, name: 'alpha', score: 10 },
        { id: 2, name: 'beta', score: 20 }
    ];

    app.get('/health', (req, res) => {
        res.status(200).json({ ok: true });
    });

    app.get('/items/:id', authenticate, (req, res) => {
        const id = Number(req.params.id);
        const item = items.find(current => current.id === id);
        if (!item) return res.status(404).json({ error: 'not found' });
        return res.status(200).json(item);
    });

    app.post('/items', authenticate, authorize(['admin']), (req, res) => {
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