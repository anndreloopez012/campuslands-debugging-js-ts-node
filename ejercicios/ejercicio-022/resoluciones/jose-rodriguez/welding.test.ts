import { describe, expect, it } from 'vitest';
import { calcularConsumoCordon, calcularConsumoTotalSoldadura, CordonSoldadura } from './welding';

describe('ejercicio 022 - Soldadura', () => {
    it('calcula el consumo de varilla de un cordón aplicando el factor de desperdicio', () => {
        const cordon: CordonSoldadura = {
            longitudCentimetros: 100,
            consumoPorCentimetro: 0.5, // 50 varillas base
            porcentajeDesperdicio: 10 // +10% desperdicio = 55 varillas
        };

        expect(calcularConsumoCordon(cordon)).toBe(55);
    });

    it('calcula el consumo total acumulado de múltiples cordones', () => {
        const cordones: CordonSoldadura[] = [
            { longitudCentimetros: 50, consumoPorCentimetro: 0.2, porcentajeDesperdicio: 0 }, // 10
            { longitudCentimetros: 200, consumoPorCentimetro: 0.1, porcentajeDesperdicio: 20 } // 20 + 4 = 24
        ];

        expect(calcularConsumoTotalSoldadura(cordones)).toBe(34);
    });
});