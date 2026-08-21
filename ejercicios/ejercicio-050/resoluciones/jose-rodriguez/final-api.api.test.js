import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from './app.js';

describe('ejercicio 050 - Depuracion integral (Resolución Jose)', () => {
    it('responde health correctamente', async () => {
        const app = createApp();
        const response = await request(app).get('/health').expect(200);
        expect(response.body).toEqual({ ok: true });
    });

    it('permite consultar todos los items', async () => {
        const app = createApp();
        const response = await request(app).get('/items').expect(200);
        expect(response.body).toHaveLength(2);
    });

    it('obtiene un item por id numerico y responde 404 si no existe', async () => {
        const app = createApp();
        const found = await request(app).get('/items/1').expect(200);
        expect(found.body.name).toBe('alpha');

        await request(app).get('/items/999').expect(404);
    });

    it('ejecuta el ciclo completo CRUD (POST, PUT, DELETE)', async () => {
        const app = createApp();

        // Crear item
        const created = await request(app)
            .post('/items')
            .send({ name: 'gamma', score: 30 })
            .expect(201);

        expect(created.body).toMatchObject({ id: 3, name: 'gamma', score: 30 });

        // Actualizar item
        const updated = await request(app)
            .put('/items/3')
            .send({ name: 'gamma-updated', score: 35 })
            .expect(200);

        expect(updated.body.name).toBe('gamma-updated');

        // Eliminar item
        await request(app).delete('/items/3').expect(204);

        // Verificar eliminación
        await request(app).get('/items/3').expect(404);
    });
});