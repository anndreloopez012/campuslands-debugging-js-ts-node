export type GeneroMusical = 'House' | 'Techno' | 'Reggaeton' | 'HipHop' | 'Rock' | 'Trap';

export interface RangoBPM {
    min: number;
    max: number;
}

export interface PistaMusical {
    titulo: string;
    genero: GeneroMusical;
    bpm: number;
}

export interface ResultadoValidacionBPM {
    esValido: boolean;
    pista: PistaMusical;
    rangoEsperado: RangoBPM;
    mensaje: string;
}

export const RANGOS_BPM_GENERO: Record<GeneroMusical, RangoBPM> = {
    Reggaeton: { min: 80, max: 100 },
    HipHop: { min: 80, max: 115 },
    Trap: { min: 130, max: 160 },
    House: { min: 120, max: 130 },
    Techno: { min: 125, max: 150 },
    Rock: { min: 110, max: 140 }
};

export function validarBPM(pista: PistaMusical): ResultadoValidacionBPM {
    const rango = RANGOS_BPM_GENERO[pista.genero];

    if (!rango) {
        return {
            esValido: false,
            pista,
            rangoEsperado: { min: 0, max: 0 },
            mensaje: `Género '${pista.genero}' no soportado.`
        };
    }

    const esValido = pista.bpm >= rango.min && pista.bpm <= rango.max;

    return {
        esValido,
        pista,
        rangoEsperado: rango,
        mensaje: esValido
            ? `El BPM (${pista.bpm}) es válido para el género ${pista.genero}.`
            : `BPM fuera de rango. Se esperaba entre ${rango.min} y ${rango.max} BPM para ${pista.genero}, pero se recibió ${pista.bpm}.`
    };
}

export function obtenerPistasFueraDeRango(pistas: PistaMusical[]): ResultadoValidacionBPM[] {
    if (!Array.isArray(pistas) || pistas.length === 0) return [];

    return pistas
        .map((pista) => validarBPM(pista))
        .filter((resultado) => !resultado.esValido);
}

// Alias por compatibilidad
export const calcularResultado = obtenerPistasFueraDeRango;