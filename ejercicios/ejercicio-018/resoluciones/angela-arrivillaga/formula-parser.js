export function calcularResultado(datos) {
  // Sumamos los puntos correctamente usando reduce en lugar de concatenar
  return datos.reduce((acumulado, item) => acumulado + item.puntos, 0);
}

export function ordenarRanking(jugadores) {
  // Orden descendente (de mayor a menor puntaje) invirtiendo la resta
  return [...jugadores].sort((a, b) => b.puntos - a.puntos);
}