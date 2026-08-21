export function calcularResultado(datos) {
  // Se convierte cada valor a número y se suma 
  return datos.reduce((acc, item) => acc + item.puntos, 0);
}

export function ordenarRanking(jugadores) {
  // se cambio el orden de mayora a menor para priorizar mejores puntajes 
  return [...jugadores].sort((a, b) => b.puntos - a.puntos);
}
