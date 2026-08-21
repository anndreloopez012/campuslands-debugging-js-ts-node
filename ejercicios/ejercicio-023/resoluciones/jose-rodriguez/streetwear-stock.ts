export type TallaStreetwear = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface PrendaStreetwear {
    id: string;
    nombre: string;
    talla: TallaStreetwear;
    stock: number;
    activo?: boolean;
}

export function calcularStockTotal(prendas: PrendaStreetwear[]): number {
    if (!Array.isArray(prendas) || prendas.length === 0) return 0;

    const activas = prendas.filter((prenda) => prenda.activo !== false);
    return activas.reduce((total, prenda) => total + Math.max(0, prenda.stock), 0);
}

export function obtenerPrendasPorTalla(
    prendas: PrendaStreetwear[],
    talla: TallaStreetwear
): PrendaStreetwear[] {
    if (!Array.isArray(prendas)) return [];

    return prendas.filter(
        (prenda) =>
            prenda.talla === talla &&
            prenda.activo !== false &&
            prenda.stock > 0
    );
}

