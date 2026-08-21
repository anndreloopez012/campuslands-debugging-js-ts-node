# Ejercicio 047

## Error #1 — Comparación de tipos en búsqueda por ID

**Qué fallaba:**
El endpoint `GET /items/:id` no encontraba ningún registro, incluso cuando el id sí existía en el arreglo. Además, cuando no encontraba el item, respondía con status `200` en lugar de `404`.

**Cómo lo encontré:**
El test esperaba `found.body.name` igual a `'alpha'`, pero recibió `undefined`. Revisando el código encontré que se comparaba `current.id === req.params.id`. En Express, todo lo que llega en `req.params` es siempre de tipo `string`, mientras que los `id` del arreglo `items` son de tipo `number`. Con `===` (igualdad estricta), `1 === "1"` da `false`, así que `.find()` nunca encontraba coincidencia. También noté que el manejo de "no encontrado" devolvía `res.status(200)` en vez de `404`, contradiciendo el nombre del test.

**Qué cambié:**
Convertí `req.params.id` a número antes de comparar, y corregí el status de respuesta cuando el item no existe.
````
    app.get('/items/:id', (req, res) => {
      const item = items.find(current => current.id === Number(req.params.id));
      if (!item) return res.status(404).json({ error: 'not found' });
      return res.json(item);
    });
````
**Cómo lo validé:**
Ejecuté nuevamente el test y comprobé que la prueba "busca item por id numerico y devuelve 404 si no existe" pasó correctamente.

---
## Error #2 — Status HTTP incorrecto al crear item

**Qué fallaba:**
El endpoint `POST /items` creaba correctamente el nuevo item, pero respondía con status `200` en lugar de `201`, que es el código correcto para indicar que un recurso fue creado exitosamente.

**Cómo lo encontré:**
El test esperaba status `201 "Created"`, pero recibió `200 "OK"`. Revisando el código encontré que la respuesta usaba `res.status(200)` en un endpoint que crea un recurso nuevo.

**Qué cambié:**
Cambié el status de la respuesta de `200` a `201`.
````^
    app.post('/items', (req, res) => {
      const item = { id: items.length + 1, ...req.body };
      items.push(item);
      return res.status(201).json(item);
    });
````
**Cómo lo validé:**
Ejecuté nuevamente el test y comprobé que la prueba "crea item con status 201" pasó correctamente, junto con las otras dos pruebas del ejercicio.