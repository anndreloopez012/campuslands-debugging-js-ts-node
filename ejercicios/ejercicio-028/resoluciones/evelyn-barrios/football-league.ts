export type Team = {
  name: string;
  points: number;
  goalDifference: number;
};

/**
 * Ordena la tabla de posiciones de una liga de fútbol.
 * El criterio principal son los puntos (descendente).
 * El criterio de desempate es la diferencia de goles (descendente).
 *
 * BUG ORIGINAL: La función de ordenamiento solo consideraba los puntos,
 * ignorando la diferencia de goles en caso de empate.
 */
export function calculateStandings(teams: Team[]): Team[] {
  return [...teams].sort((a, b) => {
    // Primero, comparar por puntos (de mayor a menor)
    if (b.points !== a.points) {
      return b.points - a.points;
    }
    // Si los puntos son iguales, comparar por diferencia de goles (de mayor a menor)
    return b.goalDifference - a.goalDifference;
  });
}
