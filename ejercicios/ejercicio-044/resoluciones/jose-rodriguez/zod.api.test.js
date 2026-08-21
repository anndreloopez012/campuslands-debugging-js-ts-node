import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from './app.js';

describe('ejercicio 044 - Validacion de datos (Resolución Jose)', () => {
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

    it('valida el payload devolviendo 400 y detalles en caso de falla', async () => {
        const app = createApp();

        const errorResponse = await request(app)
            .post('/items')
            .send({ score: 'no-es-numero' })
            .expect(400);

        expect(errorResponse.body.error).toBe('invalid payload');
        expect(errorResponse.body.details).toBeDefined();

        const validResponse = await request(app)
            .post('/items')
            .send({ name: 'gamma', score: 30 })
            .expect(201);

        expect(validResponse.body).toMatchObject({ id: 3, name: 'gamma', score: 30 });
    });
});