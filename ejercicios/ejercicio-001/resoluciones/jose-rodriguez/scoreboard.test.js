import { describe, expect, it } from 'vitest';
import { calcularResultado, ordenarRanking } from './scoreboard.js';

describe('ejercicio 001 - Ranking gamer con parseo numérico', () => {
    it('convierte los puntos recibidos como string a número y realiza la suma correctamente', () => {
        const partidas = [
            { puntos: '150' },
            { puntos: 200 },
            { puntos: '50' }
        ];

        const total = calcularResultado(partidas);
        expect(total).toBe(400);
    });

    it('ordena la lista de jugadores de manera descendente según sus puntos', () => {
        const jugadores = [
            { nombre: 'GamerA', puntos: '100' },
            { nombre: 'GamerB', puntos: 500 },
            { nombre: 'GamerC', puntos: '250' }
        ];

        const ranking = ordenarRanking(jugadores);

        expect(ranking.map(j => j.nombre)).toEqual(['GamerB', 'GamerC', 'GamerA']);
    });
});
