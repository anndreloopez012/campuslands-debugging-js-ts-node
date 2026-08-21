/**
 * Parsea una fórmula química y devuelve un objeto con el recuento de cada átomo.
 *
 * @param {string} formula - La fórmula química como string.
 * @returns {object} Un objeto con los átomos como claves y su recuento como valores.
 */
export function parseFormula(formula) {
  const stack = [{}];
  let i = 0;
  while (i < formula.length) {
    if (formula[i] === '(' || formula[i] === '[') {
      stack.push({});
      i++;
    } else if (formula[i] === ')' || formula[i] === ']') {
      const top = stack.pop();
      i++;
      const multiplier = parseInt(formula.slice(i).match(/^\d+/)?.[0] || '1');
      i += (multiplier > 1 ? Math.floor(Math.log10(multiplier)) + 1 : 0);
      for (const atom in top) stack[stack.length - 1][atom] = (stack[stack.length - 1][atom] || 0) + top[atom] * multiplier;
    } else {
      const match = formula.slice(i).match(/^([A-Z][a-z]?)(\d*)/);
      const [element, atom, countStr] = match;
      const count = countStr ? parseInt(countStr) : 1;
      stack[stack.length - 1][atom] = (stack[stack.length - 1][atom] || 0) + count;
      i += element.length;
    }
  }
  return stack[0];
}