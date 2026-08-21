/**
 * Agrupa y suma los gastos de viaje por ciudad.
 *
 * @param {object[]} expenses - Un array de objetos de gastos.
 * @param {string} expenses[].city - La ciudad donde se realizó el gasto.
 * @param {number} expenses[].amount - El monto del gasto.
 * @returns {object} Un objeto donde las claves son las ciudades y los valores son la suma total de gastos para esa ciudad.
 */
export function groupExpensesByCity(expenses) {
  return expenses.reduce((acc, expense) => {
    const { city, amount } = expense;
    // Si la ciudad ya existe en el acumulador, suma el nuevo monto. Si no, inicialízala.
    acc[city] = (acc[city] || 0) + amount;
    return acc;
  }, {});
}