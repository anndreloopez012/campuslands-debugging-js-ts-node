# Resolución Ejercicio 049: Concurrencia simulada

## Error encontrado
- Peticiones concurrentes/simultáneas a la reserva de cupos sobreescribían el estado antes de validar la disponibilidad, generando reservas sobrevendidas (*overbooking*).
- `GET /items/:id`: Comprobaba tipos inconsistentes (`string` vs `number`) y devolvía `200 OK` para elementos no encontrados.

## Causa raíz
- Ausencia de un mecanismo de sincronización o cola secuencial para atornillar el acceso exclusivo al estado mutable de los cupos durante operaciones asincrónicas.

## Cambio aplicado
- Se implementó un patrón de cola de promesas (`runSequentially`) para serializar las operaciones sobre el recurso de reserva.
- Se aseguró que la verificación de cupos (`slots > 0`) y el decremento se ejecuten de forma atómica antes de procesar la siguiente solicitud entrante.
- Se estandarizó la conversión numérica de los parámetros y la emisión de códigos de estado adecuados (`200 OK`, `201 Created`, `404 Not Found`, `409 Conflict`).

## Comando usado para validar
```bash
npm test -- ejercicios/ejercicio-049/resoluciones/jose-rodriguez/concurrency.api.test.js