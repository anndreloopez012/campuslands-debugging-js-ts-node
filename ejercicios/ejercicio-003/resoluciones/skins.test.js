import { describe, expect, it } from 'vitest';
import { aplicarDescuento, calcularTotalTienda } from './skins.js';

describe('ejercicio 003 - Tienda de Skins (Descuentos y Redondeo)', () => {
    it('aplica el descuento correctamente y redondea el precio a 2 decimales', () => {
        const precioFinal = aplicarDescuento(19.99, 15);
        expect(precioFinal).toBe(16.99);
    });

    it('calcula el total acumulado de varias skins con sus respectivos descuentos', () => {
        const carritoSkins = [
            { nombre: 'Dragon Slayer', precio: 25.00, descuento: 20 },
            { nombre: 'Neon Vandal', precio: 15.50, descuento: 10 },
            { nombre: 'Classic Gold', precio: 10.00, descuento: 0 }
        ];

        const total = calcularTotalTienda(carritoSkins);
        expect(total).toBe(43.95);
    });
});