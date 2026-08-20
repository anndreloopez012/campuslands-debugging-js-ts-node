export function calcularResultado(datos) {
  return datos.reduce((acumulador, item) => acumulador + item.puntos, 0);
}

export function ordenarRanking(jugadores) {
  return [...jugadores].sort((a, b) => b.puntos - a.puntos);
}