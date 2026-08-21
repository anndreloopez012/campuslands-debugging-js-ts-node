
export function calcularTotalPedidosValidos(pedidos) {
  if (!Array.isArray(pedidos)) return 0;

  return pedidos
    .filter(pedido => String(pedido?.estado).toLowerCase() !== 'cancelado')
    .reduce((acumulado, pedido) => {
      const monto = Number(pedido?.total) || 0;
      return acumulado + monto;
    }, 0);
}

export function calcularTotalConIva(subtotal, porcentajeIva = 19) {
  const monto = Number(subtotal) || 0;
  const porcentaje = Number(porcentajeIva) || 0;

  const total = monto * (1 + porcentaje / 100);
  return Number(total.toFixed(2));
}

export const calcularResultado = calcularTotalPedidosValidos;