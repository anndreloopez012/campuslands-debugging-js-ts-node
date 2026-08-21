export interface AutoLujo {
    id: string;
    marca: string;
    modelo: string;
    potenciaHP: number;
    precioUSD: number;
}

export interface AutoLujoConRatio extends AutoLujo {
    ratioPotenciaPrecio: number; // HP por cada 1,000 USD
}

export function calcularRatioPotenciaPrecio(auto: AutoLujo): number {
    if (!auto || auto.precioUSD <= 0) return 0;

    const ratio = (auto.potenciaHP / auto.precioUSD) * 1000;
    return Number(ratio.toFixed(2));
}

export function ordenarCatalogoPorPotenciaPrecio(catalogo: AutoLujo[]): AutoLujoConRatio[] {
    if (!Array.isArray(catalogo) || catalogo.length === 0) return [];

    const catalogoConRatio: AutoLujoConRatio[] = catalogo.map((auto) => ({
        ...auto,
        ratioPotenciaPrecio: calcularRatioPotenciaPrecio(auto)
    }));

    return catalogoConRatio.sort((a, b) => {
        if (b.ratioPotenciaPrecio !== a.ratioPotenciaPrecio) {
            return b.ratioPotenciaPrecio - a.ratioPotenciaPrecio;
        }
        return b.potenciaHP - a.potenciaHP;
    });
}

