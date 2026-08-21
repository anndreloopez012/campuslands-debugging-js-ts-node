import { describe, expect, it } from 'vitest';
import { calcularResultado, ordenarRanking } from '../codigo/moba-ranking.js';

describe('ejercicio 004', () => {
  it('calcula suma numerica y no concatena texto', () => {
    expect(calcularResultado([
      { nombre: 'ak47-master', puntos: 10 },
      { nombre: 'rpg-tank', puntos: 15 },
      { nombre: 'moto-racer', puntos: 5 }
    ])).toBe(30);
  });

  it('ordena ranking de mayor a menor puntaje', () => {
    const ranking = ordenarRanking([
      { nombre: 'novato', puntos: 7 },
      { nombre: 'pro', puntos: 22 },
      { nombre: 'elite', puntos: 18 }
    ]);
    expect(ranking.map((item) => item.nombre)).toEqual(['pro', 'elite', 'novato']);
  });
});
