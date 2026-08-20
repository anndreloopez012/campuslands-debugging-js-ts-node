export function calcularResultado(datos) {
    if(!Array.isArray(datos)) return 0;

    return datos.reduce((acumulado, item) => {
        const puntosNum = Number(item?.puntos) || 0;
        return acumulado + puntosNum;
    }, 0);
}

export function ordenarRanking(jugadores) {
    if (!Array.isArray(jugadores)) return [];

    return [...jugadores].sort((a, b) => {
        const puntosA = Number(a?.puntos) || 0;
        const puntosB = Number(b?.puntos) || 0;
        return puntosB - puntosA;
    });
}