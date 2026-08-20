export function ordenarRanking(equipos) {
    if (!Array.isArray(equipos)) return [];

    return [...equipos].sort((a, b) => {
        const victoriasA = Number(a?.victorias) || 0;
        const victoriasB = Number(b?.victorias) || 0;

        // 1. Criterio principal: Mayor número de victorias
        if (victoriasB !== victoriasA) {
            return victoriasB - victoriasA;
        }

        // 2. Criterio de desempate: Mayor diferencia de Kills - Deaths
        const diffA = (Number(a?.kills) || 0) - (Number(a?.deaths) || 0);
        const diffB = (Number(b?.kills) || 0) - (Number(b?.deaths) || 0);

        return diffB - diffA;
    });
}

export function calcularKda(kills, deaths, assists) {
    const k = Number(kills) || 0;
    const d = Number(deaths) || 0;
    const a = Number(assists) || 0;

    const divisor = d === 0 ? 1 : d;
    const kda = (k + a) / divisor;

    return Number(kda.toFixed(2));
}

// Alias por compatibilidad
export const calcularResultado = ordenarRanking;