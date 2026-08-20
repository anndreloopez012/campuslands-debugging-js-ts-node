export function filtrarPorEnergia(canciones, nivelMinimo = 0) {
    if (!Array.isArray(canciones)) return [];

    const minEnergia = Number(nivelMinimo) || 0;

    return canciones
        .filter(cancion => {
            const energia = Number(cancion?.energia) || 0;
            return energia >= minEnergia;
        })
        .map(cancion => ({ ...cancion }));
}


export function calcularDuracionTotal(canciones) {
    if (!Array.isArray(canciones)) return 0;

    return canciones.reduce((acumulado, cancion) => {
        const duracion = Number(cancion?.duracionSegundos) || 0;
        return acumulado + duracion;
    }, 0);
}
