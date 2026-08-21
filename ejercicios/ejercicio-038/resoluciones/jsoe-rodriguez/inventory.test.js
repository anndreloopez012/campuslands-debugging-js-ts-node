import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from './app.js';

describe('ejercicio 038 - API de inventario gamer (Resolución Jose)', () => {
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

  it('actualiza parcialmente mediante PATCH sin borrar campos existentes', async () => {
    const app = createApp();

    const response = await request(app)
      .patch('/items/1')
      .send({ score: 99 })
      .expect(200);

    expect(response.body).toEqual({ id: 1, name: 'alpha', score: 99 });

    await request(app)
      .patch('/items/999')
      .send({ score: 50 })
      .expect(404);
  });
});