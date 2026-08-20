export function obtenerGanadorHorror(peliculas) {
    if (!Array.isArray(peliculas) || peliculas.length === 0) {
        return { ganadores: [], esEmpate: false };
    }

    // 1. Obtener el número máximo de votos presentes
    const maxVotos = Math.max(...peliculas.map(p => Number(p?.votos) || 0));

    // 2. Filtrar las películas que alcanzaron esa puntuación máxima
    const ganadores = peliculas
        .filter(p => (Number(p?.votos) || 0) === maxVotos)
        .map(p => p.titulo);

    return {
        ganadores,
        esEmpate: ganadores.length > 1
    };
}
