# 🛠️ Reporte de Debugging — Ejercicio 035

Corrección de errores en la API.

---

# 📋 Resumen

Durante la revisión del ejercicio se identificaron **2 errores** que impedían el funcionamiento correcto de la API al buscar item por id y uno por item para saber si todo estaba bien 

| Error | Estado |
|--------|--------|
| Parámetros enviados como `string` en lugar de `number` | ✅ Corregido |
| Código de estado HTTP incorrecto (`200` → `201`) | ✅ Corregido |

---

# 🐞 Error 1 — Parámetro de ID como texto

## Problema

El parámetro `id` se recibía como **cadena de texto (`string`)**, cuando la búsqueda requería un valor numérico (`number`). Esto ocasionaba que las comparaciones fallaran y no se encontraran registros existentes.

### Código con error

```js
const id = req.params.id;
```

### ¿Por qué era incorrecto?

Los parámetros de una URL llegan como texto. Si el arreglo almacena IDs numéricos, la comparación falla.

| Valor recibido | Tipo |
|---------------|------|
| `"1"` | String |
| `1` | Number |

### Solución aplicada

Se convirtió el parámetro a número antes de realizar la búsqueda.

```js
const id = Number(req.params.id);
```

---

# 🐞 Error 2 — Código de estado HTTP

## Problema

Al crear un nuevo item, la API respondía con el estado **200 OK**, cuando el código correcto para una creación exitosa es **201 Created**.

### Código con error

```js
res.status(200).json(nuevoJugador);
```

### Solución aplicada

Se actualizó el código de respuesta al estado HTTP correcto.

```js
res.status(201).json(nuevoJugador);
```

### Códigos HTTP

| Código | Significado |
|---------|-------------|
| 200 | OK (petición exitosa) |
| 201 | Created (recurso creado) |

--- 