export function contarAtomos(formula) {
    if (typeof formula !== 'string' || !formula.trim()) return {};

    const regexElemento = /([A-Z][a-z]*)(\d*)/g;
    const conteo = {};
    let coincidencia;

    while ((coincidencia = regexElemento.exec(formula.trim())) !== null) {
        const [, elemento, cantidadStr] = coincidencia;
        const cantidad = cantidadStr === '' ? 1 : parseInt(cantidadStr, 10);

        conteo[elemento] = (conteo[elemento] || 0) + cantidad;
    }

    return conteo;
}

