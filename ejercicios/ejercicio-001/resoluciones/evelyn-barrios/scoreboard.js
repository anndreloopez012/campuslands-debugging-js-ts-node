export function calcularResultado(datos) {
  // El objetivo es sumar los puntos. El bug original concatenaba los puntos como texto.
  // Se usa reduce para sumar los valores, asegurando que cada punto se trate como número.
  return datos.reduce((total, item) => total + Number(item.puntos), 0);
}

export function ordenarRanking(jugadores) {
  // El ranking debe ser descendente (de mayor a menor puntuación).
  // Se invierte la lógica de comparación de 'a - b' a 'b - a'.
  return [...jugadores].sort((a, b) => b.puntos - a.puntos);
}
