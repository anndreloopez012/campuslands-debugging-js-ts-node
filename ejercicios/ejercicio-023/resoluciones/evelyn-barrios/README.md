# Ejercicio 023: Depuración de Inventario de Tienda

## 1. Error Encontrado

Al ejecutar las pruebas, se detectaron varios problemas relacionados con el modelado de datos y la lógica de negocio:

1.  El tipo `Talla` era un `string` genérico, permitiendo la creación de productos con tallas inválidas.
2.  La estructura del `stock` (un array de objetos) era ineficiente para buscar y actualizar cantidades.
3.  La función `agregarProducto` no manejaba productos existentes, creando duplicados en el inventario en lugar de actualizar el stock.
4.  La función `obtenerStock` era insegura y propensa a errores en tiempo de ejecución si un producto o talla no se encontraba.

## 2. Causa Raíz

-   **Modelado de Datos Inadecuado:** El uso de `string` para las tallas y un array para el stock es una mala práctica que no aprovecha las ventajas de TypeScript para garantizar la integridad de los datos.
-   **Lógica de Negocio Incompleta:** La función `agregarProducto` no contemplaba el caso de uso más común: reabastecer un producto que ya está en el inventario.

## 3. Cambio Aplicado

-   Se transformó el tipo `Talla` en un tipo de unión (`'S' | 'M' | 'L' | 'XL'`) para restringir los valores a un conjunto válido y conocido.
-   Se rediseñó la propiedad `stock` dentro de `Producto` para que fuera un `Record<Talla, number>`. Esto permite un acceso directo y seguro al stock de cada talla (ej: `producto.stock.M`).
-   Se refactorizó `agregarProducto` para que primero busque si el producto ya existe. Si es así, itera sobre las tallas del nuevo stock y las suma al existente. Si no existe, lo añade al inventario.

    ```typescript
    if (productoExistente) {
      // ...lógica para sumar stock
    } else {
      inventario.push(producto);
    }
    ```

-   Se hizo más robusta la función `obtenerStock` utilizando optional chaining (`?.`) y el operador nullish coalescing (`??`) para devolver `0` de forma segura si el producto o la talla no existen.

    ```typescript
    return producto?.stock[talla] ?? 0;
    ```

## 4. Comando Usado para Validar

Para validar la solución, primero se corrigió el entorno de pruebas (que estaba corrupto) y luego se ejecutó el comando específico del ejercicio:

```bash
npm test -- ejercicios/ejercicio-023/tests/streetwear-stock.test.ts
```

## 5. Resultado Final

Tras aplicar las correcciones, todas las pruebas pasaron, confirmando que el sistema de inventario es ahora más robusto, eficiente y seguro gracias a un mejor modelado de tipos.

```text
 camper@campus-H610M-K-V2:~/campuslands-debugging-js-ts-node-Eve$ npm test -- ejercicios/ejercicio-023/tests/streetwear-stock.test.ts

> campuslands-debugging-js-ts-node@1.0.0 test
> vitest run ejercicios/ejercicio-023/tests/streetwear-stock.test.ts


 RUN  v4.1.10 /home/camper/campuslands-debugging-js-ts-node-Eve

 ✓ ejercicios/ejercicio-023/tests/streetwear-stock.test.ts (3 tests) 3ms
   ✓ ejercicio 023 (3)
     ✓ debería agregar un nuevo producto al inventario y obtener su stock 1ms
     ✓ debería actualizar el stock de un producto existente en lugar de duplicarlo 0ms
     ✓ debería devolver 0 si el producto o la talla no existen en el inventario 0ms

 Test Files  1 passed (1)
      Tests  3 passed (3)
   Start at  20:06:15
   Duration  108ms (transform 17ms, setup 0ms, import 26ms, tests 3ms, environment 0ms)

camper@campus-H610M-K-V2:~/campuslands-debugging-js-ts-node-Eve$ 
```