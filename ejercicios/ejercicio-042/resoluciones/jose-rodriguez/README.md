# Resolución Ejercicio 042: Auth simple

## Error encontrado
- Las rutas `/items/:id` y `POST /items` estaban desprotegidas, permitiendo el acceso sin token de autenticación.
- No existía control de permisos basado en roles (RBAC) para limitar la creación de recursos únicamente a usuarios administradores.
- `GET /items/:id` devolvía `200 OK` en solicitudes sin encontrar elementos y comparaba IDs sin conversión explícita a tipo numérico.

## Causa raíz
- Ausencia de middlewares de autenticación (`Authorization: Bearer <token>`) y autorización por roles antes de los handlers finales de Express.

## Cambio aplicado
- Se agregó el middleware `authenticate` para validar la presencia y validez del token en el encabezado `Authorization`, retornando `401 Unauthorized` si es inválido o ausente.
- Se implementó el middleware `authorize(['admin'])` para restringir el endpoint `POST /items` devolviendo `403 Forbidden` si el rol no coincide.
- Se corrigió el casteo de `req.params.id` a `Number` y la respuesta con código `404 Not Found` en la búsqueda por ID.

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-042/resoluciones/jose-rodriguez/auth.api.test.js