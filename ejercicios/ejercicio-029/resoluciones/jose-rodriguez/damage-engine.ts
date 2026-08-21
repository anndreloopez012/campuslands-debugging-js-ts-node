export interface Disparo {
    danoBase: number;
    distanciaMetros: number;
    esCabeza?: boolean;
}

export interface Objetivo {
    salud: number;
    armadura: number; 
    maxArmadura?: number;
}

export interface ResultadoImpacto {
    danoEfectivo: number;
    saludRestante: number;
    armaduraRestante: number;
    eliminado: boolean;
}

export function calcularDanoPorDistancia(danoBase: number, distanciaMetros: number): number {
    if (distanciaMetros <= 15) return danoBase;
    if (distanciaMetros <= 30) return danoBase * 0.85; // Reducción del 15%
    if (distanciaMetros <= 50) return danoBase * 0.70; // Reducción del 30%
    return danoBase * 0.50; // Reducción del 50% a larga distancia
}

export function resolverImpacto(disparo: Disparo, objetivo: Objetivo): ResultadoImpacto {
    let danoCalculado = calcularDanoPorDistancia(disparo.danoBase, disparo.distanciaMetros);

    // Multiplicador por disparo a la cabeza (Headshot: 2x)
    if (disparo.esCabeza) {
        danoCalculado *= 2;
    }

    const porcentajeArmadura = Math.min(Math.max(objetivo.armadura, 0), 100) / 100;
    const danoAbsorbido = danoCalculado * porcentajeArmadura;
    const danoEfectivo = danoCalculado - danoAbsorbido;


    const desgasteArmadura = danoAbsorbido * 0.5;
    const armaduraRestante = Math.max(0, objetivo.armadura - desgasteArmadura);

    const saludRestante = Math.max(0, objetivo.salud - danoEfectivo);

    return {
        danoEfectivo: Number(danoEfectivo.toFixed(2)),
        saludRestante: Number(saludRestante.toFixed(2)),
        armaduraRestante: Number(armaduraRestante.toFixed(2)),
        eliminado: saludRestante === 0
    };
}

