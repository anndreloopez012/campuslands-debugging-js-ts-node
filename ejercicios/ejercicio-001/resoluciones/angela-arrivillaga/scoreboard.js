export function calcularResultado(datos) {
    // Sumamos los puntos usando reduce en lugar de concatenar texto
    return datos.reduce((acumulado, item) => acumulado + item.puntos, 0);
  }
  
  export function ordenarRanking(jugadores) {
    // Orden descendente (de mayor a menor puntaje) restando b - a
    return [...jugadores].sort((a, b) => b.puntos - a.puntos);
  }