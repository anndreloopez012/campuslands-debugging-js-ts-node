import { describe, expect, it } from 'vitest';
import { evaluarMarcadorPingpong } from './pingpong.js';

describe('ejercicio 017 - Pingpong', () => {
    it('identifica al ganador cuando alcanza 11 puntos con diferencia de 2 o más', () => {
        const resultado = evaluarMarcadorPingpong(11, 8);
        expect(resultado.estado).toBe('Finalizado');
        expect(resultado.ganador).toBe('Jugador 1');
    });

    it('detecta estado de Deuce cuando el marcador está empatado a 10 o más', () => {
        const resultado = evaluarMarcadorPingpong(10, 10);
        expect(resultado.estado).toBe('Deuce');
        expect(resultado.ganador).toBeNull();
    });

    it('asigna Ventaja cuando superan los 10 puntos y hay diferencia de 1 punto', () => {
        const resultado = evaluarMarcadorPingpong(11, 10);
        expect(resultado.estado).toBe('Ventaja Jugador 1');
        expect(resultado.ganador).toBeNull();
    });

    it('continúa en juego en un marcador extendido de ventaja hasta lograr 2 puntos de diferencia', () => {
        const resultado = evaluarMarcadorPingpong(13, 11);
        expect(resultado.estado).toBe('Finalizado');
        expect(resultado.ganador).toBe('Jugador 1');
    });
});