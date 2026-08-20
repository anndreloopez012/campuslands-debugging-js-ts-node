export function calcularDiferenciaGoles(golesFavor, golesContra) {
    const gf = Number(golesFavor) || 0;
    const gc = Number(golesContra) || 0;
    return gf - gc;
}

export function calcularTablaFutsal(equipos) {
    if (!Array.isArray(equipos)) return [];

    return [...equipos].sort((a, b) => {
        const puntosA = Number(a.puntos) || 0;
        const puntosB = Number(b.puntos) || 0;

        if (puntosB !== puntosA) {
            return puntosB - puntosA;
        }

        const difA = calcularDiferenciaGoles(a.gf, a.gc);
        const difB = calcularDiferenciaGoles(b.gf, b.gc);

        if (difB !== difA) {
            return difB - difA;
        }

        const gfA = Number(a.gf) || 0;
        const gfB = Number(b.gf) || 0;

        return gfB - gfA;
    });
}