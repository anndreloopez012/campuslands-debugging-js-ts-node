import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from './app.js';

describe('ejercicio 042 - Auth simple (Resolución Jose)', () => {
    it('responde health correctamente sin requerir autenticación', async () => {
        const app = createApp();
        const response = await request(app).get('/health').expect(200);
        expect(response.body).toEqual({ ok: true });
    });

    it('devuelve 401 si se intenta acceder a rutas protegidas sin token válido', async () => {
        const app = createApp();

        await request(app)
            .get('/items/1')
            .expect(401);

        await request(app)
            .get('/items/1')
            .set('Authorization', 'Bearer token-invalido')
            .expect(401);
    });

    it('permite consulta a usuarios autenticados pero restringe creación a rol admin (403)', async () => {
        const app = createApp();

        // Consulta con token de usuario estándar (200 OK)
        const found = await request(app)
            .get('/items/1')
            .set('Authorization', 'Bearer user-token')
            .expect(200);

        expect(found.body.name).toBe('alpha');

        // Intento de creación con token de usuario (403 Forbidden)
        await request(app)
            .post('/items')
            .set('Authorization', 'Bearer user-token')
            .send({ name: 'gamma', score: 30 })
            .expect(403);

        // Creación exitosa con token de administrador (201 Created)
        const created = await request(app)
            .post('/items')
            .set('Authorization', 'Bearer admin-token')
            .send({ name: 'gamma', score: 30 })
            .expect(201);

        expect(created.body).toMatchObject({ id: 3, name: 'gamma', score: 30 });
    });
});