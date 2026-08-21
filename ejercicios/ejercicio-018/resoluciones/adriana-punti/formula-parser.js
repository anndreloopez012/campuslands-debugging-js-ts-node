export function parsearFormula(formula) {
  const atomos = {};

  const partes = formula.match(/[A-Z][a-z]?\d*/g) || [];

  partes.forEach((parte) => {
    const coincidencia = parte.match(/^([A-Z][a-z]?)(\d*)$/);

    const simbolo = coincidencia[1];
    const cantidad = coincidencia[2] === '' ? 1 : Number(coincidencia[2]);

    atomos[simbolo] = (atomos[simbolo] || 0) + cantidad;
  });

  return atomos;
}

export function contarAtomos(formula) {
  const atomos = parsearFormula(formula);

  return Object.values(atomos).reduce(
    (total, cantidad) => total + cantidad,
    0
  );
}