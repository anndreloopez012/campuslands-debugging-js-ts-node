import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from './app.js';

describe('ejercicio 041 - Middleware de request id (Resolución Jose)', () => {
    it('responde health correctamente', async () => {
        const app = createApp();
        const response = await request(app).get('/health').expect(200);
        expect(response.body).toEqual({ ok: true });
        expect(response.headers['x-request-id']).toBeDefined();
    });

    it('busca item por id numerico y devuelve 404 si no existe', async () => {
        const app = createApp();
        const found = await request(app).get('/items/1').expect(200);
        expect(found.body.name).toBe('alpha');

        const notFound = await request(app).get('/items/999').expect(404);
        expect(notFound.body.requestId).toBeDefined();
    });

    it('propaga x-request-id en headers y en la respuesta de error', async () => {
        const app = createApp();
        const customId = 'custom-request-id-123';

        const response = await request(app)
            .get('/items/999')
            .set('x-request-id', customId)
            .expect(404);

        expect(response.headers['x-request-id']).toBe(customId);
        expect(response.body).toEqual({
            error: 'not found',
            requestId: customId
        });
    });
});