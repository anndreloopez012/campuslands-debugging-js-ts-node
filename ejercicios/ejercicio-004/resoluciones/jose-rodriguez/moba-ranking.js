
export function ordenarRankingMoba(equipos) {
    if (!Array.isArray(equipos)) return [];

    return [...equipos].sort((a, b) => {
        if (b.victorias !== a.victorias) {
            return b.victorias - a.victorias;
        }

        const diferenciaA = a.kills - a.deaths;
        const diferenciaB = b.kills - b.deaths;

        return diferenciaB - diferenciaA;
    });
}

export function calcularKda(kills, deaths, assists) {
    if (deaths === 0) {
        return Number((kills + assists).toFixed(2));
    }
    const kda = (kills + assists) / deaths;
    return Number(kda.toFixed(2));
}