import { describe, expect, it } from 'vitest';
import {
    calcularEstadisticasEquipo,
    ordenarTablaPosiciones,
    EquipoFutbol
} from './football-league';

describe('ejercicio 028 - Fútbol', () => {
    it('calcula correctamente puntos y diferencia de goles para un equipo', () => {
        const equipo: EquipoFutbol = {
            id: '1',
            nombre: 'Real Madrid',
            ganados: 10,
            empatados: 2,
            perdidos: 1,
            golesAFavor: 30,
            golesEnContra: 10
        };

        const stats = calcularEstadisticasEquipo(equipo);

        expect(stats.puntos).toBe(32); 
        expect(stats.diferenciaGoles).toBe(20);
        expect(stats.partidosJugados).toBe(13);
    });

    it('ordena la tabla de posiciones aplicando criterios de desempate correctamente', () => {
        const equipos: EquipoFutbol[] = [
            {
                id: '1',
                nombre: 'Barcelona',
                ganados: 5,
                empatados: 1,
                perdidos: 0,
                golesAFavor: 15,
                golesEnContra: 5
            }, 
            {
                id: '2',
                nombre: 'Atletico',
                ganados: 5,
                empatados: 1,
                perdidos: 0,
                golesAFavor: 18,
                golesEnContra: 8
            }  
        ];

        const tabla = ordenarTablaPosiciones(equipos);

        expect(tabla[0].nombre).toBe('Atletico'); // Mismos puntos y DG, pero más goles a favor
        expect(tabla[1].nombre).toBe('Barcelona');
    });
});