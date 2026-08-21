/**
 * Calcula la tabla de posiciones de un torneo de futsal.
 *
 * @param {object[]} teams - Array de equipos.
 * @param {number} teams[].id - ID del equipo.
 * @param {string} teams[].name - Nombre del equipo.
 * @param {object[]} matches - Array de partidos jugados.
 * @param {number} matches[].home - ID del equipo local.
 * @param {number} matches[].away - ID del equipo visitante.
 * @param {number} matches[].homeScore - Goles del equipo local.
 * @param {number} matches[].awayScore - Goles del equipo visitante.
 * @returns {object[]} La tabla de posiciones calculada.
 */
export function calculateFutsalTable(teams, matches) {
  const table = new Map(teams.map(team => [
    team.id,
    { name: team.name, P: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, Pts: 0 }
  ]));

  for (const match of matches) {
    const home = table.get(match.home);
    const away = table.get(match.away);

    home.P += 1;
    away.P += 1;
    home.GF += match.homeScore;
    away.GF += match.awayScore;
    home.GA += match.awayScore;
    away.GA += match.homeScore;

    if (match.homeScore > match.awayScore) { // Gana local
      home.W += 1;
      home.Pts += 3;
      away.L += 1;
    } else if (match.awayScore > match.homeScore) { // Gana visitante
      away.W += 1;
      away.Pts += 3;
      home.L += 1;
    } else { // Empate
      home.D += 1;
      away.D += 1;
      home.Pts += 1;
      away.Pts += 1;
    }
  }

  return Array.from(table.values()).map(team => ({ ...team, GD: team.GF - team.GA }));
}