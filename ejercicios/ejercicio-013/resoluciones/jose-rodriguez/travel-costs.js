export function agruparGastosPorCiudad(gastos) {
    if (!Array.isArray(gastos)) return {};

    return gastos.reduce((acumulador, gasto) => {
        const ciudad = gasto?.ciudad?.trim();
        const monto = Number(gasto?.monto) || 0;

        if (!ciudad) return acumulador;
        acumulador[ciudad] = (acumulador[ciudad] || 0) + monto;

        return acumulador;
    }, {});
}
