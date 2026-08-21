import { describe, expect, it } from 'vitest';
import { agruparGastosPorCiudad } from './travel-costs.js';

describe('ejercicio 013 - Viajes', () => {
    it('agrupa y acumula los gastos por ciudad sin sobrescribir montos previos', () => {
        const listaGastos = [
            { ciudad: 'Tokyo', monto: 120 },
            { ciudad: 'Kyoto', monto: 80 },
            { ciudad: 'Tokyo', monto: 50 },
            { ciudad: 'Osaka', monto: 200 },
            { ciudad: 'Kyoto', monto: 30 }
        ];

        const resultado = agruparGastosPorCiudad(listaGastos);

        expect(resultado).toEqual({
            Tokyo: 170,
            Kyoto: 110,
            Osaka: 200
        });
    });

    it('retorna un objeto vacío cuando recibe un arreglo sin gastos', () => {
        expect(agruparGastosPorCiudad([])).toEqual({});
    });
});