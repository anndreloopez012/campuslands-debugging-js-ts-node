# Solución Ejercicio 049: Subida de Archivos con Multer

## Error Encontrado

El endpoint `POST /upload` era incapaz de procesar solicitudes de subida de archivos. Cualquier intento de enviar un archivo resultaba en que `req.file` fuera `undefined` dentro del controlador, lo que hacía imposible acceder a los datos del archivo.

## Causa Raíz

La causa del bug era que la aplicación Express no tenía configurado ningún middleware para parsear el tipo de contenido `multipart/form-data`, que es el estándar utilizado para la subida de archivos. Express por sí solo no puede manejar este tipo de `body`, a diferencia de `application/json` o `application/x-www-form-urlencoded`.

## Cambio Aplicado

1.  **Integración de Multer:** Se añadió la librería `multer` al proyecto, que es el middleware estándar para manejar `multipart/form-data` en Express.
2.  **Configuración de Almacenamiento:** Se configuró `multer` para utilizar `memoryStorage()`, que almacena los archivos temporalmente en la RAM como objetos `Buffer`.
3.  **Aplicación del Middleware:** Se aplicó el middleware `upload.single('avatar')` a la ruta `POST /upload`. Este middleware intercepta la solicitud, busca un archivo en el campo llamado `avatar`, lo procesa y lo adjunta al objeto `req` como `req.file`.
4.  **Lógica del Controlador:** El controlador ahora puede verificar de forma segura la existencia de `req.file` y, si existe, devolver una respuesta `200 OK` con los metadatos del archivo. Si no existe, devuelve un error `400 Bad Request`.

## Comando Usado para Validar

```bash
npm test -- ejercicios/ejercicio-049/tests/upload.api.test.js
```
## Resultado final
```text
PS C:\Users\Dell\campuslands-debugging-js-ts-node-Eve> npm install multer

added 10 packages, and audited 164 packages in 4s

38 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
PS C:\Users\Dell\campuslands-debugging-js-ts-node-Eve> npm test -- ejercicios/ejercicio-049/tests/upload.api.test.js

> campuslands-debugging-js-ts-node@1.0.0 test
> vitest run ejercicios/ejercicio-049/tests/upload.api.test.js


 RUN  v4.1.10 C:/Users/Dell/campuslands-debugging-js-ts-node-Eve

 ✓ ejercicios/ejercicio-049/tests/upload.api.test.js (2 tests) 79ms
   ✓ ejercicio 049: Subida de Archivos con Multer (2)
     ✓ debe subir un archivo y devolver sus metadatos 66ms
     ✓ debe devolver un error 400 si no se sube ningún archivo 10ms

 Test Files  1 passed (1)
      Tests  2 passed (2)
   Start at  14:00:16
   Duration  2.55s (transform 201ms, setup 0ms, import 2.01s, tests 79ms, environment 0ms)

PS C:\Users\Dell\campuslands-debugging-js-ts-node-Eve> 
```