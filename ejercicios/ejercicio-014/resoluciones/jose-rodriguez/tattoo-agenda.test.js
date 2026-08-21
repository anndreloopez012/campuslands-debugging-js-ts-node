import { describe, expect, it } from 'vitest';
import { calcularTotalHoras, validarAgendaTatuajes } from './tattoo-agenda.js';

describe('ejercicio 014 - Tatuajes', () => {
    it('calcula correctamente las horas totales acumuladas de las sesiones', () => {
        const sesiones = [
            { cliente: 'Carlos', duracionHoras: 3 },
            { cliente: 'Ana', duracionHoras: 2 }
        ];
        expect(calcularTotalHoras(sesiones)).toBe(5);
    });

    it('rechaza una agenda si supera el limite maximo de horas diarias permitidas', () => {
        const sesiones = [
            { horaInicio: 9, duracionHoras: 5 },
            { horaInicio: 15, duracionHoras: 4 }
        ]; // Total = 9 horas (supera el límite por defecto de 8)

        expect(validarAgendaTatuajes(sesiones, 8)).toBe(false);
    });

    it('detecta solapamientos entre citas programadas', () => {
        const sesionesConSolapamiento = [
            { horaInicio: 10, duracionHoras: 3 }, // Termina a las 13:00
            { horaInicio: 12, duracionHoras: 2 }  // Empieza a las 12:00 (Solapamiento)
        ];

        expect(validarAgendaTatuajes(sesionesConSolapamiento, 8)).toBe(false);
    });

    it('aprueba una agenda sin solapamientos y dentro del limite de tiempo', () => {
        const agendaValida = [
            { horaInicio: 9, duracionHoras: 3 },  // 9:00 a 12:00
            { horaInicio: 13, duracionHoras: 3 }  // 13:00 a 16:00
        ];

        expect(validarAgendaTatuajes(agendaValida, 8)).toBe(true);
    });
});