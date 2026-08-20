import { describe, expect, it } from 'vitest';
import { aplicarPocion, consumirItemInventario } from "./inventory";

describe('ejercicio 002 - Inventario RPG Inmutabilidad'), () => {
    it('aplica pocion aumentando la vida sin mutar el objeto original', () => {
        const jugadorOriginal = { nombre: 'Gerrero', vida: 50 };
        const jugadorActualizado = aplicarPocion(jugadorOriginal, 20);

        expect(jugadorActualizado.vida).toBe(70);
        expect(jugadorOriginal.vida).toBe(50);
        expect(jugadorActualizado).not.toBe(jugadorOriginal);
    });

    it('reduce la cantidad de un item consumido sin mutar el arreglo ni los objetos originales',  () => {
        const inventarioOriginal = [
            { id: 1, nombre: 'Pocion Roja', cantidad: 3 },
            { id: 2, nombre: 'Escudo de Madera', cantidad: 1}
        ];

        const nuevoInventario = consumirItemInventario(inventarioOriginal, 1);

        expect(nuevoInventario[0].cantidad).toBe(2);
        expect(nuevoInventario[1].cantidad).toBe(1);
        expect(inventarioOriginal[0].cantidad).toBe(3);
        expect(nuevoInventario).not.toBe(inventarioOriginal);
    });
};