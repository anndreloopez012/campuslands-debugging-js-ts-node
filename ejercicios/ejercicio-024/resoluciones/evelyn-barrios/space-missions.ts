export type NivelRiesgo = 'Bajo' | 'Medio' | 'Alto';

export type Mision = {
  nombre: string;
  duracion: number; // en días
  destino: string;
};

/**
 * Clasifica una lista de misiones espaciales en categorías de riesgo.
 * - Alto: Duración > 365 días O destino es Marte.
 * - Medio: Duración > 180 días.
 * - Bajo: Cualquier otro caso.
 */
export function clasificarMisiones(misiones: Mision[]): Record<NivelRiesgo, Mision[]> {
  const resultado: Record<NivelRiesgo, Mision[]> = {
    Bajo: [],
    Medio: [],
    Alto: [],
  };

  for (const mision of misiones) {
    // FIX: El orden de las condiciones es crucial. Se debe verificar el caso más
    // restrictivo (Alto) primero para evitar clasificaciones incorrectas.
    if (mision.duracion > 365 || mision.destino === 'Marte') {
      resultado.Alto.push(mision);
    } else if (mision.duracion > 180) {
      resultado.Medio.push(mision);
    } else {
      resultado.Bajo.push(mision);
    }
  }

  return resultado;
}
