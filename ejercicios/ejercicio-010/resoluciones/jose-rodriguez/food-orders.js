export function calcularTotalPedidosValidos(pedidos, estadoValido = 'completado') {
    if (!Array.isArray(pedidos)) return 0;

    const total = pedidos.reduce((acumulado, pedido) => {
        if (pedido && pedido.estado === estadoValido) {
            return acumulado + (Number(pedido.total) || 0);
        }
        return acumulado;
    }, 0);

    return Number(total.toFixed(2));
}

export function filtrarPedidosPorEstado(pedidos, estadosPermitidos = ['completado', 'enviado']) {
    if (!Array.isArray(pedidos) || !Array.isArray(estadosPermitidos)) return [];

    return pedidos.filter(pedido => pedido && estadosPermitidos.includes(pedido.estado));
}