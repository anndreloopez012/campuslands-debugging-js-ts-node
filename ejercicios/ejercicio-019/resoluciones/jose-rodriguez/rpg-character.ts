export interface Atributos {
    fuerza: number;
    agilidad: number;
    inteligencia: number;
}

export interface ItemEquipamiento {
    nombre: string;
    bonusAtaque: number;
}

export interface PersonajeRPG {
    nombre: string;
    clase: string;
    nivel: number;
    atributos: Atributos;
    equipamiento?: ItemEquipamiento[];
}

export function calcularPoderTotal(personaje: PersonajeRPG): number {
    const { fuerza = 0, agilidad = 0, inteligencia = 0 } = personaje.atributos || {};
    const sumaAtributosBase = fuerza + agilidad + inteligencia;
    const poderBase = sumaAtributosBase * (personaje.nivel || 1);

    const bonusEquipamiento = (personaje.equipamiento || []).reduce(
        (total, item) => total + (item.bonusAtaque || 0),
        0
    );

    return poderBase + bonusEquipamiento;
}


export function obtenerPersonajeMasFuerte(personajes: PersonajeRPG[]): PersonajeRPG | undefined {
    if (!personajes || personajes.length === 0) return undefined;

    return [...personajes].sort((a, b) => calcularPoderTotal(b) - calcularPoderTotal(a))[0];
}


export const calcularResultado = calcularPoderTotal;