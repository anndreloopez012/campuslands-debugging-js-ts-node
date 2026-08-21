import express from 'express';

// Clase personalizada para errores con código HTTP
export class AppError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
    }
}

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

    app.get('/items/:id', (req, res, next) => {
        try {
            const id = Number(req.params.id);
            const item = items.find(current => current.id === id);

            if (!item) {
                throw new AppError('not found', 404);
            }

            return res.status(200).json(item);
        } catch (error) {
            next(error);
        }
    });

    app.post('/items', (req, res, next) => {
        try {
            const { id, name, score } = req.body || {};

            if (!name || score === undefined) {
                throw new AppError('invalid payload', 400);
            }

            if (id !== undefined) {
                const exists = items.some(current => current.id === Number(id));
                if (exists) {
                    throw new AppError('id already exists', 409);
                }
            }

            const newItem = {
                id: id !== undefined ? Number(id) : items.length + 1,
                name,
                score
            };

            items.push(newItem);
            return res.status(201).json(newItem);
        } catch (error) {
            next(error);
        }
    });

    // Ruta para forzar un error interno no controlado
    app.get('/error-test', (req, res, next) => {
        next(new Error('Internal database error failure'));
    });

    // Middleware centralizado de manejo de errores (debe tener 4 parámetros)
    app.use((err, req, res, next) => {
        const statusCode = err.statusCode || 500;
        const message = err.message || 'internal server error';

        return res.status(statusCode).json({
            error: message
        });
    });

    return app;
}