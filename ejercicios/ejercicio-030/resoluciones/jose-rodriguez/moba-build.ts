export interface ObjetoMOBA {
    id: string;
    nombre: string;
    precio: number;
    esUnico?: boolean;
    categoriaPasiva?: string; // Ej: "Tenacidad", "Vida Porcentual", "Brillo"
}

export interface ResultadoValidacionBuild {
    esValido: boolean;
    totalOro: number;
    razonInvalidez?: string;
    objetosRepetidos?: string[];
    pasivasMapeadas?: string[];
}

/**
 * Valida si la composición de un build MOBA es permitida:
 * - Máximo 6 objetos.
 * - No repetir objetos marcados como únicos (`esUnico: true`).
 * - No duplicar objetos con la misma pasiva única (`categoriaPasiva`).
 */
export function validarBuildMOBA(build: ObjetoMOBA[]): ResultadoValidacionBuild {
    if (!Array.isArray(build)) {
        return { esValido: false, totalOro: 0, razonInvalidez: 'El build debe ser una lista de objetos.' };
    }

    if (build.length > 6) {
        return {
            esValido: false,
            totalOro: build.reduce((acc, item) => acc + item.precio, 0),
            razonInvalidez: 'El build no puede tener más de 6 objetos.'
        };
    }

    const totalOro = build.reduce((acc, item) => acc + item.precio, 0);
    const objetosVistos = new Set<string>();
    const pasivasVistas = new Set<string>();
    const duplicados: string[] = [];

    for (const item of build) {
        // Control de objetos únicos
        if (item.esUnico) {
            if (objetosVistos.has(item.id)) {
                duplicados.push(item.nombre);
            } else {
                objetosVistos.add(item.id);
            }
        }

        // Control de pasivas únicas
        if (item.categoriaPasiva) {
            if (pasivasVistas.has(item.categoriaPasiva)) {
                return {
                    esValido: false,
                    totalOro,
                    razonInvalidez: `Conflicto de pasiva única repetida: ${item.categoriaPasiva}`,
                    objetosRepetidos: [item.nombre]
                };
            }
            pasivasVistas.add(item.categoriaPasiva);
        }
    }

    if (duplicados.length > 0) {
        return {
            esValido: false,
            totalOro,
            razonInvalidez: `Contiene objetos únicos duplicados: ${duplicados.join(', ')}`,
            objetosRepetidos: duplicados
        };
    }

    return {
        esValido: true,
        totalOro,
        pasivasMapeadas: Array.from(pasivasVistas)
    };
}
