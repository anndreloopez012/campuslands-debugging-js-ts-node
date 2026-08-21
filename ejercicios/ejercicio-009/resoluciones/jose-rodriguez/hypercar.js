const FACTOR_KMH_A_MPH = 0.621371;

export function kmhAMph(kmh) {
    const v = Number(kmh) || 0;
    return Number((v * FACTOR_KMH_A_MPH).toFixed(2));
}

export function mphAKmh(mph) {
    const v = Number(mph) || 0;
    return Number((v / FACTOR_KMH_A_MPH).toFixed(2));
}

export function ordenarPorVelocidad(autos) {
    if (!Array.isArray(autos)) return [];

    return [...autos].sort((a, b) => {
        const vA = Number(a?.velocidadKmh) || 0;
        const vB = Number(b?.velocidadKmh) || 0;
        return vB - vA;
    });
}

