import { describe, expect, it } from 'vitest';
import { calcularProgresoLibro, calcularProgresoSaga, Libro } from './book-progress';

describe('ejercicio 026 - Libros', () => {
    it('calcula el porcentaje de progreso de un libro de forma precisa', () => {
        const libro: Libro = {
            id: '1',
            titulo: 'La Piedra Filosofal',
            saga: 'Harry Potter',
            paginasTotales: 300,
            paginasLeidas: 150
        };

        expect(calcularProgresoLibro(libro)).toBe(50);
    });

    it('calcula el progreso total acumulado y estadísticas de una saga', () => {
        const biblioteca: Libro[] = [
            { id: '1', titulo: 'El Hobit', saga: 'ESDLA', paginasTotales: 300, paginasLeidas: 300 },
            { id: '2', titulo: 'La Comunidad del Anillo', saga: 'ESDLA', paginasTotales: 500, paginasLeidas: 250 },
            { id: '3', titulo: 'Dune', saga: 'Dune', paginasTotales: 600, paginasLeidas: 100 }
        ];

        const resultado = calcularProgresoSaga(biblioteca, 'ESDLA');

        expect(resultado.totalLibros).toBe(2);
        expect(resultado.librosCompletados).toBe(1);
        expect(resultado.porcentajeProgreso).toBe(68.75); // (550 / 800) * 100
    });
});