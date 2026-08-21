import { describe, expect, it } from 'vitest';
import { calcularTotalPedidosValidos, calcularTotalConIva } from './food-orders.js';

describe('ejercicio 010 - Pedidos de comida', () => {
    it('calcula el total acumulado ignorando los pedidos cancelados', () => {
        const ordenes = [
            { id: 'ORD-01', total: 45000, estado: 'entregado' },
            { id: 'ORD-02', total: 30000, estado: 'cancelado' },
            { id: 'ORD-03', total: 25000, estado: 'completado' }
        ];

        const subtotal = calcularTotalPedidosValidos(ordenes);
        expect(subtotal).toBe(70000);
    });

    it('calcula el total con impuesto IVA correctamente redondeado', () => {
        expect(calcularTotalConIva(100000, 19)).toBe(119000);
        expect(calcularTotalConIva(50000, 10)).toBe(55000);
        expect(calcularTotalConIva(0, 19)).toBe(0);
    });
});