/**
 * Filtra una lista de jugadores para encontrar a los que están dentro de una zona segura circular.
 * Un jugador está dentro si su distancia al centro de la zona es estrictamente menor que el radio.
 *
 * @param {object[]} players - Array de jugadores.
 * @param {number} players[].id - ID del jugador.
 * @param {string} players[].name - Nombre del jugador.
 * @param {number} players[].x - Coordenada X del jugador.
 * @param {number} players[].y - Coordenada Y del jugador.
 * @param {object} safeZone - La zona segura.
 * @param {number} safeZone.centerX - Coordenada X del centro de la zona.
 * @param {number} safeZone.centerY - Coordenada Y del centro de la zona.
 * @param {number} safeZone.radius - El radio de la zona segura.
 * @returns {object[]} Un nuevo array con los jugadores sobrevivientes.
 */
export function getSurvivors(players, safeZone) {
  return players.filter(player => {
    const distance = Math.sqrt(Math.pow(player.x - safeZone.centerX, 2) + Math.pow(player.y - safeZone.centerY, 2));
    return distance < safeZone.radius;
  });
}