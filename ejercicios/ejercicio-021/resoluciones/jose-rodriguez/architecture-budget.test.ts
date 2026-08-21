import { describe, expect, it } from 'vitest';
import {
    calcularCostoTotal,
    validarPresupuesto,
    Material3D,
    PresupuestoArquitectura
} from './architecture-budget';

describe('ejercicio 021 - Arquitectura 3D', () => {
    it('calcula el costo total multiplicando costoUnidad por cantidad para cada material activo', () => {
        const materiales: Material3D[] = [
            { nombre: 'Hormigón 3D', costoUnidad: 50, cantidad: 10, incluirEnPresupuesto: true }, // 500
            { nombre: 'Filamento Resina', costoUnidad: 30, cantidad: 5, incluirEnPresupuesto: true }, // 150
            { nombre: 'Boceto Opcional', costoUnidad: 100, cantidad: 2, incluirEnPresupuesto: false } // Ignorado
        ];

        expect(calcularCostoTotal(materiales)).toBe(650);
    });

    it('valida si un proyecto está dentro del presupuesto límite', () => {
        const proyecto: PresupuestoArquitectura = {
            limitePresupuesto: 1000,
            materiales: [
                { nombre: 'Vidrio Templado', costoUnidad: 200, cantidad: 4 } // 800
            ]
        };

        const resultado = validarPresupuesto(proyecto);
        expect(resultado.dentroDePresupuesto).toBe(true);
        expect(resultado.costoTotal).toBe(800);
        expect(resultado.diferencia).toBe(200);
    });
});