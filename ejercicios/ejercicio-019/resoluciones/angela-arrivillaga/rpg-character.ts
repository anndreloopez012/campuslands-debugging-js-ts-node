export type Registro = {
  nombre: string;
  puntos: number;
  activo?: boolean;
};

export function calcularPromedio(registros: Registro[]): number {
  // Filtramos solo los activos y dividimos entre la cantidad de activos, no el total general
  const activos = registros.filter((registro) => registro.activo !== false);
  if (activos.length === 0) return 0;
  const total = activos.reduce((suma, registro) => suma + registro.puntos, 0);
  return total / activos.length;
}

export function obtenerMejor(registros: Registro[]): Registro | undefined {
  // Ordenamos de mayor a menor puntaje (b.puntos - a.puntos) y tomamos el primero
  if (registros.length === 0) return undefined;
  return [...registros].sort((a, b) => b.puntos - a.puntos)[0];
}