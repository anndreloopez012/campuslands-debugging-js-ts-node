import { describe, expect, it } from 'vitest';
import { calcularPuntajeTotal, determinarGanadorKickboxing } from './kickboxing.js';

describe('ejercicio 012 - Kickboxing', () => {
    it('suma correctamente las puntuaciones de las tarjetas de los jueces', () => {
        expect(calcularPuntajeTotal([29, 30, 28])).toBe(87);
        expect(calcularPuntajeTotal([10, 10, 9])).toBe(29);
        expect(calcularPuntajeTotal([])).toBe(0);
    });

    it('declara al peleador con mayor puntuación acumulada como ganador por decisión', () => {
        const combate = {
            peleadorRojo: { nombre: 'Alex Pereira', tarjetas: [30, 29, 30] }, 
            peleadorAzul: { nombre: 'Israel Adesanya', tarjetas: [28, 29, 28] } 
        };

        const resultado = determinarGanadorKickboxing(combate);
        expect(resultado.ganador).toBe('Alex Pereira');
        expect(resultado.empate).toBe(false);
        expect(resultado.puntajeRojo).toBe(89);
        expect(resultado.puntajeAzul).toBe(85);
    });

    it('detecta un empate en tarjetas cuando ambos peleadores suman la misma puntuación', () => {
        const combate = {
            peleadorRojo: { nombre: 'Peleador A', tarjetas: [29, 29, 29] },
            peleadorAzul: { nombre: 'Peleador B', tarjetas: [29, 29, 29] }
        };

        const resultado = determinarGanadorKickboxing(combate);
        expect(resultado.empate).toBe(true);
        expect(resultado.ganador).toBe('Empate');
    });
});