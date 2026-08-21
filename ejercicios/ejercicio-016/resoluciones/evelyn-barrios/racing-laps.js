/**
 * Calcula el tiempo final de cada vuelta sumando las penalizaciones al tiempo base.
 *
 * @param {object[]} laps - Un array de objetos de vuelta.
 * @param {number} laps[].lap - El número de la vuelta.
 * @param {number} laps[].time - El tiempo base de la vuelta.
 * @param {number[]} laps[].penalties - Un array de segundos de penalización.
 * @returns {object[]} Un nuevo array de vueltas con una propiedad `finalTime` añadida.
 */
export function calculateLapTimes(laps) {
  return laps.map(lap => {
    const totalPenalty = lap.penalties.reduce((sum, penalty) => sum + penalty, 0);
    return { ...lap, finalTime: lap.time + totalPenalty };
  });
}