/**
 * Determina el ganador de un juego de ping-pong.
 * Las reglas son: el primero en llegar a 11 puntos gana, pero debe ganar por 2.
 *
 * @param {number} scoreA - La puntuación del Jugador A.
 * @param {number} scoreB - La puntuación del Jugador B.
 * @returns {string|null} 'Player A', 'Player B', o null si el juego aún no ha terminado.
 */
export function getGameWinner(scoreA, scoreB) {
  const isPlayerAWinner = scoreA >= 11 && scoreA - scoreB >= 2;
  const isPlayerBWinner = scoreB >= 11 && scoreB - scoreA >= 2;

  if (isPlayerAWinner) {
    return 'Player A';
  } else if (isPlayerBWinner) {
    return 'Player B';
  }
  return null;
}
