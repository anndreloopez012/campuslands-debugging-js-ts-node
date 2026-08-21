export function obtenerSobrevivientes(jugadores) {
    if (!Array.isArray(jugadores)) return [];

    return jugadores
        .filter(jugador => (Number(jugador?.salud) || 0) > 0)
        .map(jugador => ({ ...jugador }));
}

export function estaEnZonaSegura(posicion, radioZona) {
    const x = Number(posicion?.x) || 0;
    const y = Number(posicion?.y) || 0;
    const radio = Number(radioZona) || 0;

    const distancia = Math.sqrt(x * x + y * y);
    return distancia <= radio;
}

