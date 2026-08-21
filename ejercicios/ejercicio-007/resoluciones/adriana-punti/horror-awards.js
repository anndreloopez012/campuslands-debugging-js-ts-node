export function contarVotos(votos) {
  const conteo = {};

  votos.forEach((pelicula) => {
    conteo[pelicula] = (conteo[pelicula] || 0) + 1;
  });

  return conteo;
}

export function obtenerGanadores(votos) {
  const conteo = contarVotos(votos);
  const mayorCantidad = Math.max(...Object.values(conteo));

  return Object.entries(conteo)
    .filter(([, cantidad]) => cantidad === mayorCantidad)
    .map(([pelicula]) => pelicula);
}
