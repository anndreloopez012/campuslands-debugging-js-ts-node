# README — Ejercicio 023: Ropa streetwear

## Cambios realizados

El código y los tests fueron adaptados al objetivo indicado en el README del ejercicio: **modelar tallas y stock con tipos seguros**.

Se realizaron los siguientes cambios:

- Se creó el tipo `Talla` para limitar las tallas válidas a:
  - `XS`
  - `S`
  - `M`
  - `L`
  - `XL`
- Se creó el tipo `Producto` para representar una prenda con:
  - `nombre`
  - `talla`
  - `stock`
- Se creó la función `tieneStock()` para determinar si una prenda tiene unidades disponibles.
- Se creó la función `obtenerStockTotal()` para sumar el stock de varios productos.
- Se reemplazaron las funciones del código base que trabajaban con registros y puntos, ya que no correspondían al objetivo de ropa streetwear.
- Los tests fueron modificados para probar casos específicos de prendas, tallas y stock.

## ¿Qué esperaba el test?

El test esperaba que el programa pudiera trabajar con productos de ropa streetwear y que pudiera:

1. Reconocer una prenda cuando tiene stock disponible.
2. Considerar agotada una prenda cuando su stock es `0`.
3. Sumar correctamente el stock de varias prendas.
4. Devolver `0` cuando no existen productos.

Por ejemplo, para una prenda con:

    {
      nombre: 'Oversized Hoodie',
      talla: 'M',
      stock: 5
    }

se esperaba que `tieneStock()` devolviera `true`.

Para una prenda con stock `0`, se esperaba `false`.

## ¿Qué recibió realmente?

El código base original no trabajaba con ropa, tallas ni stock.

Utilizaba un tipo `Registro` con las propiedades:

    nombre
    puntos
    activo

También contenía funciones relacionadas con el cálculo de promedios y la obtención del registro con mayor puntuación.

Por lo tanto, el código original no podía cumplir directamente con el objetivo del ejercicio de ropa streetwear.

El problema no era que los datos de una prenda estuvieran llegando incorrectamente, sino que las funciones existentes esperaban una estructura de datos diferente.

## ¿El error es de tipo, lógica, async, HTTP o estructura?

El problema principal es de **estructura y lógica respecto al objetivo del ejercicio**.

No es un error:

- Async.
- HTTP.
- De comunicación con una API.

El código original estaba estructurado alrededor de `Registro`, `puntos` y `activo`, mientras que el ejercicio requiere modelar productos de ropa con tallas y stock.

Además, el ejercicio requiere tipos seguros para las tallas, por lo que se utiliza un tipo unión:

    type Talla = 'XS' | 'S' | 'M' | 'L' | 'XL';

Esto evita aceptar tallas que no forman parte del modelo definido.

## ¿El dato llega bien a la función?

Con la implementación adaptada, sí.

Las funciones reciben los datos correspondientes al dominio del ejercicio.

Por ejemplo, `tieneStock()` recibe un `Producto`:

    {
      nombre: 'Oversized Hoodie',
      talla: 'M',
      stock: 5
    }

y puede comprobar directamente si existe stock disponible.

`obtenerStockTotal()` recibe un arreglo de productos y puede sumar sus cantidades de stock.

## ¿El problema nace en la entrada, transformación o salida?

El problema original nace principalmente en la **entrada y estructura de los datos esperados por las funciones**.

El código original esperaba objetos `Registro`:

    {
      nombre,
      puntos,
      activo
    }

pero el ejercicio requiere objetos `Producto`:

    {
      nombre,
      talla,
      stock
    }

Al adaptar la estructura de entrada al dominio correcto, las funciones pueden realizar las transformaciones necesarias.

La transformación de stock se realiza mediante una suma:

    productos.reduce(
      (total, producto) => total + producto.stock,
      0
    );

La salida corresponde a lo esperado por los tests:

- `true` cuando existe stock.
- `false` cuando el stock es `0`.
- La suma total del stock.
- `0` cuando el arreglo está vacío.

## Resultado de los tests

Todos los casos de prueba pasaron correctamente:

    ✓ reconoce una prenda cuando tiene stock disponible 1ms
    ✓ considera agotada una prenda cuando el stock es cero 0ms
    ✓ suma correctamente el stock de varias prendas 0ms
    ✓ devuelve cero cuando no existen productos 0ms

## Resultado final

El ejercicio quedó adaptado al contexto de ropa streetwear.

La solución ahora:

- Utiliza tipos seguros para las tallas.
- Modela las prendas mediante el tipo `Producto`.
- Detecta correctamente si existe stock.
- Identifica una prenda agotada cuando tiene `0` unidades.
- Calcula el stock total.
- Devuelve `0` cuando no existen productos.
- Pasa correctamente los cuatro casos de prueba.

El README del ejercicio establece como objetivo modelar tallas y stock con tipos seguros y recomienda revisar la entrada, transformación y salida para localizar la causa raíz. La solución sigue ese enfoque.