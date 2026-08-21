export function calcularTiempoVueltaConPenalizacion(tiempoBaseSegundos, penalizacionSegundos = 0) {
    const base = Number(tiempoBaseSegundos) || 0;
    const penalizacion = Number(penalizacionSegundos) || 0;
    return base + penalizacion;
}

export function calcularTiempoTotalCarrera(vueltas) {
    if (!Array.isArray(vueltas)) return 0;

    return vueltas.reduce((acumulado, vuelta) => {
        const tiempoConPenalizacion = calcularTiempoVueltaConPenalizacion(
            vuelta?.tiempoVuelta,
            vuelta?.penalizacion
        );
        return acumulado + tiempoConPenalizacion;
    }, 0);
}

// Alias por compatibilidad
export const calcularResultado = calcularTiempoTotalCarrera;