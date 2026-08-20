import { describe, expect, it } from 'vitest';
import { ordenarRanking, calcularKda } from './moba-ranking.js';

describe('ejercicio 004 - Torneo MOBA', () => {
    it('ordena el ranking de equipos priorizando victorias', () => {
        const tabla = [
            { equipo: 'Alpha', victorias: 5, kills: 50, deaths: 30 },
            { equipo: 'Omega', victorias: 8, kills: 70, deaths: 40 },
            { equipo: 'Delta', victorias: 3, kills: 40, deaths: 50 }
        ];

        const ranking = ordenarRanking(tabla);
        expect(ranking.map(e => e.equipo)).toEqual(['Omega', 'Alpha', 'Delta']);
    });

    it('desempata equipos por diferencia de kills/deaths cuando igualan en victorias', () => {
        const tablaEmpatada = [
            { equipo: 'Team A', victorias: 6, kills: 80, deaths: 50 }, // Dif: +30
            { equipo: 'Team B', victorias: 6, kills: 95, deaths: 40 }  // Dif: +55 (Gana desempate)
        ];

        const ranking = ordenarRanking(tablaEmpatada);
        expect(ranking[0].equipo).toBe('Team B');
    });

    it('calcula el KDA correctamente redondeando a 2 decimales', () => {
        expect(calcularKda(10, 2, 5)).toBe(7.5);
        expect(calcularKda(5, 0, 3)).toBe(8);
    });
});