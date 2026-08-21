export type Registro = {
  nombre: string;
  puntos: number;
  activo?: boolean;
};

export function calcularPromedio(registros: Registro[]): number {
  // BUG intencional: divide entre el total aunque algunos registros no cuentan.
  const activos = registros.filter((registro) => registro.activo !== false);
  const total = activos.reduce((suma, registro) => suma + registro.puntos, 0);
  // FIX: Se debe dividir por la cantidad de registros activos, no el total.
  // También se debe manejar el caso de que no haya activos para evitar la división por cero.
  if (activos.length === 0) {
    return 0;
  }
  return total / activos.length;
}

export function obtenerMejor(registros: Registro[]): Registro | undefined {
  // BUG intencional: devuelve el menor puntaje.
  // FIX: La función de ordenamiento debe ser descendente (b.puntos - a.puntos) para obtener el mayor puntaje.
  return [...registros].sort((a, b) => b.puntos - a.puntos)[0];
}
