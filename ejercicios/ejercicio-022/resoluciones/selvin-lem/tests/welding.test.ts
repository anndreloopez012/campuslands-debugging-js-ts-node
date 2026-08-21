import { describe, expect, it } from 'vitest';
import { calcularPromedio, obtenerMejor } from '../codigo/welding.ts';

describe('ejercicio 022', () => {
  it('calcula promedio solo con registros activos', () => {
    expect(calcularPromedio([
      { nombre: 'alpha', puntos: 90, activo: true },
      { nombre: 'beta', puntos: 30, activo: false },
      { nombre: 'gamma', puntos: 70, activo: true }
    ])).toBe(80);
  });

  it('obtiene el registro con mayor puntaje', () => {
    const mejor = obtenerMejor([
      { nombre: 'render-1', puntos: 40 },
      { nombre: 'render-2', puntos: 96 },
      { nombre: 'render-3', puntos: 80 }
    ]);
    expect(mejor?.nombre).toBe('render-2');
  });
});
