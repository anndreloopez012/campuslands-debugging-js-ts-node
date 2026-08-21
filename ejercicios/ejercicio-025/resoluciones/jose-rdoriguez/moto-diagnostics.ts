export type SintomaMoto =
    | 'humo_negro'
    | 'ruido_valvulas'
    | 'bateria_descargada'
    | 'freno_esponjoso'
    | 'perdida_potencia';

export interface DiagnosticoFalla {
    sintoma: SintomaMoto;
    causaProbable: string;
    severidad: 'Baja' | 'Media' | 'Alta';
    solucionSugerida: string;
}

const BASE_DIAGNOSTICOS: Record<SintomaMoto, Omit<DiagnosticoFalla, 'sintoma'>> = {
    humo_negro: {
        causaProbable: 'Mezcla rica en combustible / Carburación desajustada',
        severidad: 'Media',
        solucionSugerida: 'Limpiar carburador o ajustar inyectores y filtro de aire'
    },
    ruido_valvulas: {
        causaProbable: 'Holgura incorrecta en balancines de válvulas',
        severidad: 'Media',
        solucionSugerida: 'Calibrar luz de válvulas en frío'
    },
    bateria_descargada: {
        causaProbable: 'Fallo en estator, regulador de voltaje o vida útil agotada',
        severidad: 'Alta',
        solucionSugerida: 'Probar alternador con multímetro y reemplazar batería'
    },
    freno_esponjoso: {
        causaProbable: 'Presencia de aire en el circuito hidráulico o líquido degradado',
        severidad: 'Alta',
        solucionSugerida: 'Purgar circuito de frenos y reemplazar fluido'
    },
    perdida_potencia: {
        causaProbable: 'Filtro de aire obstruido o bujía desgastada',
        severidad: 'Baja',
        solucionSugerida: 'Reemplazar bujía y limpiar/cambiar filtro de aire'
    }
};


export function diagnosticarSintoma(sintoma: SintomaMoto): DiagnosticoFalla | null {
    const info = BASE_DIAGNOSTICOS[sintoma];
    if (!info) return null;

    return {
        sintoma,
        ...info
    };
}

export function obtenerDiagnosticoCompleto(sintomas: SintomaMoto[]): DiagnosticoFalla[] {
    if (!Array.isArray(sintomas) || sintomas.length === 0) return [];

    return sintomas
        .map((sintoma) => diagnosticarSintoma(sintoma))
        .filter((diag): diag is DiagnosticoFalla => diag !== null);
}

// Alias por compatibilidad
export const calcularResultado = obtenerDiagnosticoCompleto;