/**
 * Filtra una lista de canciones para devolver solo aquellas que superan un umbral de energía.
 *
 * @param {object[]} songs - Un array de objetos de canciones.
 * @param {string} songs[].name - El nombre de la canción.
 * @param {number} songs[].energy - Un valor de 0 a 1 que representa la energía de la canción.
 * @param {number} minEnergy - El umbral mínimo de energía para el filtro.
 * @returns {object[]} Un nuevo array con los objetos de canción completos que cumplen el criterio.
 */
export function filterByEnergy(songs, minEnergy) {
  return songs.filter(song => song.energy > minEnergy);
}