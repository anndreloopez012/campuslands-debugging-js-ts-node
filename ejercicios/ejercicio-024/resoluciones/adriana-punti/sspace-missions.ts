export type Mision = {
  nombre: string;
  riesgo: number;
};

export function clasificarRiesgo(mision: Mision): string {
  if (mision.riesgo >= 80) {
    return 'alto';
  }

  if (mision.riesgo >= 50) {
    return 'medio';
  }

  return 'bajo';
}

export function clasificarMisiones(misiones: Mision[]): Record<string, Mision[]> {
  return misiones.reduce<Record<string, Mision[]>>((resultado, mision) => {
    const categoria = clasificarRiesgo(mision);

    if (!resultado[categoria]) {
      resultado[categoria] = [];
    }

    resultado[categoria].push(mision);

    return resultado;
  }, {});
}
