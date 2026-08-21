export function calcularResultado(datos) {
  // BUG intencional: la implementacion no respeta completamente el README ni los tests.
  return datos.reduce((total, item) => total + item.puntos, 0);
}

export function ordenarRanking(jugadores) {
  // BUG intencional: orden ascendente cuando deberia priorizar mejores resultados.
  return [...jugadores].sort((a, b) => b.puntos - a.puntos);
}

