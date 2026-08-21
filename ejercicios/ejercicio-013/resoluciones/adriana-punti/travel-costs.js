export function agruparGastosPorCiudad(gastos) {
  return gastos.reduce((resultado, gasto) => {
    if (!resultado[gasto.ciudad]) {
      resultado[gasto.ciudad] = 0;
    }

    resultado[gasto.ciudad] += gasto.monto;

    return resultado;
  }, {});
}