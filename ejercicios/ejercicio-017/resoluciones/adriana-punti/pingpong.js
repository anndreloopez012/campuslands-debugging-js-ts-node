export function calcularMarcador(jugadorA, jugadorB) {
  if (jugadorA < 0 || jugadorB < 0) {
    throw new Error('Los puntos no pueden ser negativos');
  }

  if (jugadorA >= 10 && jugadorB >= 10) {
    if (jugadorA === jugadorB) {
      return 'empate';
    }

    if (jugadorA > jugadorB && jugadorA - jugadorB >= 2) {
      return 'Jugador A';
    }

    if (jugadorB > jugadorA && jugadorB - jugadorA >= 2) {
      return 'Jugador B';
    }

    if (jugadorA > jugadorB) {
      return 'ventaja Jugador A';
    }

    return 'ventaja Jugador B';
  }

  if (jugadorA >= 11 && jugadorA - jugadorB >= 2) {
    return 'Jugador A';
  }

  if (jugadorB >= 11 && jugadorB - jugadorA >= 2) {
    return 'Jugador B';
  }

  return 'en juego';
}

export function determinarGanador(jugadorA, jugadorB) {
  const resultado = calcularMarcador(jugadorA, jugadorB);

  if (resultado === 'Jugador A') {
    return 'Jugador A';
  }

  if (resultado === 'Jugador B') {
    return 'Jugador B';
  }

  return null;
}
