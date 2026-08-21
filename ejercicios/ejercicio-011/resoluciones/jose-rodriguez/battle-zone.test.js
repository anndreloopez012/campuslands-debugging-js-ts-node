import { describe, expect, it } from 'vitest';
import { obtenerSobrevivientes, estaEnZonaSegura } from './battle-zone.js';

describe('ejercicio 011 - Battle royale', () => {
    it('filtra y retorna únicamente los jugadores con salud mayor a 0', () => {
        const jugadores = [
            { nombre: 'Ninja', salud: 100 },
            { nombre: 'Shroud', salud: 0 },
            { nombre: 'Akuraz', salud: 45 }
        ];

        const sobrevivientes = obtenerSobrevivientes(jugadores);
        expect(sobrevivientes).toHaveLength(2);
        expect(sobrevivientes.map(j => j.nombre)).toEqual(['Ninja', 'Akuraz']);
    });

    it('evalua correctamente si un jugador esta dentro o fuera del radio de la zona segura', () => {
        const radioSeguro = 100;

        expect(estaEnZonaSegura({ x: 30, y: 40 }, radioSeguro)).toBe(true);  // Distancia = 50
        expect(estaEnZonaSegura({ x: 80, y: 80 }, radioSeguro)).toBe(false); // Distancia ~113.13
        expect(estaEnZonaSegura({ x: 0, y: 100 }, radioSeguro)).toBe(true);  // En el borde exacto
    });
});