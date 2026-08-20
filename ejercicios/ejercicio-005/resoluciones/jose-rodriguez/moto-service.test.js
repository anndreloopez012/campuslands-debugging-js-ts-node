import { describe, expect, it } from 'vitest';
import { esKilometrajeValido, obtenerMantenimientosVencidos } from './moto-service.js';

describe('ejercicio 005 - Motos en taller', () => {
    it('valida correctamente si el kilometraje es un numero valido y mayor o igual a 0', () => {
        expect(esKilometrajeValido(15000)).toBe(true);
        expect(esKilometrajeValido('2000')).toBe(true);
        expect(esKilometrajeValido(0)).toBe(true);
        expect(esKilometrajeValido(-50)).toBe(false);
        expect(esKilometrajeValido('abc')).toBe(false);
        expect(esKilometrajeValido(null)).toBe(false);
    });

    it('obttiene la lista de motos con mantenimientos vencidos', () => {
        const taller = [
            { placa: 'MTO-001', kilometrajeActual: 12000, limiteMantenimiento: 10000 },
            { placa: 'MTO-002', kilometrajeActual: 4500, limiteMantenimiento: 5000 },
            { placa: 'MTO-003', kilometrajeActual: 10000, limiteMantenimiento: 10000 }
        ];

        const vencidas = obtenerMantenimientosVencidos(taller);
        expect(vencidas.map(m => m.placa)).toEqual(['MTO-001', 'MTO-003']);
    });
});