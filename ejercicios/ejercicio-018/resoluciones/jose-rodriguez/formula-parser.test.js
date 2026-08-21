import { describe, expect, it } from 'vitest';
import { contarAtomos } from './formula-parser.js';

describe('ejercicio 018 - Fórmulas químicas', () => {
    it('parsea correctamente fórmulas simples como H2O', () => {
        const resultado = contarAtomos('H2O');
        expect(resultado).toEqual({ H: 2, O: 1 });
    });

    it('parsea elementos sin subíndice explícito y elementos compuestos por dos letras', () => {
        const resultado = contarAtomos('NaCl');
        expect(resultado).toEqual({ Na: 1, Cl: 1 });
    });

    it('parsea fórmulas complejas como la glucosa C6H12O6', () => {
        const resultado = contarAtomos('C6H12O6');
        expect(resultado).toEqual({ C: 6, H: 12, O: 6 });
    });

    it('retorna un objeto vacío para entradas inválidas o vacías', () => {
        expect(contarAtomos('')).toEqual({});
        expect(contarAtomos(null)).toEqual({});
    });
});