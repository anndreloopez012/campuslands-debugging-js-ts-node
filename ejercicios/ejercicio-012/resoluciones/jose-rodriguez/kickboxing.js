export function calcularPuntajeTotal(tarjetas) {
    if (!Array.isArray(tarjetas)) return 0;
    return tarjetas.reduce((acumulado, puntos) => acumulado + (Number(puntos) || 0), 0);
}

export function determinarGanadorKickboxing(combate) {
    const puntajeRojo = calcularPuntajeTotal(combate?.peleadorRojo?.tarjetas);
    const puntajeAzul = calcularPuntajeTotal(combate?.peleadorAzul?.tarjetas);

    let ganador = 'Empate';
    let empate = false;

    if (puntajeRojo > puntajeAzul) {
        ganador = combate?.peleadorRojo?.nombre || 'Rojo';
    } else if (puntajeAzul > puntajeRojo) {
        ganador = combate?.peleadorAzul?.nombre || 'Azul';
    } else {
        empate = true;
    }

    return {
        ganador,
        empate,
        puntajeRojo,
        puntajeAzul
    };
}
