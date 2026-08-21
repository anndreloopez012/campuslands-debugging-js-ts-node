/**
 * Determina el ganador de una pelea de kickboxing basado en las tarjetas de los jueces.
 *
 * @param {number[][]} scorecards - Un array de arrays, donde cada subarray es la tarjeta de un juez.
 *                                 Ej: [[10, 9], [9, 10], [10, 9]]
 * @returns {object} Un objeto que indica el ganador o si fue un empate.
 *                   - { winner: 'Fighter A' }
 *                   - { winner: 'Fighter B' }
 *                   - { result: 'draw' }
 */
export function getWinner(scorecards) {
  let fighterAWins = 0;
  let fighterBWins = 0;

  for (const card of scorecards) {
    if (card[0] > card[1]) fighterAWins++;
    if (card[1] > card[0]) fighterBWins++;
  }

  if (fighterAWins > fighterBWins) return { winner: 'Fighter A' };
  if (fighterBWins > fighterAWins) return { winner: 'Fighter B' };
  return { result: 'draw' };
}
