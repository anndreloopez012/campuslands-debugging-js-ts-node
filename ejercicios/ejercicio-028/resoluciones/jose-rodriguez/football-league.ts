export interface EquipoFutbol {
    id: string;
    nombre: string;
    ganados: number;
    empatados: number;
    perdidos: number;
    golesAFavor: number;
    golesEnContra: number;
}

export interface ClasificacionEquipo extends EquipoFutbol {
    partidosJugados: number;
    diferenciaGoles: number;
    puntos: number;
}

export function calcularEstadisticasEquipo(equipo: EquipoFutbol): ClasificacionEquipo {
    const partidosJugados = equipo.ganados + equipo.empatados + equipo.perdidos;
    const puntos = equipo.ganados * 3 + equipo.empatados * 1;
    const diferenciaGoles = equipo.golesAFavor - equipo.golesEnContra;

    return {
        ...equipo,
        partidosJugados,
        diferenciaGoles,
        puntos
    };
}

export function ordenarTablaPosiciones(equipos: EquipoFutbol[]): ClasificacionEquipo[] {
    if (!Array.isArray(equipos) || equipos.length === 0) return [];

    const tablaConMetricas = equipos.map((e) => calcularEstadisticasEquipo(e));

    return tablaConMetricas.sort((a, b) => {
        if (b.puntos !== a.puntos) {
            return b.puntos - a.puntos;
        }
        if (b.diferenciaGoles !== a.diferenciaGoles) {
            return b.diferenciaGoles - a.diferenciaGoles;
        }
        if (b.golesAFavor !== a.golesAFavor) {
            return b.golesAFavor - a.golesAFavor;
        }
        return a.nombre.localeCompare(b.nombre);
    });
}

// Alias por compatibilidad
export const calcularResultado = ordenarTablaPosiciones;