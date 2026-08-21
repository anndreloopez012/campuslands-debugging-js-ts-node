export interface CordonSoldadura {
    id?: string;
    longitudCentimetros: number;
    consumoPorCentimetro: number;
    porcentajeDesperdicio?: number;
}

export function calcularConsumoCordon(cordon: CordonSoldadura): number {
    if (!cordon || cordon.longitudCentimetros <= 0 || cordon.consumoPorCentimetro <= 0) {
        return 0;
    }

    const consumoBase = cordon.longitudCentimetros * cordon.consumoPorCentimetro;
    const desperdicio = (cordon.porcentajeDesperdicio || 0) / 100;
    const total = consumoBase * (1 + desperdicio);

    // Redondeo a 4 decimales para corregir imprecisiones flotantes (ej: 55.00000000000001 -> 55)
    return Number(total.toFixed(4));
}

export function calcularConsumoTotalSoldadura(cordones: CordonSoldadura[]): number {
    if (!Array.isArray(cordones) || cordones.length === 0) return 0;

    const total = cordones.reduce((acumulado, cordon) => acumulado + calcularConsumoCordon(cordon), 0);
    return Number(total.toFixed(4));
}

