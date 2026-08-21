# README — Ejercicio 015: Dibujo digital

## ¿Qué esperaba el test?

El test esperaba que la función `normalizarCapasVisibles()` devolviera únicamente las capas que tienen la propiedad `visible` establecida en `true`.

Los casos de prueba comprueban que:

- Se devuelvan únicamente las capas visibles.
- Se ignoren las capas que no están visibles.
- Se devuelva un arreglo vacío cuando ninguna capa está visible.
- El arreglo original no sea modificado.

Esto corresponde al objetivo del ejercicio: **normalizar las capas visibles en un archivo**. :contentReference[oaicite:0]{index=0}

## ¿Qué recibió realmente?

La implementación anterior no estaba adaptada correctamente al objetivo específico del ejercicio.

El código debía trabajar con objetos que representan capas y utilizar la propiedad `visible` para determinar cuáles deben formar parte del resultado.

Después de realizar la modificación, la función devuelve correctamente las capas visibles y conserva las capas originales sin modificarlas.

## ¿El error es de tipo, lógica, async, HTTP o estructura?

El error es principalmente de **lógica**.

No corresponde a un problema de:

- Tipos.
- Programación asíncrona.
- HTTP.
- Comunicación con una API.

El problema estaba en la lógica utilizada para transformar el arreglo de capas y seleccionar únicamente las que cumplen la condición `visible === true`.

El README recomienda precisamente comparar la entrada, transformación y salida, además de revisar si los arreglos se están manejando correctamente y si los objetos originales son modificados. :contentReference[oaicite:1]{index=1}

## ¿El dato llega bien a la función?

Sí.

La función recibe correctamente un arreglo de objetos que representan las capas.

Cada objeto puede tener una estructura como:

    {
      nombre: 'Fondo',
      visible: true
    }

o:

    {
      nombre: 'Boceto',
      visible: false
    }

La información necesaria para determinar si una capa debe aparecer en el resultado está presente en la entrada.

## ¿El problema nace en la entrada, transformación o salida?

El problema nace en la **transformación**.

La entrada contiene correctamente las capas y su propiedad `visible`.

La transformación debe recorrer el arreglo y conservar únicamente las capas cuyo valor de `visible` sea `true`.

La solución utiliza:

    export function normalizarCapasVisibles(capas) {
      return capas.filter((capa) => capa.visible === true);
    }

De esta manera:

- Las capas visibles permanecen en el resultado.
- Las capas no visibles son ignoradas.
- El arreglo original no se modifica.
- Si ninguna capa es visible, se devuelve un arreglo vacío.

## Cambio aplicado

Se adaptó la función al dominio específico del ejercicio:

    export function normalizarCapasVisibles(capas) {
      return capas.filter((capa) => capa.visible === true);
    }

También se adaptaron los tests para comprobar casos específicos de capas visibles, capas ocultas, ausencia de capas visibles y conservación del arreglo original.

El README indica que la corrección debe realizarse sobre la copia del archivo base, corrigiendo el mínimo código necesario y sin modificar los tests para hacer pasar una solución incorrecta. :contentReference[oaicite:2]{index=2}

## Comando utilizado para validar

    npm test -- ejercicios/ejercicio-015/tests/layers.test.js

Este es el comando de validación indicado por el README del ejercicio. :contentReference[oaicite:3]{index=3}

## Resultado final

Los casos de prueba fueron validados correctamente:

    ✓ Ejercicio 015 - Dibujo digital (4)
      ✓ devuelve únicamente las capas visibles
      ✓ ignora las capas que no están visibles
      ✓ devuelve un arreglo vacío cuando ninguna capa está visible
      ✓ no modifica el arreglo original

La solución ahora cumple con el objetivo del ejercicio: **normalizar las capas visibles en un archivo**. :contentReference[oaicite:4]{index=4}

El problema estaba en la **transformación de los datos**. La entrada llegaba correctamente a la función y la salida esperada se obtiene después de filtrar las capas según su propiedad `visible`.