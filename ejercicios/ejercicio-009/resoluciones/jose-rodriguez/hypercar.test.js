import { describe, expect, it } from 'vitest';
import { convertirMphAKmh, ordenarPorVelocidad } from './hypercar.js';

describe('ejercicio 009 - Autos Hiperdeportivos (Conversión de velocidad y ranking)', () => {
    it('convierte mph a km/h con precisión de dos decimales', () => {
        expect(convertirMphAKmh(300)).toBe(482.80);
        expect(convertirMphAKmh(250)).toBe(402.34);
        expect(convertirMphAKmh(0)).toBe(0);
    });

    it('ordena hiperdeportivos descendentemente por velocidad máxima', () => {
        const garaje = [
            { modelo: 'Bugatti Chiron', velocidadMph: 261 },
            { modelo: 'Koenigsegg Jesko Absolut', velocidadMph: 330 },
            { modelo: 'Hennessey Venom F5', velocidadMph: 311 }
        ];

        const ranking = ordenarPorVelocidad(garaje);

        expect(ranking.map(a => a.modelo)).toEqual([
            'Koenigsegg Jesko Absolut',
            'Hennessey Venom F5',
            'Bugatti Chiron'
        ]);
        expect(garaje[0].modelo).toBe('Bugatti Chiron'); // Inmutabilidad
    });
});