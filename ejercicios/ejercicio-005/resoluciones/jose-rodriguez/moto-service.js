export function esKilometrajeValido(km) {
  if (km === null || km === undefined || km === '') return false;
  const num = Number(km);
  return !isNaN(num) && num >= 0;
}

export function obtenerMantenimientosVencidos(motos) {
  if (!Array.isArray(motos)) return [];

  return motos.filter(moto => {
    const kmActual = Number(moto?.kilometrajeActual) || 0;
    const kmLimite = Number(moto?.limiteMantenimiento) || 0;

    return esKilometrajeValido(moto?.kilometrajeActual) && kmActual >= kmLimite;
  });
}