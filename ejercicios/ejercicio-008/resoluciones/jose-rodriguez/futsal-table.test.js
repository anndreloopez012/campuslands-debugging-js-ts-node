import { describe, expect, it } from 'vitest';
import { calcularDiferenciaGoles, calcularTablaFutsal } from './futsal-table.js';

describe('ejercicio 008 - Fútbol Sala (Tabla de posiciones y diferencia de goles)', () => {
    it('calcula la diferencia de goles correctamente', () => {
        expect(calcularDiferenciaGoles(12, 5)).toBe(7);
        expect(calcularDiferenciaGoles(4, 9)).toBe(-5);
    });

    it('ordena la tabla de posiciones por puntos y desempata por diferencia de goles', () => {
        const tabla = [
            { equipo: 'Barcelona Futsal', puntos: 9, gf: 15, gc: 5 },  // Dif: +10
            { equipo: 'Inter Movistar', puntos: 12, gf: 10, gc: 4 },  // Líder por puntos
            { equipo: 'ElPozo Murcia', puntos: 9, gf: 18, gc: 6 }     // Dif: +12 (Gana desempate)
        ];

        const resultado = calcularTablaFutsal(tabla);

        expect(resultado.map(e => e.equipo)).toEqual([
            'Inter Movistar',
            'ElPozo Murcia',
            'Barcelona Futsal'
        ]);
    });
});