export function calcularTotalHoras(sesiones) {
    if (!Array.isArray(sesiones)) return 0;
    return sesiones.reduce((total, sesion) => total + (Number(sesion?.duracionHoras) || 0), 0);
}


export function validarAgendaTatuajes(sesiones, maxHorasPorDia = 8) {
    if (!Array.isArray(sesiones)) return false;

    const totalHoras = calcularTotalHoras(sesiones);
    if (totalHoras > maxHorasPorDia) return false;

    // Ordenar sesiones por hora de inicio
    const sesionesOrdenadas = [...sesiones].sort((a, b) => (a.horaInicio || 0) - (b.horaInicio || 0));

    // Verificar solapamientos entre sesiones consecutivas
    for (let i = 0; i < sesionesOrdenadas.length - 1; i++) {
        const sesionActual = sesionesOrdenadas[i];
        const siguienteSesion = sesionesOrdenadas[i + 1];

        const finActual = (Number(sesionActual.horaInicio) || 0) + (Number(sesionActual.duracionHoras) || 0);
        const inicioSiguiente = Number(siguienteSesion.horaInicio) || 0;

        if (finActual > inicioSiguiente) {
            return false; // Existe solapamiento horario
        }
    }

    return true;
}

