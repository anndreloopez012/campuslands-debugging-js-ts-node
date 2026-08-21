import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from './app.js';

describe('ejercicio 036 - API de motos', () => {
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

    it('crea item con status 201 y valida campos requeridos con 400', async () => {
        const app = createApp();

        // Test payload incompleto -> 400 Bad Request
        await request(app)
            .post('/items')
            .send({ name: 'motos-test' })
            .expect(400);

        // Test payload completo -> 201 Created
        const response = await request(app)
            .post('/items')
            .send({ name: 'gamma', score: 30 })
            .expect(201);

        expect(response.body).toMatchObject({ id: 3, name: 'gamma', score: 30 });
    });
});