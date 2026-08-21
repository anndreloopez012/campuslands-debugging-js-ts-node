import { describe, expect, it } from 'vitest';
import { determinarRiesgoMision, clasificarMisionesPorRiesgo, MisionEspacial } from './space-missions';

describe('ejercicio 024 - Ciencia ficción', () => {
    it('determina correctamente el nivel de riesgo según distancia y amenaza', () => {
        const misionCritica: MisionEspacial = {
            id: 'm1',
            nombre: 'Exploración Alfa',
            distanciaAnosLuz: 120,
            tripulada: true,
            factorAmenaza: 30
        };

        const misionBaja: MisionEspacial = {
            id: 'm2',
            nombre: 'Sonda Órbita Lunar',
            distanciaAnosLuz: 1,
            tripulada: false,
            factorAmenaza: 5
        };

        expect(determinarRiesgoMision(misionCritica)).toBe('Critico');
        expect(determinarRiesgoMision(misionBaja)).toBe('Bajo');
    });

    it('agrupa misiones correctamente por categoría de riesgo', () => {
        const misiones: MisionEspacial[] = [
            { id: '1', nombre: 'Apolo X', distanciaAnosLuz: 2, tripulada: true, factorAmenaza: 10 }, // Bajo
            { id: '2', nombre: 'Titan-9', distanciaAnosLuz: 60, tripulada: false, factorAmenaza: 40 } // Alto
        ];

        const resultado = clasificarMisionesPorRiesgo(misiones);
        expect(resultado.Bajo).toHaveLength(1);
        expect(resultado.Alto).toHaveLength(1);
        expect(resultado.Critico).toHaveLength(0);
    });
});