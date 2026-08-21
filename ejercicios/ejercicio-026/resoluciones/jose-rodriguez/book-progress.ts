export interface Libro {
    id: string;
    titulo: string;
    saga: string;
    paginasTotales: number;
    paginasLeidas: number;
}

export interface ProgresoSaga {
    saga: string;
    porcentajeProgreso: number;
    librosCompletados: number;
    totalLibros: number;
}

export function calcularProgresoLibro(libro: Libro): number {
    if (!libro || libro.paginasTotales <= 0) return 0;

    const leidas = Math.min(libro.paginasLeidas, libro.paginasTotales);
    const porcentaje = (leidas / libro.paginasTotales) * 100;

    return Number(porcentaje.toFixed(2));
}

export function calcularProgresoSaga(
    libros: Libro[],
    nombreSaga: string
): ProgresoSaga {
    const librosSaga = (libros || []).filter(
        (libro) => libro.saga.toLowerCase() === nombreSaga.toLowerCase()
    );

    if (librosSaga.length === 0) {
        return {
            saga: nombreSaga,
            porcentajeProgreso: 0,
            librosCompletados: 0,
            totalLibros: 0
        };
    }

    let totalPaginas = 0;
    let totalLeidas = 0;
    let completados = 0;

    for (const libro of librosSaga) {
        totalPaginas += libro.paginasTotales;
        totalLeidas += Math.min(libro.paginasLeidas, libro.paginasTotales);
        if (libro.paginasLeidas >= libro.paginasTotales) {
            completados++;
        }
    }

    const porcentaje = totalPaginas > 0 ? (totalLeidas / totalPaginas) * 100 : 0;

    return {
        saga: nombreSaga,
        porcentajeProgreso: Number(porcentaje.toFixed(2)),
        librosCompletados: completados,
        totalLibros: librosSaga.length
    };
}

