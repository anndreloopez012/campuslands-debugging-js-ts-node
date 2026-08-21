import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from './app.js';

describe('ejercicio 048 - Cache simple (Resolución Jose)', () => {
    it('responde health correctamente', async () => {
        const app = createApp();
        const response = await request(app).get('/health').expect(200);
        expect(response.body).toEqual({ ok: true });
    });

    it('guarda en cache y devuelve 404 si el item no existe', async () => {
        const app = createApp();
        const found = await request(app).get('/items/1').expect(200);
        expect(found.body.name).toBe('alpha');

        await request(app).get('/items/999').expect(404);
    });

    it('invalida el cache correctamente al realizar mutaciones (POST/PUT)', async () => {
        const app = createApp();

        // 1. Lectura inicial (se guarda en caché)
        const initialGet = await request(app).get('/items/1').expect(200);
        expect(initialGet.body.name).toBe('alpha');

        // 2. Mutación mediante PUT
        await request(app)
            .put('/items/1')
            .send({ name: 'alpha-updated', score: 15 })
            .expect(200);

        // 3. Lectura posterior para comprobar que el caché fue invalidado y retorna el dato actualizado
        const updatedGet = await request(app).get('/items/1').expect(200);
        expect(updatedGet.body.name).toBe('alpha-updated');
    });
});