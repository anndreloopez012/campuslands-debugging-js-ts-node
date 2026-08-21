// Se define un tipo estricto para las tallas válidas.
export type Talla = 'S' | 'M' | 'L' | 'XL';

export type Producto = {
  nombre: string;
  // Se usa un Record para modelar el stock, permitiendo un acceso
  // eficiente y seguro por tipo a cada talla.
  stock: Record<Talla, number>;
};

const inventario: Producto[] = [];

export function agregarProducto(producto: Producto): void {
  const productoExistente = inventario.find(p => p.nombre === producto.nombre);

  // Si el producto ya existe, se actualiza el stock en lugar de crear un duplicado.
  if (productoExistente) {
    for (const talla in producto.stock) {
      const t = talla as Talla;
      productoExistente.stock[t] = (productoExistente.stock[t] || 0) + producto.stock[t];
    }
  } else {
    inventario.push(producto);
  }
}

export function obtenerStock(nombreProducto: string, talla: Talla): number {
  const producto = inventario.find(p => p.nombre === nombreProducto);
  // Se devuelve el stock de la talla específica, o 0 si el producto o la talla no existen.
  // Se usa optional chaining (?.) y nullish coalescing (??) para un acceso seguro.
  return producto?.stock[talla] ?? 0;
}

export function resetearInventario(): void {
  inventario.length = 0;
}
