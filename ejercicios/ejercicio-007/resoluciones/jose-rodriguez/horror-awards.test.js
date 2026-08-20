import { describe, expect, it } from 'vitest';
import { obtenerGanadorHorror } from './horror-awards.js';

describe('ejercicio 007 - Peliculas de miedo', () => {
    it('determina un ganador unico cuando una pelicula supera en votos a las demas', () => {
        const votaciones = [
            { titulo: 'El Exorcista', votos: 150 },
            { titulo: 'Hereditary', votos: 220 },
            { titulo: 'Scream', votos: 90 }
        ];

        const resultado = obtenerGanadorHorror(votaciones);
        expect(resultado.ganadores).toEqual(['Hereditary']);
        expect(resultado.esEmpate).toBe(false);
    });

    it('detecta un empate y retorna todas las peliculas con el puntaje mas maximo', () => {
        const votacionesEmpatadas = [
            { titulo: 'El Resplandor', votos: 180 },
            { titulo: 'Alien', votos: 180 },
            { titulo: 'Psycho', votos: 100 }
        ];

        const resultado = obtenerGanadorHorror(votacionesEmpatadas);
        expect(resultado.ganadores).toEqual(['El Resplandor', 'Alien']);
        expect(resultado.esEmpate).toBe(true);
    });
});