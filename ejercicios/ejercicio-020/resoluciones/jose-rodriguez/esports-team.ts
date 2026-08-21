export type RolEsports = 'IGL' | 'Entry' | 'AWPer' | 'Support' | 'Lurker' | 'Suplente';

export interface JugadorEsports {
    nombre: string;
    puntos: number;
    rol: RolEsports;
    esSuplente?: boolean;
}

export function calcularPromedio(jugadores: JugadorEsports[]): number {
    if (!jugadores || jugadores.length === 0) return 0;

    const activos = jugadores.filter(
        (jugador) => !jugador.esSuplente && jugador.rol !== 'Suplente'
    );

    if (activos.length === 0) return 0;

    const totalPuntos = activos.reduce((suma, jugador) => suma + jugador.puntos, 0);
    return totalPuntos / activos.length;
}

export function obtenerMejor(jugadores: JugadorEsports[]): JugadorEsports | undefined {
    if (!jugadores || jugadores.length === 0) return undefined;

    return [...jugadores].sort((a, b) => b.puntos - a.puntos)[0];
}


