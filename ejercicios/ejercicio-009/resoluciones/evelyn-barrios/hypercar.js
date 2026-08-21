/**
 * Convierte una velocidad de km/h a la unidad especificada.
 *
 * @param {number} speedKph - La velocidad en kilómetros por hora.
 * @param {string} targetUnit - La unidad a la que se debe convertir ('mph' o 'km/h').
 * @returns {number} La velocidad convertida, redondeada a dos decimales.
 */
export function convertSpeed(speedKph, targetUnit) {
  if (targetUnit === 'mph') {
    const mph = speedKph * 0.621371;
    return Math.round(mph * 100) / 100;
  }
  return speedKph;
}