import { describe, expect, it } from 'vitest';
import { kmhAMph, mphAKmh, ordenarPorVelocidad } from './hypercar.js';

describe('ejercicio 009 - Autos hiperdeportivos', () => {
    it('convierte velocidad de km/h a mph y de mph a km/h redondeando a 2 decimales', () => {
        expect(kmhAMph(400)).toBe(248.55);
        expect(mphAKmh(250)).toBe(402.34);
        expect(kmhAMph(0)).toBe(0);
    });

    it('ordena hiperdeportivos descendentemente segun su velocidad maxima en km/h', () => {
        const garaje = [
            { modelo: 'Bugatti Chiron', velocidadKmh: 420 },
            { modelo: 'Koenigsegg Jesko', velocidadKmh: 480 },
            { modelo: 'Pagani Huayra', velocidadKmh: 383 }
        ];

        const resultado = ordenarPorVelocidad(garaje);
        expect(resultado.map(a => a.modelo)).toEqual([
            'Koenigsegg Jesko',
            'Bugatti Chiron',
            'Pagani Huayra'
        ]);
    });
});