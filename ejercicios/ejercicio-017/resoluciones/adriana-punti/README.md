# README — Ejercicio 017: Pingpong

## Cambios realizados

El código base utilizaba funciones genéricas relacionadas con puntos y rankings. Estas funciones no correspondían al objetivo específico del ejercicio, que consiste en simular un marcador de pingpong con reglas de ventaja.

Por este motivo, se modificaron las funciones para representar el comportamiento específico del partido:

- `calcularResultado()` fue reemplazada por `calcularMarcador()`.
- `ordenarRanking()` fue reemplazada por `determinarGanador()`.
- Se agregaron reglas para determinar cuándo el partido continúa.
- Se agregó la lógica para detectar ventaja cuando ambos jugadores llegan a 10 puntos.
- Se agregó la condición de victoria por una diferencia mínima de dos puntos.
- Los tests fueron adaptados para comprobar casos específicos de pingpong.

## ¿Qué esperaba el test?

Los tests esperaban que el programa pudiera representar correctamente diferentes situaciones de un partido de pingpong:

1. Que el partido continúe cuando ningún jugador ha alcanzado las condiciones para ganar.
2. Que un jugador gane al alcanzar 11 puntos con una diferencia de al menos 2 puntos.
3. Que exista una situación de ventaja cuando ambos jugadores tienen al menos 10 puntos y uno tiene solamente un punto de diferencia.
4. Que un jugador pueda ganar después de obtener dos puntos de ventaja.
5. Que la función pueda identificar correctamente al ganador.
6. Que no se devuelva ningún ganador mientras el partido continúe.

## ¿Qué recibió realmente?

El código original no estaba diseñado para trabajar con las reglas de un partido de pingpong.

La implementación original utilizaba una función que tomaba una propiedad `puntos` y concatenaba sus valores, además de una función que ordenaba jugadores mediante sus puntos.

Esto no permitía representar correctamente:

- El estado del partido.
- La ventaja.
- La diferencia mínima de dos puntos.
- La identificación del ganador.

Por esta razón, las funciones fueron reemplazadas por funciones específicas para el ejercicio.

## ¿El error es de tipo, lógica, async, HTTP o estructura?

El problema principal era de **lógica** y de adaptación de la estructura del código al objetivo del ejercicio.

No era un problema:

- De programación asíncrona.
- HTTP.
- De comunicación con una API.

La lógica original no representaba las reglas necesarias para determinar el estado de un partido de pingpong.

## ¿El dato llega bien a la función?

Sí.

Los datos necesarios para determinar el estado del partido llegan correctamente a las funciones mediante los puntajes de los dos jugadores.

Por ejemplo:

    calcularMarcador(11, 9)

permite determinar que el Jugador A ganó porque alcanzó 11 puntos y tiene una diferencia de 2 puntos.

Otro ejemplo:

    calcularMarcador(11, 10)

representa una situación de ventaja, ya que ambos jugadores han alcanzado al menos 10 puntos y solamente existe un punto de diferencia.

Por lo tanto, el problema no estaba en la entrada de los datos.

## ¿El problema nace en la entrada, transformación o salida?

El problema nace principalmente en la **transformación**.

Los puntajes llegan correctamente a la función, pero deben transformarse de acuerdo con las reglas del pingpong.

La función ahora evalúa:

- Si el partido continúa.
- Si existe ventaja.
- Si un jugador tiene una diferencia suficiente para ganar.
- Si existe un ganador.

La función `determinarGanador()` utiliza el resultado de `calcularMarcador()` para devolver el ganador cuando corresponde.

## Funciones modificadas

La función principal para determinar el estado del marcador quedó como:

    export function calcularMarcador(jugadorA, jugadorB) {
      if (jugadorA < 0 || jugadorB < 0) {
        throw new Error('Los puntos no pueden ser negativos');
      }

      if (jugadorA >= 10 && jugadorB >= 10) {
        if (jugadorA === jugadorB) {
          return 'empate';
        }

        if (jugadorA > jugadorB && jugadorA - jugadorB >= 2) {
          return 'Jugador A';
        }

        if (jugadorB > jugadorA && jugadorB - jugadorA >= 2) {
          return 'Jugador B';
        }

        if (jugadorA > jugadorB) {
          return 'ventaja Jugador A';
        }

        return 'ventaja Jugador B';
      }

      if (jugadorA >= 11 && jugadorA - jugadorB >= 2) {
        return 'Jugador A';
      }

      if (jugadorB >= 11 && jugadorB - jugadorA >= 2) {
        return 'Jugador B';
      }

      return 'en juego';
    }

La función para determinar al ganador quedó como:

    export function determinarGanador(jugadorA, jugadorB) {
      const resultado = calcularMarcador(jugadorA, jugadorB);

      if (resultado === 'Jugador A') {
        return 'Jugador A';
      }

      if (resultado === 'Jugador B') {
        return 'Jugador B';
      }

      return null;
    }

## Casos de prueba

Los tests fueron modificados para representar situaciones específicas del ejercicio:

- Partido en juego antes de alcanzar las condiciones de victoria.
- Victoria con 11 puntos y dos puntos de diferencia.
- Situación de ventaja.
- Victoria después de conseguir dos puntos de diferencia durante la ventaja.
- Identificación correcta del ganador.
- Ausencia de ganador mientras el partido continúa.

## Resultado de los tests

Los seis casos de prueba pasaron correctamente:

    ✓ Ejercicio 017 - Pingpong (6)
      ✓ mantiene el partido en juego cuando ninguno alcanza 11 puntos 1ms
      ✓ declara ganador cuando un jugador llega a 11 con dos puntos de ventaja 0ms
      ✓ declara ventaja cuando ambos jugadores llegan a 10 y uno tiene un punto más 0ms
      ✓ declara ganador después de conseguir dos puntos de ventaja en la ventaja 0ms
      ✓ detecta correctamente al ganador del partido 0ms
      ✓ no devuelve ganador mientras el partido continúa 0ms

## Resultado final

La implementación fue adaptada al caso específico de pingpong.

Ahora el código puede distinguir correctamente entre un partido en juego, una situación de ventaja y una victoria, respetando la diferencia mínima de dos puntos.

El problema se encontraba principalmente en la **lógica de transformación de los datos**, ya que el código base trabajaba con puntos y rankings genéricos en lugar de representar las reglas específicas del marcador de pingpong.