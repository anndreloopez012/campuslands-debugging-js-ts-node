/**
 * @param {object} inventory - El inventario del personaje.
 * @param {string[]} inventory.potions - Las pociones en el inventario.
 * @param {string} potion - La poción a agregar.
 * @returns {object} Un **nuevo** objeto de inventario con la poción agregada, sin mutar el original.
 */
export function addPotion(inventory, potion) {
  // El bug original mutaba el inventario. La corrección crea una copia para no alterarlo.
  const newPotions = [...inventory.potions, potion];
  const newInventory = { ...inventory, potions: newPotions };
  return newInventory;
}
