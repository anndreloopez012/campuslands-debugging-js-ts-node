export function calcularResultado(datos) {
  // Convierte a número cada propiedad de puntos y realiza la suma
  return datos.reduce((acumulado, item) => acumulado + Number(item.puntos), 0);
}

export function ordenarRanking(jugadores) {
  // Ordena los jugadores de mayor a menor puntaje
  return [...jugadores].sort((a, b) => Number(b.puntos) - Number(a.puntos));
}
