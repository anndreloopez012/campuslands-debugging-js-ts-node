import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { createApp } from '../codigo/app.js';

describe('ejercicio 047', () => {
  it('responde health correctamente', async () => {
    const app = createApp();
    await request(app).get('/health').expect(200).expect({ ok: true });
  });

  it('busca item por id numerico y devuelve 404 si no existe', async () => {
    const app = createApp();
    const found = await request(app).get('/items/1').expect(200);
    expect(found.body.name).toBe('alpha');
    await request(app).get('/items/999').expect(404);
  });

  it('crea item con status 201', async () => {
    const app = createApp();
    const response = await request(app).post('/items').send({ name: 'gamma', score: 30 }).expect(201);
    expect(response.body).toMatchObject({ id: 3, name: 'gamma', score: 30 });
  });
});
