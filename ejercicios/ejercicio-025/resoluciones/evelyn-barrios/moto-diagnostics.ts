export type Sintoma = 'no_arranca' | 'ruido_motor' | 'humo_excesivo' | 'frenos_debiles';
export type Falla = 'bateria_descargada' | 'problema_carburador' | 'aceite_quemado' | 'liquido_frenos_bajo';

const DIAGNOSTICOS: Record<Sintoma, Falla[]> = {
  no_arranca: ['bateria_descargada', 'problema_carburador'],
  ruido_motor: ['problema_carburador', 'aceite_quemado'],
  humo_excesivo: ['aceite_quemado'],
  frenos_debiles: ['liquido_frenos_bajo'],
};

/**
 * Diagnostica las posibles fallas de una motocicleta basándose en una lista de síntomas.
 * @param sintomas - Un array de síntomas observados.
 * @returns Un array de posibles fallas sin duplicados.
 */
export function diagnosticar(sintomas: Sintoma[]): Falla[] {
  // BUG: La implementación original devolvía resultados duplicados y no manejaba
  // síntomas desconocidos de forma eficiente.
  const fallasPosibles = new Set<Falla>();

  // FIX: Se itera sobre los síntomas y se usa un Set para evitar duplicados.
  // Esto es más eficiente y garantiza un resultado limpio.
  for (const sintoma of sintomas) {
    const diagnostico = DIAGNOSTICOS[sintoma];
    if (diagnostico) {
      for (const falla of diagnostico) {
        fallasPosibles.add(falla);
      }
    }
  }

  return Array.from(fallasPosibles);
}
