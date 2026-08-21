 # Ejercicio 003 - Tienda de skins

## Error encontrado

Se identificaron dos errores en `skins.js`:

1. `calcularResultado()` concatenaba los valores de `puntos` como texto en lugar de realizar una suma numérica.
2. `ordenarRanking()` ordenaba los jugadores de menor a mayor puntuación, cuando el ranking debe priorizar las puntuaciones más altas.

> **Nota:** El README del ejercicio describe una funcionalidad de descuentos y redondeo de precios para una tienda de skins. Sin embargo, el código y los tests proporcionados evalúan actualmente el cálculo de una suma numérica y el ordenamiento de un ranking. La corrección se realizó respetando el contrato definido por los tests existentes.

## Causa raíz

### 1. Suma de puntos

La implementación original utilizaba:

```js
datos.map(item => item.puntos).join('');
```

`map()` obtiene los valores de `puntos`, pero `join('')` los convierte en texto y los concatena.

Con los datos del test:

```text
10 + 15 + 5
```

el resultado incorrecto es:

```text
10155
```

cuando el resultado esperado es:

```text
30
```

La causa raíz es el uso de `join()` para combinar valores que deben ser tratados como números.

### 2. Ordenamiento del ranking

La implementación original utilizaba:

```js
a.puntos - b.puntos
```

Este comparador ordena los resultados de menor a mayor.

El test requiere un ranking descendente, por lo que los jugadores con mayor puntuación deben aparecer primero.

## Cambio aplicado

Se reemplazó `map().join()` por `reduce()` para realizar la suma numérica:

```js
return datos.reduce((total, item) => {
  return total + Number(item.puntos);
}, 0);
```

También se corrigió el comparador del ranking:

```js
return [...jugadores].sort((a, b) => b.puntos - a.puntos);
```

Se mantiene `[...jugadores]` para evitar modificar directamente el arreglo original.

## Validación

### Comando utilizado

```bash
npm test -- ejercicios/ejercicio-003/tests/skins.test.js
```

### Resultado final

La solución debe cumplir los dos casos definidos por el test:

* `10 + 15 + 5` devuelve `30`.
* El ranking queda ordenado como `pro`, `elite`, `novato`.

Los tests deben finalizar correctamente sin modificar el archivo de pruebas.

## Estructura del ejercicio

```text
ejercicios/ejercicio-003/resoluciones/carlos-velasco/
├── skins.js
└── README.md
```

## Autor

* **Hecho por:** Carlos Velasco
* **Ejercicio:** 003 - Tienda de skins
* **Tecnología:** JavaScript
* **Tipo de corrección:** Bug fix
