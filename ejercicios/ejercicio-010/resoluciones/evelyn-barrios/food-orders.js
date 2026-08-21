/**
 * Calcula el monto total de una lista de pedidos, considerando solo aquellos con estados válidos.
 *
 * @param {object[]} orders - Un array de objetos de pedido.
 * @param {number} orders[].total - El monto total del pedido.
 * @param {string} orders[].status - El estado actual del pedido.
 * @param {string[]} validStatuses - Un array de strings con los estados que deben ser incluidos en el cálculo.
 * @returns {number} El monto total de los pedidos válidos.
 */
export function calculateTotal(orders, validStatuses) {
  return orders
    .filter(order => validStatuses.includes(order.status))
    .reduce((sum, order) => sum + order.total, 0);
}
