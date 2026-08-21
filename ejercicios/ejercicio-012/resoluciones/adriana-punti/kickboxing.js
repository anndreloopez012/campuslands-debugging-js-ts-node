export function calcularGanador(tarjetas) {
  const votos = {};

  tarjetas.forEach((tarjeta) => {
    const ganador = tarjeta.ganador;

    votos[ganador] = (votos[ganador] || 0) + 1;
  });

  return Object.entries(votos)
    .sort((a, b) => b[1] - a[1])[0][0];
}