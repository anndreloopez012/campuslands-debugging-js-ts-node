export type Registro = {
  nombre: string;
  puntos: number;
  activo?: boolean;
};

export function calcularPromedio(registros: Registro[]): number {
  // BUG intencional: divide entre el total aunque algunos registros no cuentan.
  const activos = registros.filter((registro) => registro.activo !== false);
  const total = activos.reduce((suma, registro) => suma + registro.puntos, 0);
  
  // FIX: Si no hay activos, el promedio es 0 para evitar la división por cero.
  // FIX: El promedio se calcula dividiendo por la cantidad de registros activos, no el total.
  return activos.length > 0 ? total / activos.length : 0;
}

export function obtenerMejor(registros: Registro[]): Registro | undefined {
  // BUG intencional: devuelve el menor puntaje.
  // FIX: Se invierte el orden de la comparación para que ordene de mayor a menor.
  return [...registros].sort((a, b) => b.puntos - a.puntos)[0];
}

