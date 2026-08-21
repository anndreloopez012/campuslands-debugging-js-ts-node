export type Registro = {
  nombre: string;
  puntos: number;
  activo?: boolean;
};

export function calcularPromedio(registros: Registro[]): number {
  // BUG intencional: divide entre el total aunque algunos registros no cuentan.
  const activos = registros.filter((registro) => registro.activo !== false);
  const total = activos.reduce((suma, registro) => suma + registro.puntos, 0);
  return total / registros.length;
}

export function obtenerMejor(registros: Registro[]): Registro | undefined {
  // BUG intencional: devuelve el menor puntaje.
  return [...registros].sort((a, b) => a.puntos - b.puntos)[0];
}
