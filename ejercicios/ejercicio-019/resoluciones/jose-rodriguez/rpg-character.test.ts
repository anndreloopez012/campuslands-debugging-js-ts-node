import { describe, expect, it } from 'vitest';
import {
    calcularPoderTotal,
    obtenerPersonajeMasFuerte,
    PersonajeRPG
} from './rpg-character';

describe('ejercicio 019 - Personajes RPG', () => {
    it('calcula el poder total incluyendo nivel, atributos y bonus de equipamiento', () => {
        const guerrero: PersonajeRPG = {
            nombre: 'Thorin',
            clase: 'Guerrero',
            nivel: 5,
            atributos: { fuerza: 10, agilidad: 5, inteligencia: 2 }, // Suma = 17 * 5 = 85
            equipamiento: [
                { nombre: 'Espada de Hierro', bonusAtaque: 15 },
                { nombre: 'Escudo', bonusAtaque: 5 }
            ] // Bonus = 20
        };

        expect(calcularPoderTotal(guerrero)).toBe(105);
    });

    it('obtiene el personaje más fuerte de la lista', () => {
        const mage: PersonajeRPG = {
            nombre: 'Gandalf',
            clase: 'Mago',
            nivel: 10,
            atributos: { fuerza: 2, agilidad: 4, inteligencia: 20 }
        };

        const rogue: PersonajeRPG = {
            nombre: 'Loki',
            clase: 'Pícaro',
            nivel: 3,
            atributos: { fuerza: 4, agilidad: 12, inteligencia: 5 }
        };

        const resultado = obtenerPersonajeMasFuerte([rogue, mage]);
        expect(resultado?.nombre).toBe('Gandalf');
    });
});