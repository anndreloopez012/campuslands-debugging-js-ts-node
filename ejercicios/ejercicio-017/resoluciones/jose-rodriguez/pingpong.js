export function evaluarMarcadorPingpong(puntosJugador1, puntosJugador2) {
    const p1 = Number(puntosJugador1) || 0;
    const p2 = Number(puntosJugador2) || 0;

    const diferencia = Math.abs(p1 - p2);


    if ((p1 >= 11 || p2 >= 11) && diferencia >= 2) {
        return {
            estado: 'Finalizado',
            ganador: p1 > p2 ? 'Jugador 1' : 'Jugador 2'
        };
    }


    if (p1 >= 10 && p2 >= 10 && p1 === p2) {
        return { estado: 'Deuce', ganador: null };
    }

    if (p1 >= 10 && p2 >= 10 && diferencia === 1) {
        const lider = p1 > p2 ? 'Jugador 1' : 'Jugador 2';
        return { estado: `Ventaja ${lider}`, ganador: null };
    }

    return { estado: 'En juego', ganador: null };
}


