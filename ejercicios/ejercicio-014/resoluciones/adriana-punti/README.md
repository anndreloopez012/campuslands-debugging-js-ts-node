# README — Ejercicio 014: Tatuajes

## ¿Qué esperaba el test?

El test esperaba que las funciones relacionadas con la agenda de tatuajes validaran correctamente la duración de las sesiones y calcularan su duración total.

Los casos esperados eran:

- Una agenda con todas las sesiones con duración válida debía devolver `true`.
- Una agenda con una sesión de duración `0` debía devolver `false`.
- Una agenda con una sesión de duración negativa debía devolver `false`.
- La duración total de todas las sesiones debía calcularse correctamente.

## ¿Qué recibió realmente?

El código base contenía una implementación que no cumplía correctamente con el objetivo del ejercicio: validar la agenda y la duración de las sesiones.

La solución fue adaptada para trabajar específicamente con sesiones de tatuajes y su propiedad `duracion`.

Después de la corrección, los resultados obtenidos coincidieron con los valores esperados por los tests.

## ¿El error es de tipo, lógica, async, HTTP o estructura?

El error era principalmente de **lógica**.

No se trataba de un problema `async`, HTTP o de comunicación con una API.

La solución necesitaba aplicar correctamente las reglas de validación de duración:

- La duración debe ser un número.
- La duración debe ser mayor que `0`.
- Las sesiones válidas deben poder sumarse para obtener la duración total.

## ¿El dato llega bien a la función?

Sí.

Los datos llegan correctamente como un arreglo de sesiones.

Cada sesión contiene información como:

    {
      cliente: 'Ana',
      duracion: 60
    }

La función recibe correctamente la propiedad `duracion`, por lo que el problema no se encuentra en la entrada.

## ¿El problema nace en la entrada, transformación o salida?

El problema nace en la **transformación**.

Los datos de entrada contienen correctamente la duración de cada sesión, pero deben procesarse aplicando las reglas correspondientes.

Para validar la agenda se comprueba que todas las duraciones sean números mayores que `0`.

Para calcular la duración total se suman las duraciones de todas las sesiones.

La implementación utilizada fue:

    export function validarAgenda(sesiones) {
      return sesiones.every((sesion) => {
        return (
          typeof sesion.duracion === 'number' &&
          sesion.duracion > 0
        );
      });
    }

    export function calcularDuracionTotal(sesiones) {
      return sesiones.reduce((total, sesion) => {
        return total + sesion.duracion;
      }, 0);
    }

## Casos de prueba

Se utilizaron cuatro casos específicos:

1. Validar una agenda cuando todas las sesiones tienen una duración válida.
2. Rechazar una agenda cuando una sesión tiene duración cero.
3. Rechazar una agenda cuando una sesión tiene duración negativa.
4. Calcular la duración total de todas las sesiones.

## Resultado de los tests

Después de realizar la corrección, los cuatro tests pasaron correctamente:

    ✓ Ejercicio 014 - Tatuajes (4)
      ✓ valida una agenda cuando todas las sesiones tienen duración válida 1ms
      ✓ rechaza una agenda cuando una sesión tiene duración cero 0ms
      ✓ rechaza una agenda cuando una sesión tiene duración negativa 0ms
      ✓ calcula la duración total de todas las sesiones 0ms

## Resultado final

Los cuatro casos de prueba fueron validados correctamente.

La solución ahora valida que las sesiones tengan una duración numérica mayor que cero y calcula correctamente la duración total de la agenda.

El problema se encontraba en la **transformación de los datos**, ya que la entrada llegaba correctamente a las funciones.