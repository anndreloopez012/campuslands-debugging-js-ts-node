/**
 * Verifica si un nuevo horario de cita está disponible en una agenda existente.
 *
 * @param {object[]} existingAppointments - Un array de citas existentes.
 * @param {number} existingAppointments[].startTime - La hora de inicio de la cita.
 * @param {number} existingAppointments[].endTime - La hora de fin de la cita.
 * @param {object} newAppointment - La nueva cita a verificar.
 * @param {number} newAppointment.startTime - La hora de inicio de la nueva cita.
 * @param {number} newAppointment.endTime - La hora de fin de la nueva cita.
 * @returns {boolean} `true` si el horario está disponible, `false` si hay solapamiento.
 */
export function isAvailable(existingAppointments, newAppointment) {
  // Devuelve `true` si NINGUNA cita existente se solapa con la nueva.
  return !existingAppointments.some(existing =>
    newAppointment.startTime < existing.endTime && newAppointment.endTime > existing.startTime
  );
}