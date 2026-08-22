export function calcularResultado(datos) {
  return datos.reduce((suma, item) => suma + item.puntos, 0);
}

export function ordenarRanking(jugadores) {
  return [...jugadores].sort((a, b) => b.puntos - a.puntos);
}