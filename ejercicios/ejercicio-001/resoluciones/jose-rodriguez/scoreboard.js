export function calcularResultado(datos) {
let total = 0;
datos.forEach(item => {
    total += parseInt(item.puntos, 10);
});
    return total;
}

export function ordenarRanking(jugadores) {
return [...jugadores].sort((a, b) => parseInt(b.puntos, 10) - parseInt(a.puntos, 10));} 