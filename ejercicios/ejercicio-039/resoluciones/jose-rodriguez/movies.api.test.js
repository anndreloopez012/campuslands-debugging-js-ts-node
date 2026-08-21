import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from './app.js';

describe('ejercicio 039 - API de peliculas (Resolucion Jose)', () => {
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

    it('filtra items con query params de forma segura', async () => {
        const app = createApp();

        const responseMinScore = await request(app)
            .get('/items?minScore=15')
            .expect(200);

        expect(responseMinScore.body).toHaveLength(1);
        expect(responseMinScore.body[0].name).toBe('beta');

        const responseName = await request(app)
            .get('/items?name=alp')
            .expect(200);

        expect(responseName.body).toHaveLength(1);
        expect(responseName.body[0].name).toBe('alpha');
    });
});