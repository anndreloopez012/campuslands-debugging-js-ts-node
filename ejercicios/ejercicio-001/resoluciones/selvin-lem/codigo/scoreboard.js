export function calcularResultado(datos) {
  // BUG intencional: la implementacion no respeta completamente el README ni los tests.
  return datos.map(item => item.puntos).reduce((acumulador, numeroActual) => acumulador + numeroActual, 0);
}

export function ordenarRanking(jugadores) {
  // BUG intencional: orden ascendente cuando deberia priorizar mejores resultados.
  return [...jugadores].sort((a, b) => b.puntos - a.puntos);
}