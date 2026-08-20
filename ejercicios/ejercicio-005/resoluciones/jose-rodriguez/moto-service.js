
export function requiereMantenimiento(kilometrajeActual, limiteMantenimiento = 5000) {
    if (typeof kilometrajeActual !== 'number' || kilometrajeActual < 0) {
        throw new Error('El kilometraje debe ser un número válido mayor o igual a 0');
    }
    return kilometrajeActual >= limiteMantenimiento;
}

export function obtenerMotosConServiceVencido(motos) {
    if (!Array.isArray(motos)) return [];

    return motos.filter(moto => {
        if (moto.kilometraje === undefined || moto.proximoService === undefined) {
            return false;
        }
        return moto.kilometraje >= moto.proximoService;
    });
}