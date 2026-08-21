import { describe, expect, it } from 'vitest';
import {
    calcularRatioPotenciaPrecio,
    ordenarCatalogoPorPotenciaPrecio,
    AutoLujo
} from './luxury-cars';

describe('ejercicio 031 - Autos de lujo', () => {
    it('calcula la relación potencia/precio correctamente', () => {
        const auto: AutoLujo = {
            id: '1',
            marca: 'Porsche',
            modelo: '911 GT3',
            potenciaHP: 502,
            precioUSD: 160000
        };

        // (502 / 160000) * 1000 = 3.1375 -> 3.14
        expect(calcularRatioPotenciaPrecio(auto)).toBe(3.14);
    });

    it('ordena el catálogo descendentemente por el ratio potencia/precio', () => {
        const catalogo: AutoLujo[] = [
            { id: '1', marca: 'Ferrari', modelo: 'F8', potenciaHP: 710, precioUSD: 280000 }, // Ratio: 2.54
            { id: '2', marca: 'Chevrolet', modelo: 'Corvette Z06', potenciaHP: 670, precioUSD: 105000 } // Ratio: 6.38
        ];

        const resultado = ordenarCatalogoPorPotenciaPrecio(catalogo);

        expect(resultado[0].modelo).toBe('Corvette Z06');
        expect(resultado[1].modelo).toBe('F8');
    });
});