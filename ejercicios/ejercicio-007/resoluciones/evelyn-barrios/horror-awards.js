/**
 * Procesa los votos para un concurso de películas de terror y determina el ganador o si hay un empate.
 *
 * @param {object[]} movies - Un array de objetos de películas.
 * @param {number} movies[].id - El ID único de la película.
 * @param {string} movies[].name - El nombre de la película.
 * @param {number[]} votes - Un array de números, donde cada número es el ID de la película votada.
 * @returns {object|null} Un objeto con el resultado o null si no hay votos.
 *                        - Si hay un ganador: { winner: 'Nombre', votes: X }
 *                        - Si hay un empate: { tie: true, movies: ['Nombre1', 'Nombre2'], votes: Y }
 */
export function getVoteResults(movies, votes) {
  if (votes.length === 0) {
    return null;
  }

  const voteCounts = votes.reduce((acc, voteId) => {
    acc[voteId] = (acc[voteId] || 0) + 1;
    return acc;
  }, {});

  const maxVotes = Math.max(...Object.values(voteCounts));
  const winnerIds = Object.keys(voteCounts).filter(id => voteCounts[id] === maxVotes);

  const movieMap = new Map(movies.map(movie => [movie.id.toString(), movie.name]));
  const winnerNames = winnerIds.map(id => movieMap.get(id));

  if (winnerIds.length === 1) {
    return { winner: winnerNames[0], votes: maxVotes };
  } else {
    return { tie: true, movies: winnerNames, votes: maxVotes };
  }
}