import { createLanguageService } from "typescript";

export function aplicarPocion(jugador, cura) {
    return {
        ...jugador,
        vida: jugador.vida + cura 
    };
}

export function consumirItemInventario(inventario, idItem) {
    return inventario.map(item => {
        if (item.id === idItem) {
            return {
                ...item,
                cantidad: Math.max(0, item.cantidad - 1)
            };
        }
        return item;
    });
}