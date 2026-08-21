/**
 * Ordena un array de equipos de MOBA.
 * @param {object[]} teams - Un array de objetos, donde cada objeto representa un equipo.
 * @param {string} teams[].name - El nombre del equipo.
 * @param {number} teams[].victories - El número de victorias del equipo.
 * @param {number} teams[].difference - La diferencia de puntos del equipo.
 * @returns {object[]} Un **nuevo** array con los equipos ordenados, sin mutar el original.
 */
export function sortTeams(teams) {
  return [...teams].sort((a, b) => {
    // Criterio 1: Ordenar por victorias (descendente)
    // Criterio 2: Si las victorias son iguales, ordenar por diferencia (descendente)
    return b.victories - a.victories || b.difference - a.difference;
  });
}
