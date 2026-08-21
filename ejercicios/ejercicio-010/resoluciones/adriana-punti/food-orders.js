export function totalizarPedidos(pedidos) {
  return pedidos
    .filter((pedido) => pedido.estado === 'confirmado')
    .reduce((total, pedido) => total + pedido.precio, 0);
}
