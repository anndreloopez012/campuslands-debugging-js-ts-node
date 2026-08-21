export function calcularDiferenciaGoles(golesAFavor, golesEnContra) {
    const gf = Number(golesAFavor) || 0;
    const gc = Number(golesEnContra) || 0;
    return gf - gc;
}

export function ordenarTablaFutsal(equipos) {
    if (!Array(equipos)) return [];

    return [...equipos].sort((a, b) => {
        const puntosA = Number(a?.puntos) || 0;
        const puntosB = Number(b?.puntos) || 0;

        if (puntosB !== puntosA) {
            return puntosB - puntosA;
        }

        const diffA = calcularDiferenciaGoles(a?.gf, a?.gc);
        const diffB = calcularDiferenciaGoles(b?.gf, b?.gc);

        return diffB - diffA;
    });
}

