import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from './app.js';

describe('ejercicio 037 - API de torneos', () => {
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

    it('evita ID duplicado y retorna 409 Conflict', async () => {
        const app = createApp();

        // Intentar crear con ID duplicado -> 409
        await request(app)
            .post('/items')
            .send({ id: 1, name: 'duplicado', score: 50 })
            .expect(409);

        // Crear ítem válido -> 201
        const response = await request(app)
            .post('/items')
            .send({ name: 'gamma', score: 30 })
            .expect(201);

        expect(response.body).toMatchObject({ id: 3, name: 'gamma', score: 30 });
    });
});