export function calcularResultado(datos) {
  return datos.reduce((total, item) => total + parseInt(item.puntos, 10), 0);
}

export function ordenarRanking(jugadores) {
  return [...jugadores].sort((a, b) => parseInt(b.puntos, 10) - parseInt(a.puntos, 10));
}
