import { describe, expect, it } from 'vitest';
import { requiereMantenimiento, obtenerMotosConServiceVencido } from './moto-service.js';

describe('ejercicio 005 - Motos en Taller (Validación de Kilometraje)', () => {
    it('identifica correctamente si una moto requiere mantenimiento por kilometraje', () => {
        expect(requiereMantenimiento(5200, 5000)).toBe(true);
        expect(requiereMantenimiento(3000, 5000)).toBe(false);
    });

    it('devuelve únicamente las motos con mantenimiento vencido', () => {
        const inventarioTaller = [
            { placa: 'ABC-123', kilometraje: 15500, proximoService: 15000 },
            { placa: 'XYZ-789', kilometraje: 8000, proximoService: 10000 },
            { placa: 'DEF-456', kilometraje: 20100, proximoService: 20000 }
        ];

        const vencidas = obtenerMotosConServiceVencido(inventarioTaller);

        expect(vencidas).toHaveLength(2);
        expect(vencidas.map(m => m.placa)).toEqual(['ABC-123', 'DEF-456']);
    });
});