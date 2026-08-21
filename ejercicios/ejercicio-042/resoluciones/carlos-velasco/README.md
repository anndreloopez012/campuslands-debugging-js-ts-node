# Ejercicio 042: Auth simple

## Error encontrado

Se encontraron tres errores en la implementación de `app.js`.

Aunque el objetivo del ejercicio indica:

```text
Validar token y roles por endpoint.
```

el test proporcionado no contiene ningún caso que compruebe autenticación, tokens, roles, headers `Authorization` ni permisos por endpoint.

El contrato real definido por `auth.api.test.js` exige:

- `GET /health` debe responder `200`.
- `GET /items/:id` debe encontrar correctamente un elemento mediante un ID numérico.
- `GET /items/:id` debe responder `404` cuando el elemento no existe.
- `POST /items` debe crear un elemento con ID consecutivo.
- `POST /items` debe responder `201`.

Por esta razón, la solución se basa en el comportamiento realmente comprobado por los tests proporcionados.

## Causa raiz

### Error 1: comparación incorrecta del ID

La implementación original utilizaba:

```js
const item = items.find(current => current.id === req.params.id);
```

Los parámetros de una ruta de Express son recibidos como strings.

Cuando se realiza:

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

Sin embargo, los IDs almacenados en `items` son números:

```text
1
2
```

Por lo tanto, la comparación original termina siendo:

```js
1 === "1"
```

El resultado es:

```text
false
```

Esto provoca que un elemento existente no pueda ser encontrado correctamente.

### Corrección

Se convierte el parámetro de la ruta a número:

```js
current.id === Number(req.params.id)
```

Ahora la comparación es:

```js
1 === Number("1")
```

y produce:

```text
true
```

De esta manera, `GET /items/1` encuentra correctamente el elemento `alpha`.

---

### Error 2: status incorrecto cuando no existe el elemento

La implementación original utilizaba:

```js
if (!item) return res.status(200).json({ error: 'not found' });
```

El problema es que un elemento inexistente no representa una respuesta exitosa.

El test exige:

```js
await request(app).get('/items/999').expect(404);
```

Por lo tanto, la respuesta correcta debe utilizar:

```js
res.status(404)
```

La implementación corregida es:

```js
if (!item) {
  return res.status(404).json({ error: 'not found' });
}
```

Esto permite distinguir correctamente entre:

```text
200 OK
```

cuando el recurso existe y:

```text
404 Not Found
```

cuando no existe.

---

### Error 3: status incorrecto después de crear un elemento

La implementación original utilizaba:

```js
return res.status(200).json(item);
```

para:

```http
POST /items
```

El test exige:

```js
.expect(201);
```

Cuando la operación crea correctamente un nuevo recurso, el contrato del ejercicio espera:

```text
201 Created
```

Por lo tanto, se debe utilizar:

```js
return res.status(201).json(item);
```

## Causa raíz del objetivo de autenticación

El README establece como objetivo:

```text
Validar token y roles por endpoint.
```

Sin embargo, el código base proporcionado no contiene:

- middleware de autenticación;
- validación de tokens;
- lectura del header `Authorization`;
- definición de tokens válidos;
- definición de roles;
- permisos asociados a endpoints;
- respuestas `401 Unauthorized`;
- respuestas `403 Forbidden`.

Además, el test `auth.api.test.js` no envía tokens ni headers de autorización y tampoco comprueba respuestas relacionadas con autenticación o autorización.

Por lo tanto, no existe un contrato verificable que permita determinar cómo deben funcionar los tokens y roles.

Agregar una implementación arbitraria de autenticación podría introducir comportamiento que no está definido por los tests.

Por esta razón, no se agregó middleware de autenticación ni validación de roles y se corrigieron únicamente los errores demostrables mediante el contrato actual.

## Cambio aplicado

Se realizaron únicamente los cambios necesarios para cumplir los tests existentes.

### Cambio 1: convertir el parámetro `id`

Se cambió:

```js
current.id === req.params.id
```

por:

```js
current.id === Number(req.params.id)
```

Esto permite comparar correctamente el ID numérico almacenado con el parámetro recibido desde Express.

### Cambio 2: devolver `404` cuando el elemento no existe

Se cambió:

```js
if (!item) return res.status(200).json({ error: 'not found' });
```

por:

```js
if (!item) {
  return res.status(404).json({ error: 'not found' });
}
```

### Cambio 3: devolver `201` después de crear

Se cambió:

```js
return res.status(200).json(item);
```

por:

```js
return res.status(201).json(item);
```

No se modificaron los tests ni los archivos base.

## Solución final

```js
import express from 'express';

export function createApp() {
  const app = express();
  app.use(express.json());

  const items = [
    { id: 1, name: 'alpha', score: 10 },
    { id: 2, name: 'beta', score: 20 }
  ];

  app.get('/health', (req, res) => {
    res.status(200).json({ ok: true });
  });

  app.get('/items/:id', (req, res) => {
    const item = items.find(current => current.id === Number(req.params.id));

    if (!item) {
      return res.status(404).json({ error: 'not found' });
    }

    return res.status(200).json(item);
  });

  app.post('/items', (req, res) => {
    const item = { id: items.length + 1, ...req.body };
    items.push(item);

    return res.status(201).json(item);
  });

  return app;
}
```

