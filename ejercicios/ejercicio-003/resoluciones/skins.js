export function aplicarDescuento(precioBase, porcentajeDescuento) {
  if (precioBase < 0 || porcentajeDescuento < 0 || porcentajeDescuento > 100) {
    throw new Error('Valores de precio o descuento invalidos');
  }
  const descuento = precioBase * (porcentajeDescuento / 100);
  const precioFinal = precioBase - descuento;
  return Number(precioFinal.toFixed(2));
}

export function calcularTotalTienda(skins) {
  const total = skins.reduce((acumulado, skin) => {
    const precioConDescuento = aplicarDescuento(skins.precio, skin.descuento || 0);
    return acumulado + precioConDescuento;
  }, 0);

  return Number(total.toFixed(2));
}