import { describe, expect, it } from 'vitest';
import { calcularDiferenciaGoles, ordenarTablaFutsal } from './futsal-table.js';

describe('ejercicio 008 - Futbol sala', () => {
    it('calcula la diferencia de goles restando goles en contra a goles a favor', () => {
        expect(calcularDiferenciaGoles(12, 5)).toBe(7);
        expect(calcularDiferenciaGoles(3, 8)).toBe(-5);
        expect(calcularDiferenciaGoles(4, 4)).toBe(0);
    });

    it('ordena la tabla priorizando puntos y desempata por diferencia de goles', () => {
        const tabla = [
            { equipo: 'Rayo FC', puntos: 9, gf: 15, gc: 10 },  // Dif: +5
            { equipo: 'Titan FC', puntos: 12, gf: 18, gc: 8 },  // Puntos: 12 (1º)
            { equipo: 'Halcones FC', puntos: 9, gf: 20, gc: 11 } // Dif: +9 (2º desempate)
        ];

        const resultado = ordenarTablaFutsal(tabla);
        expect(resultado.map(e => e.equipo)).toEqual(['Titan FC', 'Halcones FC', 'Rayo FC']);
    });
});