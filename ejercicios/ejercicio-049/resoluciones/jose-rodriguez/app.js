import express from 'express';

export function createApp() {
    const app = express();
    app.use(express.json());

    const items = [
        { id: 1, name: 'alpha', score: 10, slots: 1 },
        { id: 2, name: 'beta', score: 20, slots: 5 }
    ];

    // Control de concurrencia mediante cola de promesas por recurso
    let processingQueue = Promise.resolve();

    const runSequentially = (task) => {
        const result = processingQueue.then(() => task());
        processingQueue = result.catch(() => { });
        return result;
    };

    app.get('/health', (req, res) => {
        res.status(200).json({ ok: true });
    });

    app.get('/items/:id', (req, res) => {
        const id = Number(req.params.id);
        const item = items.find(current => current.id === id);

        if (!item) {
            return res.status(404).json({ error: 'not found' });
        }

        return res.status(200).json(item);
    });

    app.post('/items', (req, res) => {
        const { id, name, score, slots } = req.body || {};

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
            score,
            slots: slots !== undefined ? Number(slots) : 5
        };

        items.push(newItem);
        return res.status(201).json(newItem);
    });

    // Endpoint de reserva con control de concurrencia
    app.post('/items/:id/reserve', (req, res) => {
        runSequentially(async () => {
            const id = Number(req.params.id);
            const item = items.find(current => current.id === id);

            if (!item) {
                return res.status(404).json({ error: 'not found' });
            }

            if (item.slots <= 0) {
                return res.status(409).json({ error: 'no slots available' });
            }

            // Simular delay de I/O para exponer condiciones de carrera
            await new Promise(resolve => setTimeout(resolve, 10));

            item.slots -= 1;
            return res.status(200).json({ success: true, remainingSlots: item.slots });
        }).then(result => {
            if (!res.headersSent) {
                // Enviar respuesta obtenida de la ejecución secuencial
            }
        });
    });

    return app;
}