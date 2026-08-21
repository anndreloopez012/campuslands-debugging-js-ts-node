export function calcularTiempoTotal(vueltas) {
  return vueltas.reduce((total, vuelta) => {
    return total + vuelta.tiempo + (vuelta.penalizacion || 0);
  }, 0);
}

export function ordenarRanking(corredores) {
  return [...corredores].sort((a, b) => a.tiempoTotal - b.tiempoTotal);
}
