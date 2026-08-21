import { describe, expect, it } from 'vitest';
import {
    validarBuildMOBA,
    ObjetoMOBA
} from './moba-build';

describe('ejercicio 030 - MOBA builds', () => {
    it('permite un build válido de hasta 6 objetos únicos sin conflictos de pasiva', () => {
        const buildValido: ObjetoMOBA[] = [
            { id: 'b01', nombre: 'Botas de Rapidez', precio: 1100, esUnico: true },
            { id: 'i01', nombre: 'Espada del Infinito', precio: 3400, esUnico: true, categoriaPasiva: 'CriticoElevado' },
            { id: 'i02', nombre: 'Sanguinaria', precio: 3200, esUnico: true }
        ];

        const resultado = validarBuildMOBA(buildValido);

        expect(resultado.esValido).toBe(true);
        expect(resultado.totalOro).toBe(7700);
    });

    it('rechaza un build si contiene objetos únicos duplicados o supera el límite de 6 ítems', () => {
        const buildDuplicado: ObjetoMOBA[] = [
            { id: 'b01', nombre: 'Botas de Rapidez', precio: 1100, esUnico: true },
            { id: 'b01', nombre: 'Botas de Rapidez', precio: 1100, esUnico: true }
        ];

        const resultado = validarBuildMOBA(buildDuplicado);

        expect(resultado.esValido).toBe(false);
        expect(resultado.razonInvalidez).toContain('únicos duplicados');
    });
});