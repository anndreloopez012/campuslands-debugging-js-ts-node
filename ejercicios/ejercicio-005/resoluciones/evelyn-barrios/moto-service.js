/**
 *
 * @param {number} currentMileage - El kilometraje actual de la moto.
 * @param {number} lastServiceMileage - El kilometraje en el que se hizo el último servicio.
 * @returns {boolean} `true` si necesita mantenimiento, `false` en caso contrario.
 */
export function needsMaintenance(currentMileage, lastServiceMileage) {
  const maintenanceInterval = 5000;
  return (currentMileage - lastServiceMileage) > maintenanceInterval;
}