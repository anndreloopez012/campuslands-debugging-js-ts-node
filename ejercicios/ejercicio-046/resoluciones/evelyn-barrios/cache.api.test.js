import { describe, expect, it } from 'vitest';
import request from 'supertest';
// NOTE: To validate the solution, this import must temporarily point to:
// import app from '../resoluciones/evelyn-barrios/app.js';
import app from './app.js';

describe('ejercicio 046: Cache en Memoria', () => {
  it('debe devolver una respuesta desde el origen en la primera llamada (CACHE MISS)', async () => {
    const response = await request(app)
      .get('/products')
      .expect(200)
      .expect('X-Cache-Status', 'MISS');

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('debe devolver una respuesta desde la caché en la segunda llamada (CACHE HIT)', async () => {
    // First call to populate the cache
    await request(app).get('/products');

    // Second call, which should be a cache hit
    const response = await request(app)
      .get('/products')
      .expect(200)
      .expect('X-Cache-Status', 'HIT');

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });
});