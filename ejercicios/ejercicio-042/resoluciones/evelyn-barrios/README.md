# Solución Ejercicio 042: Auth Simple

## Error Encontrado

El principal problema de seguridad era que las rutas `/profile` y `/admin` eran completamente públicas. Cualquier persona, sin necesidad de un token o permisos, podía acceder a ellas, lo cual representa una grave vulnerabilidad de control de acceso.

## Causa Raíz

La causa del error era la ausencia total de middlewares de autenticación y autorización en la aplicación Express. No existía ningún mecanismo que validara la identidad del usuario a través de un token ni que verificara si el usuario tenía los roles necesarios para acceder a rutas restringidas.

## Cambio Aplicado

1.  **Middleware de Autenticación (`authMiddleware`):** Se implementó un middleware que extrae el token `Bearer` de la cabecera `Authorization`. Valida que el token exista y corresponda a un usuario en la base de datos simulada. Si la validación es exitosa, adjunta el objeto de usuario al `req` para los siguientes middlewares. Si falla, retorna un error `401 Unauthorized`.

2.  **Middleware de Autorización (`roleMiddleware`):** Se creó una "middleware factory" que genera un middleware específico para verificar roles. Este middleware comprueba si el rol del usuario (adjuntado por `authMiddleware`) está en la lista de roles permitidos para esa ruta. Si no tiene permiso, retorna un error `403 Forbidden`.

3.  **Protección de Rutas:** Se aplicaron los middlewares a las rutas correspondientes: `/profile` ahora está protegida por `authMiddleware`, y `/admin` está protegida por `authMiddleware` y `roleMiddleware(['admin'])`.

## Comando Usado para Validar

```bash
npm test -- ejercicios/ejercicio-042/tests/auth.api.test.js
```
## Resultado final
```text
PS C:\Users\Dell\campuslands-debugging-js-ts-node-Eve> npm test -- ejercicios/ejercicio-042/tests/auth.api.test.js                                                                                      
                                                                                                    
> campuslands-debugging-js-ts-node@1.0.0 test
> vitest run ejercicios/ejercicio-042/tests/auth.api.test.js


 RUN  v4.1.10 C:/Users/Dell/campuslands-debugging-js-ts-node-Eve

 ✓ ejercicios/ejercicio-042/tests/auth.api.test.js (6 tests) 91ms
   ✓ ejercicio 042: Auth Simple (6)
     ✓ debe permitir el acceso a la ruta pública sin token 52ms
     ✓ debe denegar el acceso a /profile sin token (401 Unauthorized) 8ms
     ✓ debe denegar el acceso a /profile con un token inválido (401 Unauthorized) 6ms
     ✓ debe permitir el acceso a /profile con un token de usuario válido 8ms
     ✓ debe denegar el acceso a /admin con un token de usuario (403 Forbidden) 7ms
     ✓ debe permitir el acceso a /admin con un token de administrador válido 7ms

 Test Files  1 passed (1)
      Tests  6 passed (6)
   Start at  11:25:45
   Duration  973ms (transform 75ms, setup 0ms, import 537ms, tests 91ms, environment 0ms)

PS C:\Users\Dell\campuslands-debugging-js-ts-node-Eve> 
```