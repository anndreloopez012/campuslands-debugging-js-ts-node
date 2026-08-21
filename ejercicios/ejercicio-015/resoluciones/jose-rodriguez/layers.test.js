import { describe, expect, it } from 'vitest';
import { normalizarCapasVisibles } from './layers.js';

describe('ejercicio 015 - Dibujo digital', () => {
    it('filtra unicamente las capas visibles y limpia espacios en el nombre', () => {
        const capasEntrada = [
            { nombre: ' Lineart ', visible: true, opacidad: 80 },
            { nombre: 'Boceto', visible: false, opacidad: 100 },
            { nombre: ' Color Base ', visible: true, opacidad: 100 }
        ];

        const resultado = normalizarCapasVisibles(capasEntrada);

        expect(resultado).toHaveLength(2);
        expect(resultado[0].nombre).toBe('Lineart');
        expect(resultado[1].nombre).toBe('Color Base');
    });

    it('ajusta la opacidad fuera de rango para mantenerla entre 0 y 100', () => {
        const capasConOpacidadExtrema = [
            { nombre: 'Sombra', visible: true, opacidad: 150 },
            { nombre: 'Brillo', visible: true, opacidad: -20 }
        ];

        const resultado = normalizarCapasVisibles(capasConOpacidadExtrema);

        expect(resultado[0].opacidad).toBe(100);
        expect(resultado[1].opacidad).toBe(0);
    });
});