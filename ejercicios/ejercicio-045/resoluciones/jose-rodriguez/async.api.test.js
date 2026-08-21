import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from './app.js';

describe('ejercicio 045 - Servicios asincronicos (Resolución Jose)', () => {
    it('responde health correctamente', async () => {
        const app = createApp();
        const response = await request(app).get('/health').expect(200);
        expect(response.body).toEqual({ ok: true });
    });

    it('espera la promesa para buscar item por id numerico y devuelve 404 si no existe', async () => {
        const app = createApp();
        const found = await request(app).get('/items/1').expect(200);
        expect(found.body.name).toBe('alpha');
        await request(app).get('/items/999').expect(404);
    });

    it('crea un nuevo item de forma asincronica y retorna 201 Created', async () => {
        const app = createApp();

        const created = await request(app)
            .post('/items')
            .send({ name: 'gamma', score: 30 })
            .expect(201);

        expect(created.body).toMatchObject({ id: 3, name: 'gamma', score: 30 });
    });
});