import { describe, expect, it } from 'vitest';
import { diagnosticarSintoma, obtenerDiagnosticoCompleto, SintomaMoto } from './moto-diagnostics';

describe('ejercicio 025 - Mecánica de motos', () => {
    it('retorna el diagnóstico adecuado para un síntoma individual', () => {
        const resultado = diagnosticarSintoma('freno_esponjoso');

        expect(resultado).not.toBeNull();
        expect(resultado?.severidad).toBe('Alta');
        expect(resultado?.solucionSugerida).toContain('Purgar circuito');
    });

    it('procesa una lista de síntomas y genera los diagnósticos completos', () => {
        const sintomas: SintomaMoto[] = ['humo_negro', 'ruido_valvulas'];
        const resultados = obtenerDiagnosticoCompleto(sintomas);

        expect(resultados).toHaveLength(2);
        expect(resultados[0].sintoma).toBe('humo_negro');
        expect(resultados[1].sintoma).toBe('ruido_valvulas');
    });
});