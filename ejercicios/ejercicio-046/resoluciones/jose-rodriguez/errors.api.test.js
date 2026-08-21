import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from './app.js';

describe('ejercicio 046 - Manejo centralizado de errores (Resolución Jose)', () => {
    it('responde health correctamente', async () => {
        const app = createApp();
        const response = await request(app).get('/health').expect(200);
        expect(response.body).toEqual({ ok: true });
    });

    it('busca item por id numerico y delega error 404 al middleware centralizado', async () => {
        const app = createApp();
        const found = await request(app).get('/items/1').expect(200);
        expect(found.body.name).toBe('alpha');

        const notFound = await request(app).get('/items/999').expect(404);
        expect(notFound.body).toEqual({ error: 'not found' });
    });

    it('captura errores internos (500) y no expone el stack trace en el body', async () => {
        const app = createApp();

        const response = await request(app)
            .get('/error-test')
            .expect(500);

        expect(response.body.error).toBeDefined();
        expect(response.body.stack).toBeUndefined();
    });
});