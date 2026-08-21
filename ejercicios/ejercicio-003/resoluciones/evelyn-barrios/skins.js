/**
 * Aplica un descuento a un precio y redondea el resultado a dos decimales.
 *
 * @param {number} price - El precio original.
 * @param {number} discountPercentage - El porcentaje de descuento a aplicar (e.g., 15 para 15%).
 * @returns {number} El nuevo precio con el descuento aplicado y redondeado.
 */
export function applyDiscount(price, discountPercentage) {
  // El bug original podría no calcular bien el porcentaje o no redondear.
  const discountMultiplier = 1 - (discountPercentage / 100);
  const discountedPrice = price * discountMultiplier;

  // Se redondea a 2 decimales para evitar problemas de punto flotante.
  return Math.round(discountedPrice * 100) / 100;
}