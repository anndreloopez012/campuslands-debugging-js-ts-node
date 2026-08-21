import { describe, expect, it } from 'vitest';
import { calcularPromedio, obtenerMejor } from './tourism';

describe('ejercicio 034 - Turismo', () => {
    it('calcula promedio solo con registros activos', () => {
        const registros = [
            { nombre: 'alpha', puntos: 90, activo: true },
            { nombre: 'beta', puntos: 30, activo: false },
            { nombre: 'gamma', puntos: 70, activo: true }
        ];

        expect(calcularPromedio(registros)).toBe(80);
    });

    it('obtiene el registro con mayor puntaje', () => {
        const registros = [
            { nombre: 'render-1', puntos: 40 },
            { nombre: 'render-2', puntos: 95 },
            { nombre: 'render-3', puntos: 80 }
        ];

        const mejor = obtenerMejor(registros);
        expect(mejor?.nombre).toBe('render-2');
    });
});