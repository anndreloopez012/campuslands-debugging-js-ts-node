export type Talla = 'XS' | 'S' | 'M' | 'L' | 'XL';

export type Producto = {
  nombre: string;
  talla: Talla;
  stock: number;
};

export function tieneStock(producto: Producto): boolean {
  return producto.stock > 0;
}

export function obtenerStockTotal(productos: Producto[]): number {
  return productos.reduce((total, producto) => total + producto.stock, 0);
}
