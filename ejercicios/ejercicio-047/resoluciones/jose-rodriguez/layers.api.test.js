import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from './app.js';

describe('ejercicio 047 - Capas controller/service (Resolución Jose)', () => {
    it('responde health correctamente', async () => {
        const app = createApp();
        const response = await request(app).get('/health').expect(200);
        expect(response.body).toEqual({ ok: true });
    });

    it('obtiene item por id a través de controller/service y devuelve 404 si no existe', async () => {
        const app = createApp();
        const found = await request(app).get('/items/1').expect(200);
        expect(found.body.name).toBe('alpha');

        const notFound = await request(app).get('/items/999').expect(404);
        expect(notFound.body).toEqual({ error: 'not found' });
    });

    it('procesa creación de item respetando contratos de capas y retorna 201 Created', async () => {
        const app = createApp();

        const response = await request(app)
            .post('/items')
            .send({ name: 'gamma', score: 30 })
            .expect(201);

        expect(response.body).toEqual({ id: 3, name: 'gamma', score: 30 });
    });
});