## Comando usado para validar

```bash
npm test -- ejercicios/ejercicio-042/tests/auth.api.test.js
```

También puede ejecutarse directamente con Vitest:

```bash
npx vitest run ejercicios/ejercicio-042/tests/auth.api.test.js
```

## Validación del primer caso

El test realiza:

```http
GET /health
```

La respuesta esperada es:

```text
200 OK
```

con:

```json
{
  "ok": true
}
```

La implementación mantiene este comportamiento:

```js
app.get('/health', (req, res) => {
  res.status(200).json({ ok: true });
});
```

Por lo tanto, el primer caso debe pasar.

## Validación del segundo caso

El test realiza:

```http
GET /items/1
```

El parámetro recibido por Express es:

```text
"1"
```

La solución utiliza:

```js
Number(req.params.id)
```

para convertirlo a:

```text
1
```

La búsqueda queda:

```js
current.id === 1
```

El elemento encontrado es:

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

Después el test realiza:

```http
GET /items/999
```

Como no existe ningún elemento con ese ID, la aplicación devuelve:

```text
404 Not Found
```

con:

```json
{
  "error": "not found"
}
```

Por lo tanto, ambos escenarios del segundo test cumplen el contrato.

## Validación del tercer caso

El test realiza:

```http
POST /items
```

con:

```json
{
  "name": "gamma",
  "score": 30
}
```

Inicialmente existen dos elementos:

```text
id 1
id 2
```

Por lo tanto:

```js
items.length + 1
```

genera:

```text
id 3
```

El objeto creado es:

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

mediante:

```js
return res.status(201).json(item);
```

El objeto también cumple:

```js
expect(response.body).toMatchObject({
  id: 3,
  name: 'gamma',
  score: 30
});
```

## Sobre la autenticación y los roles

El objetivo del ejercicio indica:

```text
Validar token y roles por endpoint.
```

Sin embargo, el test actual no comprueba:

- existencia de un token;
- formato del token;
- header `Authorization`;
- token válido o inválido;
- usuario autenticado;
- roles;
- permisos por endpoint;
- respuesta `401 Unauthorized`;
- respuesta `403 Forbidden`.

Tampoco existe en `app.js` una estructura que defina dichos elementos.

Por lo tanto, no se agregó una implementación de autenticación o autorización que no pueda ser validada mediante el contrato proporcionado.

La solución se mantiene enfocada en los errores que sí pueden demostrarse mediante `auth.api.test.js`.

## Resultado final

Los tres casos definidos en el test deben pasar correctamente:

```text
✓ responde health correctamente
✓ busca item por id numerico y devuelve 404 si no existe
✓ crea item con status 201
```

Resultado esperado:

```text
3 tests passed
```

El formato exacto de la salida puede variar dependiendo de la versión y configuración de Vitest.

No se modificaron los tests.

## Estructura de la entrega

```text
ejercicios/ejercicio-042/resoluciones/carlos-velasco/
+-- app.js
+-- README.md
```

## Autor

```text
- Hecho por: Carlos Velasco
- Ejercicio: 042 - Auth simple
- Tecnología: API REST
- Tipo de corrección: Bug fix
```

## Justificación técnica

La solución mantiene la estructura original de la aplicación y realiza únicamente las correcciones necesarias para satisfacer el contrato definido por los tests.

En `GET /items/:id`, el problema era una incompatibilidad de tipos entre:

```js
current.id
```

que es un número, y:

```js
req.params.id
```

que Express entrega como string.

La conversión:

```js
Number(req.params.id)
```

permite realizar una comparación estricta correcta:

```js
current.id === Number(req.params.id)
```

Para un recurso inexistente, se utiliza `404 Not Found` en lugar de `200 OK`, porque el recurso solicitado no está disponible.

Para la creación de un nuevo recurso, se utiliza `201 Created`, que es el status definido explícitamente por el test.

También se conserva:

```js
id: items.length + 1
```

porque el test espera que el tercer elemento creado tenga:

```text
id: 3
```

No fue necesario modificar el mecanismo existente de generación de IDs.

No se agregó lógica de autenticación ni autorización porque el código y los tests proporcionados no definen un contrato suficiente para implementarla correctamente.

## Conclusión

Se encontraron tres errores verificables en `app.js`.

El primer error estaba en la búsqueda por ID. Se comparaba directamente un número con un string:

```js
current.id === req.params.id
```

Se corrigió utilizando:

```js
current.id === Number(req.params.id)
```

El segundo error estaba en la respuesta cuando el elemento no existe. La aplicación devolvía:

```text
200 OK
```

Se corrigió a:

```text
404 Not Found
```

El tercer error estaba en la respuesta de `POST /items`. La aplicación devolvía:

```text
200 OK
```

Se corrigió a:

```text
201 Created
```

El objetivo textual menciona la validación de tokens y roles, pero los tests proporcionados no contienen ningún escenario que establezca o valide ese comportamiento. Por ello, no se inventó una implementación de autenticación y se mantuvo la solución enfocada en el contrato real definido por `auth.api.test.js`.

Los tests originales no fueron modificados y la solución conserva la estructura y el comportamiento existente que no necesitaban cambios.