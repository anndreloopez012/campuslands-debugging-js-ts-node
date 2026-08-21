import { describe, expect, it } from 'vitest';
import { calcularTiempoVueltaConPenalizacion, calcularTiempoTotalCarrera } from './racing-laps.js';

describe('ejercicio 016 - Carreras', () => {
    it('aplica correctamente la penalizacion en segundos a una vuelta', () => {
        expect(calcularTiempoVueltaConPenalizacion(80, 5)).toBe(85);
        expect(calcularTiempoVueltaConPenalizacion(75, 0)).toBe(75);
    });

    it('calcula el tiempo total de la carrera sumando vueltas y penalizaciones', () => {
        const vueltasPiloto = [
            { tiempoVuelta: 78, penalizacion: 0 },
            { tiempoVuelta: 82, penalizacion: 5 }, // 87 segundos
            { tiempoVuelta: 80, penalizacion: 2 }  // 82 segundos
        ];

        const tiempoTotal = calcularTiempoTotalCarrera(vueltasPiloto);
        expect(tiempoTotal).toBe(247); // 78 + 87 + 82
    });
});