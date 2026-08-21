export function detectarSobrevivientes(jugadores) {
  return jugadores.filter((jugador) => jugador.vida > 0);
}

export function detectarZonaSegura(zonas) {
  return zonas.filter((zona) => zona.segura === true);
}

