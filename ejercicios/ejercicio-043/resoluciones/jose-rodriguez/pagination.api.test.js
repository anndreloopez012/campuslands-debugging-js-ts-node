import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from './app.js';

describe('ejercicio 043 - Paginación (Resolución Jose)', () => {
    it('responde health correctamente', async () => {
        const app = createApp();
        const response = await request(app).get('/health').expect(200);
        expect(response.body).toEqual({ ok: true });
    });

    it('busca item por id numerico y devuelve 404 si no existe', async () => {
        const app = createApp();
        const found = await request(app).get('/items/1').expect(200);
        expect(found.body.name).toBe('alpha');
        await request(app).get('/items/999').expect(404);
    });

    it('retorna la coleccion paginada con metadatos limit, offset y total', async () => {
        const app = createApp();

        const response = await request(app)
            .get('/items?limit=2&offset=1')
            .expect(200);

        expect(response.body).toEqual({
            data: [
                { id: 2, name: 'beta', score: 20 },
                { id: 3, name: 'gamma', score: 30 }
            ],
            total: 4,
            limit: 2,
            offset: 1
        });
    });
});