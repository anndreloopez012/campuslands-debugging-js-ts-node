export interface Material3D {
    nombre: string;
    costoUnidad: number;
    cantidad: number;
    incluirEnPresupuesto?: boolean;
}

export interface PresupuestoArquitectura {
    limitePresupuesto: number;
    materiales: Material3D[];
}

export function calcularCostoTotal(materiales: Material3D[]): number {
    if (!materiales || materiales.length === 0) return 0;

    const materialesActivos = materiales.filter(
        (mat) => mat.incluirEnPresupuesto !== false
    );

    return materialesActivos.reduce(
        (total, mat) => total + mat.costoUnidad * mat.cantidad,
        0
    );
}

export function validarPresupuesto(
    proyecto: PresupuestoArquitectura
): { dentroDePresupuesto: boolean; costoTotal: number; diferencia: number } {
    const costoTotal = calcularCostoTotal(proyecto.materiales || []);
    const diferencia = proyecto.limitePresupuesto - costoTotal;

    return {
        dentroDePresupuesto: costoTotal <= proyecto.limitePresupuesto,
        costoTotal,
        diferencia
    };
}
