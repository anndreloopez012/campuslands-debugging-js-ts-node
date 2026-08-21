// ejercicio 19 - 34

  

export type Registro = {

nombre: string;

puntos: number;

activo?: boolean;

};

  

export function calcularPromedio(registros: Registro[]): number {

// FIX: se divide entre la cantidad de registros activos, no entre el total.

const activos = registros.filter((registro) => registro.activo !== false);

const total = activos.reduce((suma, registro) => suma + registro.puntos, 0);

return total / activos.length;

}

  

export function obtenerMejor(registros: Registro[]): Registro | undefined {

// FIX: se ordena de mayor a menor para devolver el puntaje más alto.

return [...registros].sort((a, b) => b.puntos - a.puntos)[0];

}

  

// ejercicio 20
