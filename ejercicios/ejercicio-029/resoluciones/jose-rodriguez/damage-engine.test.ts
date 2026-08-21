import { describe, expect, it } from 'vitest';
import {
    calcularDanoPorDistancia,
    resolverImpacto,
    Disparo,
    Objetivo
} from './damage-engine';

describe('ejercicio 029 - Shooter táctico', () => {
    it('reduce el daño base progresivamente a mayor distancia', () => {
        expect(calcularDanoPorDistancia(100, 10)).toBe(100);
        expect(calcularDanoPorDistancia(100, 25)).toBe(85);
        expect(calcularDanoPorDistancia(100, 40)).toBe(70);
        expect(calcularDanoPorDistancia(100, 60)).toBe(50);
    });

    it('resuelve el daño a un objetivo con armadura aplicando duplicador por disparo a la cabeza', () => {
        const disparo: Disparo = {
            danoBase: 40,
            distanciaMetros: 10,
            esCabeza: true // 40 * 2 = 80 de daño
        };

        const objetivo: Objetivo = {
            salud: 100,
            armadura: 25 // 25% absorción -> daño absorbido = 20, daño efectivo = 60
        };

        const resultado = resolverImpacto(disparo, objetivo);

        expect(resultado.danoEfectivo).toBe(60);
        expect(resultado.saludRestante).toBe(40);
        expect(resultado.eliminado).toBe(false);
    });
});