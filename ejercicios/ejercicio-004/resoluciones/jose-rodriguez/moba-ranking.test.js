import { describe, expect, it } from 'vitest';
import { ordenarRankingMoba, calcularKda } from './moba-ranking.js';

describe('ejercicio 004 - Torneo MOBA', () => {
    it('ordena el ranking de equipos priorizando victorias', () => {
        const tabla = [
            { equipo: 'Alpha', victorias: 3, kills: 10, deaths: 5 },
            { equipo: 'Omega', victorias: 5, kills: 12, deaths: 2 },
            { equipo: 'Delta', victorias: 1, kills: 20, deaths: 4 }
        ];

        const ranking = ordenarRankingMoba(tabla);
        expect(ranking.map(e => e.equipo)).toEqual(['Omega', 'Alpha', 'Delta']);
    });

    it('desempata equipos por diferencia de kills/deaths cuando igualan en victorias', () => {
        const tablaEmpatada = [
            { equipo: 'Team A', victorias: 4, kills: 15, deaths: 10 }, // Dif: +5
            { equipo: 'Team B', victorias: 4, kills: 20, deaths: 5 }   // Dif: +15
        ];

        const ranking = ordenarRankingMoba(tablaEmpatada);
        expect(ranking[0].equipo).toBe('Team B');
    });

    it('calcula el KDA correctamente redondeando a 2 decimales', () => {
        expect(calcularKda(10, 2, 5)).toBe(7.5);
        expect(calcularKda(5, 0, 3)).toBe(8);
    });
});