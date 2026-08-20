export function convertirMphAKmh(mph) {
    const valorMph = Number(mph) || 0;
    const kmh = valorMph * 1.609344;
    return Number(kmh.toFixed(2));
}
export function ordenarPorVelocidad(autos) {
    if (!Array.isArray(autos)) return [];

    return [...autos].sort((a, b) => {
        const velA = Number(a.velocidadMph) || 0;
        const velB = Number(b.velocidadMph) || 0;
        return velB - velA;
    });
}