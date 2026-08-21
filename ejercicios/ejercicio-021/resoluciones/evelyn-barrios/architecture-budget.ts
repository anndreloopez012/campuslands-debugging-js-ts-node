export type Partida = {
  material: string;
  costo: number;
  cantidad: number;
};

export type Presupuesto = {
  limite: number;
  partidas: Partida[];
};

export function esPresupuestoValido(presupuesto: Presupuesto): boolean {
  // FIX: Se calcula el costo total multiplicando costo por cantidad.
  const costoTotal = presupuesto.partidas.reduce((total, partida) => {
    return total + (partida.costo * partida.cantidad);
  }, 0);

  // FIX: Se compara el costo total con el límite del presupuesto.
  return costoTotal <= presupuesto.limite;
}
