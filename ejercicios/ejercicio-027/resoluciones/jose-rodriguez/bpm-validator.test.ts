import { describe, expect, it } from 'vitest';
import {
    validarBPM,
    obtenerPistasFueraDeRango,
    PistaMusical
} from './bpm-validator';

describe('ejercicio 027 - Música', () => {
    it('valida si una pista de House está dentro de su rango de BPM (120 - 130)', () => {
        const pistaValida: PistaMusical = { titulo: 'Deep Groove', genero: 'House', bpm: 124 };
        const pistaInvalida: PistaMusical = { titulo: 'Ultra Fast', genero: 'House', bpm: 150 };

        expect(validarBPM(pistaValida).esValido).toBe(true);
        expect(validarBPM(pistaInvalida).esValido).toBe(false);
    });

    it('obtiene únicamente los resultados de las pistas que tienen el BPM fuera del rango', () => {
        const playlist: PistaMusical[] = [
            { titulo: 'Gasolina', genero: 'Reggaeton', bpm: 95 }, // Válido (80-100)
            { titulo: 'Slow Reggaeton', genero: 'Reggaeton', bpm: 60 }, // Inválido
            { titulo: 'Techno Beat', genero: 'Techno', bpm: 130 } // Válido (125-150)
        ];

        const fueraDeRango = obtenerPistasFueraDeRango(playlist);

        expect(fueraDeRango).toHaveLength(1);
        expect(fueraDeRango[0].pista.titulo).toBe('Slow Reggaeton');
        expect(fueraDeRango[0].esValido).toBe(false);
    });
});