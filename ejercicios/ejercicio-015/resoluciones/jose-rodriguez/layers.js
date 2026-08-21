export function normalizarCapasVisibles(capas) {
    if (!Array.isArray(capas)) return [];

    return capas
        .filter(capa => Boolean(capa?.visible))
        .map(capa => {
            const nombreLimpio = String(capa?.nombre || '').trim();
            let opacidad = Number(capa?.opacidad);

            if (isNaN(opacidad)) opacidad = 100;
            opacidad = Math.max(0, Math.min(100, opacidad));

            return {
                ...capa,
                nombre: nombreLimpio,
                opacidad
            };
        });
}

