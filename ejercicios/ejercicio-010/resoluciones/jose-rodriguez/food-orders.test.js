import { describe, expect, it } from 'vitest';
import { calcularTotalPedidosValidos, filtrarPedidosPorEstado } from './food-orders.js';

describe('ejercicio 010 - Pedidos de Comida (Validación de estado)', () => {
    it('totaliza únicamente los pedidos completados e ignora los cancelados o rechazados', () => {
        const ordenes = [
            { id: 1, total: 25.50, estado: 'completado' },
            { id: 2, total: 10.00, estado: 'cancelado' },
            { id: 3, total: 40.00, estado: 'completado' },
            { id: 4, total: 15.00, estado: 'rechazado' }
        ];

        const totalCalculado = calcularTotalPedidosValidos(ordenes);
        expect(totalCalculado).toBe(65.50);
    });

    it('filtra correctamente pedidos según los estados permitidos', () => {
        const ordenes = [
            { id: 101, estado: 'completado' },
            { id: 102, estado: 'pendiente' },
            { id: 103, estado: 'enviado' },
            { id: 104, estado: 'cancelado' }
        ];

        const filtrados = filtrarPedidosPorEstado(ordenes, ['completado', 'enviado']);

        expect(filtrados).toHaveLength(2);
        expect(filtrados.map(o => o.id)).toEqual([101, 103]);
    });
});