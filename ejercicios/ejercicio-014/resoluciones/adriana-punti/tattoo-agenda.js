export function validarAgenda(sesiones) {
  return sesiones.every((sesion) => {
    return (
      typeof sesion.duracion === 'number' &&
      sesion.duracion > 0
    );
  });
}

export function calcularDuracionTotal(sesiones) {
  return sesiones.reduce((total, sesion) => {
    return total + sesion.duracion;
  }, 0);
}
