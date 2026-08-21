import { describe, expect, it } from 'vitest';
import {
    calcularPromedio,
    obtenerMejor,
    JugadorEsports
} from './esports-team';

describe('ejercicio 020 - Equipo de esports', () => {
    it('calcula el promedio dividiendo entre la cantidad de jugadores activos (excluyendo suplentes)', () => {
        const roster: JugadorEsports[] = [
            { nombre: 'Faker', puntos: 90, rol: 'IGL', esSuplente: false },
            { nombre: 'S1mple', puntos: 80, rol: 'AWPer', esSuplente: false },
            { nombre: 'Benched', puntos: 100, rol: 'Suplente', esSuplente: true }
        ];

        // Total de activos: 170 / 2 = 85
        expect(calcularPromedio(roster)).toBe(85);
    });

    it('obtiene el jugador con el mayor puntaje de la lista', () => {
        const roster: JugadorEsports[] = [
            { nombre: 'Dev1ce', puntos: 75, rol: 'AWPer' },
            { nombre: 'ZywOo', puntos: 95, rol: 'Entry' },
            { nombre: 'Niko', puntos: 88, rol: 'Lurker' }
        ];

        const mejor = obtenerMejor(roster);
        expect(mejor?.nombre).toBe('ZywOo');
        expect(mejor?.puntos).toBe(95);
    });
});