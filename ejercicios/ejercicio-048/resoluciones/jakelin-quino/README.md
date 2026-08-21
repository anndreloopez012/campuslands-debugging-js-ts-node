# Documentación del razonamiento

## ¿Qué fallaba?
`/items/:id` comparaba ID numérico con string y devolvía status 200 en lugar de 404 al no encontrar el ítem. `POST /items` retornaba status 200 en vez de 201.

## ¿Cómo lo encontré?
Ejecuté `npm test -- ejercicios/ejercicio-048/tests/cache.api.test.js` y las peticiones HTTP retornaron códigos de estado incorrectos y fallos en la búsqueda por ID.

## ¿Qué cambié?
* **En `GET /items/:id`:** Convertí `req.params.id` a número con `parseInt` y retorné status `404` cuando no existe.
* **En `POST /items`:** Cambié la respuesta al crear un ítem para que devuelva status `201`.

## ¿Cómo lo validé?
Ejecuté nuevamente el comando de prueba:
`npm test -- ejercicios/ejercicio-048/tests/cache.api.test.js`
