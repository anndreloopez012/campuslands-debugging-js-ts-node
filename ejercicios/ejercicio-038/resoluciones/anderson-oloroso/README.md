# Resolución del ejercicio 📘✨: Ejercicio 038

## 🐞 Errores encontrados

* **Error 1:** En la ruta `GET /items/:id`, el parámetro `id` de la URL se comparaba directamente con el `id` numérico de los objetos.
* **Error 2:** En la ruta `GET /items/:id`, cuando el elemento no existía, la aplicación devolvía el estado `200` en lugar de `404`.
* **Error 3:** En la ruta `POST /items`, la aplicación devolvía el estado `200` tras crear un elemento, cuando debía devolver `201`.

## 🔎 Causa raíz

* **Causa del error 1:** Los parámetros de URL (`req.params.id`) son de tipo `string` (por ejemplo, `'1'`), mientras que los identificadores de los objetos son de tipo `number` (por ejemplo, `1`). La comparación estricta `1 === '1'` devolvía `false`.
* **Causa del error 2:** Se usaba el código de estado `200` para indicar la ausencia del recurso. El estándar correcto para un recurso no encontrado es `404 Not Found`.
* **Causa del error 3:** Se usaba el código de estado `200` al crear un recurso. El estándar correcto para la creación exitosa es `201 Created`.

## 🔧 Cambios aplicados

### Cambio del error 1

```javascript
// Código anterior:
const item = items.find(current => current.id === req.params.id);

// Código nuevo:
const item = items.find(current => current.id === Number(req.params.id);
```

### Cambio del error 2

```javascript
// Código anterior:
if (!item) return res.status(200).json({ error: 'not found' });

// Código nuevo:
if (!item) {
  return res.status(404).json({ error: 'not found' });
}
```

### Cambio del error 3

```javascript
// Código anterior:
return res.status(200).json(item);

// Código nuevo:
return res.status(201).json(item);
```

## 🧪 Comando usado para validar
> npm test -- ejercicios/ejercicio-038/tests/inventory.api.test.js

**✅ Resultado final:**

* La ruta `GET /health` respondió correctamente con el estado `200` y el cuerpo `{ ok: true }`.
* La ruta `GET /items/1` encontró correctamente el elemento `alpha`.
* La ruta `GET /items/999` devolvió correctamente el estado `404`.
* La ruta `POST /items` creó correctamente el elemento `gamma` con el identificador `3`.
* La ruta `POST /items` devolvió correctamente el estado `201`.