# Ejercicio 044: Validacion con Zod

## Error encontrado

Se encontraron varios errores en la implementación de `app.js`.

El archivo base no cumple completamente con el comportamiento esperado por los tests.

El contrato comprobado por `zod.api.test.js` exige:

- `GET /health` debe responder `200`.
- `GET /items/:id` debe encontrar correctamente un elemento mediante un ID numérico.
- `GET /items/:id` debe responder `404` cuando el elemento no existe.
- `POST /items` debe crear un elemento con ID consecutivo.
- `POST /items` debe responder `201`.

Aunque la temática del ejercicio corresponde a validación con Zod, el comportamiento real verificable está definido por los tests proporcionados.

## Causa raiz

### Error 1: comparación incorrecta del ID

La implementación original utilizaba:

```js
const item = items.find(current => current.id === req.params.id);
```

Los parámetros de una ruta de Express son recibidos como strings.

Para:

```http
GET /items/1
```

Express proporciona:

```js
req.params.id
```

como:

```text
"1"
```

Mientras que los IDs del arreglo son números.

La comparación original era equivalente a:

```js
1 === "1"
```

y producía:

```text
false
```

Esto impedía encontrar correctamente un elemento existente.

La corrección consiste en convertir el parámetro de ruta a número:

```js
current.id === Number(req.params.id)
```

### Error 2: status incorrecto cuando no existe el recurso

La implementación original respondía:

```js
res.status(200).json({ error: 'not found' })
```

cuando no encontraba un elemento.

El comportamiento esperado es:

```text
404 Not Found
```

Por lo tanto, se utiliza:

```js
return res.status(404).json({ error: 'not found' });
```

### Error 3: status incorrecto al crear un elemento

La implementación original respondía:

```js
return res.status(200).json(item);
```

después de crear el recurso.

El test exige:

```text
201 Created
```

La corrección es:

```js
return res.status(201).json(item);
```

## Cambio aplicado

Se realizaron únicamente los cambios necesarios para cumplir el contrato de los tests.

### Cambio 1

Se convirtió el ID recibido por la ruta:

```js
current.id === Number(req.params.id)
```

### Cambio 2

Se cambió la respuesta de recurso inexistente:

```text
200
```

a:

```text
404
```

### Cambio 3

Se cambió la respuesta de creación:

```text
200
```

a:

```text
201
```

No se modificaron los tests ni los archivos base.

## Comando usado para validar

```bash
npm test -- ejercicios/ejercicio-044/tests/zod.api.test.js
```

También puede ejecutarse:

```bash
npx vitest run ejercicios/ejercicio-044/tests/zod.api.test.js
```

## Validación

### GET `/health`

La ruta debe responder:

```text
200 OK
```

con:

```json
{
  "ok": true
}
```

### GET `/items/1`

El parámetro recibido es:

```text
"1"
```

La conversión:

```js
Number(req.params.id)
```

produce:

```text
1
```

Esto permite encontrar correctamente:

```json
{
  "id": 1,
  "name": "alpha",
  "score": 10
}
```

La respuesta es:

```text
200 OK
```

### GET `/items/999`

Como no existe el elemento solicitado, se devuelve:

```text
404 Not Found
```

### POST `/items`

Se envía:

```json
{
  "name": "gamma",
  "score": 30
}
```

Como ya existen dos elementos, el nuevo ID generado es:

```text
3
```

El resultado esperado es:

```json
{
  "id": 3,
  "name": "gamma",
  "score": 30
}
```

La respuesta utiliza:

```text
201 Created
```

## Resultado final

Los casos definidos en `zod.api.test.js` deben pasar correctamente:

```text
✓ responde health correctamente
✓ busca item por id numerico y devuelve 404 si no existe
✓ crea item con status 201
```

Resultado esperado:

```text
3 tests passed
```

El formato exacto de la salida puede variar dependiendo de la versión de Vitest.

## Estructura de la entrega

```text
ejercicios/ejercicio-044/resoluciones/carlos-velasco/
├── app.js
└── README.md
```

## Conclusión

Se corrigieron los tres errores comprobables mediante los tests.

El primer error era comparar un número con un string al buscar un elemento por ID.

El segundo error era devolver `200 OK` cuando el recurso no existía. Se corrigió a `404 Not Found`.

El tercer error era devolver `200 OK` después de crear un recurso. Se corrigió a `201 Created`.

La implementación conserva la estructura original y solo modifica el comportamiento necesario para cumplir el contrato verificable.

Los tests no fueron modificados.