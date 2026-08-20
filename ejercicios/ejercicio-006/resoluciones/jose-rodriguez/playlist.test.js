import { describe, expect, it } from 'vitest';
import { filtrarPorEnergia, calcularDuracionTotal } from './playlist.js';

describe('ejercicio 006 - playlist de entrenamiento', () => {
    it('fitra las canciones por ejergia minima sin perder propiedades del objeto', () => {
        const canciones = [
            { titulo: 'Power Up', energia: 80, duracionSegundos: 200 },
            { titulo: 'Chill Beat', energia: 40, duracionSegundos: 180 },
            { titulo: 'Sprint High', energia: 95, duracionSegundos: 210 }
        ];

        const resultado = filtrarPorEnergia(canciones, 75);

        expect(resultado).toHaveLength(2);
        expect(resultado[0]).toEqual({ titulo: 'Power Up', energia: 80, duracionSegundos: 200 });
        expect(resultado[1]).toEqual({ titulo: 'Sprint High', energia: 95, duracionSegundos: 210 });
    });

    it('calcula correctamente la duracion total en segundo de la playlist', () => {
        const playlist = [
            { titulo: 'Track 1', duracionSegundos: 150 },
            { titulo: 'Track 2', duracionSegundos: 180 },
            { titulo: 'Track 3', duracionSegundos: 120 }
        ];

        const duracionTotal = calcularDuracionTotal(playlist);
        expect(duracionTotal).toBe(450);
    });
});