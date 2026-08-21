export type NivelRiesgo = 'Bajo' | 'Medio' | 'Alto' | 'Critico';

export interface MisionEspacial {
    id: string;
    nombre: string;
    distanciaAnosLuz: number;
    tripulada: boolean;
    factorAmenaza?: number; // Valor numérico entre 0 y 100
    riesgo?: NivelRiesgo;
}

export function determinarRiesgoMision(mision: MisionEspacial): NivelRiesgo {
    const amenaza = mision.factorAmenaza ?? 0;

    if (amenaza >= 80 || (mision.tripulada && mision.distanciaAnosLuz > 100)) {
        return 'Critico';
    }
    if (amenaza >= 50 || mision.distanciaAnosLuz > 50) {
        return 'Alto';
    }
    if (amenaza >= 20 || mision.distanciaAnosLuz > 10) {
        return 'Medio';
    }
    return 'Bajo';
}

export function clasificarMisionesPorRiesgo(
    misiones: MisionEspacial[]
): Record<NivelRiesgo, MisionEspacial[]> {
    const clasificacion: Record<NivelRiesgo, MisionEspacial[]> = {
        Bajo: [],
        Medio: [],
        Alto: [],
        Critico: []
    };

    if (!Array.isArray(misiones)) return clasificacion;

    for (const mision of misiones) {
        const riesgoCalculado = mision.riesgo || determinarRiesgoMision(mision);
        clasificacion[riesgoCalculado].push({ ...mision, riesgo: riesgoCalculado });
    }

    return clasificacion;
}

// Alias por compatibilidad
export const calcularResultado = clasificarMisionesPorRiesgo;