import { describe, expect, it } from 'vitest';
import { calcularStockTotal, obtenerPrendasPorTalla, PrendaStreetwear } from './streetwear-stock';

describe('ejercicio 023 - Ropa streetwear', () => {
    it('calcula el stock total sumando únicamente las prendas activas', () => {
        const inventario: PrendaStreetwear[] = [
            { id: '1', nombre: 'Oversized Hoodie', talla: 'L', stock: 15, activo: true },
            { id: '2', nombre: 'Cargo Pants', talla: 'M', stock: 10, activo: true },
            { id: '3', nombre: 'Graphic Tee', talla: 'S', stock: 5, activo: false }
        ];

        expect(calcularStockTotal(inventario)).toBe(25);
    });

    it('obtiene las prendas activas con stock según la talla indicada', () => {
        const inventario: PrendaStreetwear[] = [
            { id: '1', nombre: 'Oversized Hoodie', talla: 'L', stock: 8, activo: true },
            { id: '2', nombre: 'Acid Wash Tee', talla: 'L', stock: 0, activo: true },
            { id: '3', nombre: 'Puffer Jacket', talla: 'L', stock: 4, activo: true }
        ];

        const resultado = obtenerPrendasPorTalla(inventario, 'L');
        expect(resultado).toHaveLength(2);
        expect(resultado.map((p) => p.id)).toEqual(['1', '3']);
    });
});