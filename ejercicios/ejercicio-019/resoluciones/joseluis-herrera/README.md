# 🛠️ Reporte de Debugging — Ejercicio 019

Corrección de errores en el manejo de **registros activos** y el **ordenamiento por activo**

---

# 📋 Resumen

Durante la revisión del ejercicio se identificaron **2 errores** que afectaban el cálculo del promedio y la obtención del registros activos.

| Error 
|--------
| Uso incorrecto de `registro.length` para el promedio 
| Comparación incorrecta en `sort()` 

---

# 🐞 Error 1 — Promedio de registros activos

## Problema

El promedio se calculaba utilizando la cantidad total de registros (`registro.length`), incluyendo los **registros inactivos**. Esto generaba un promedio incorrecto.

### Código con error

```ts
return total / registro.length;
```

### Solución aplicada

Se reemplazó `registro.length` por `activos.length`, que representa únicamente los registros válidos para el cálculo.

```ts
return total / activos.length;
```

---

# 🐞 Error 2 — Registro con mayor puntaje

## Problema

La función `sort()` utilizaba una comparación incorrecta, por lo que no siempre devolvía el registro con el mayor puntaje.

### Código corregido

```ts
return [...registros].sort((a, b) => b.puntos - a.puntos)[0];
```

---

## Comando ejecutado

```bash
npm test -- ejercicios/ejercicio-019/tests/rpg-character.test.ts
```

## Resultado
### ✅ Validación

```text
> campuslands-debugging-js-ts-node@1.0.0 test
> vitest run ejercicios/ejercicio-019/tests/rpg-character.test.ts

RUN  v4.1.10 /home/joselo/Documentos/campuslands-debugging-js-ts-node

✓ ejercicios/ejercicio-019/tests/rpg-character.test.ts (2 tests)

  ✓ calcula promedio solo con registros activos
  ✓ obtiene el registro con mayor puntaje

Test Files  1 passed (1)
Tests       2 passed (2)

Duration    287ms
```

---