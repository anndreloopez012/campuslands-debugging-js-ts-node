import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from './app.js';

describe('ejercicio 049 - Concurrencia simulada (Resolución Jose)', () => {
    it('responde health correctamente', async () => {
        const app = createApp();
        const response = await request(app).get('/health').expect(200);
        expect(response.body).toEqual({ ok: true });
    });

    it('obtiene item por id numerico y responde 404 si no existe', async () => {
        const app = createApp();
        const found = await request(app).get('/items/1').expect(200);
        expect(found.body.name).toBe('alpha');

        await request(app).get('/items/999').expect(404);
    });

    it('evita la condicion de carrera al reservar cupos en paralelo', async () => {
        const app = createApp();

        // Intentar 2 reservas simultáneas sobre un recurso con solo 1 cupo disponible
        const [res1, res2] = await Promise.all([
            request(app).post('/items/1/reserve'),
            request(app).post('/items/1/reserve')
        ]);

        const statuses = [res1.status, res2.status].sort();

        // Una petición debe tener éxito (200) y la otra debe rebotar por falta de cupos (409)
        expect(statuses).toEqual([200, 409]);
    });
});