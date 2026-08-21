import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from './app.js';

describe('ejercicio 040 - API de pedidos (Resolución Jose)', () => {
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

    it('separa adecuadamente las respuestas de error 404 y 422', async () => {
        const app = createApp();

        // 404 Not Found al buscar ID inexistente
        await request(app)
            .get('/items/999')
            .expect(404);

        // 422 Unprocessable Entity al enviar datos semánticamente inválidos
        await request(app)
            .post('/items')
            .send({ name: 'order-fail', score: -5 })
            .expect(422);

        // 201 Created al enviar un pedido válido
        const response = await request(app)
            .post('/items')
            .send({ name: 'gamma', score: 30 })
            .expect(201);

        expect(response.body).toMatchObject({ id: 3, name: 'gamma', score: 30 });
    });
});