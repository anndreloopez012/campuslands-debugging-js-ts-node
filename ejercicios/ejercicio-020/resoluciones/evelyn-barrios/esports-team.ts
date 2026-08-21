// Se define el array de roles como la "fuente de la verdad" con 'as const'
const ROLES = ['tanque', 'dps', 'soporte'] as const;

// El tipo 'Rol' se deriva directamente del array
export type Rol = typeof ROLES[number];

export type Miembro = {
  nombre: string;
  rol: Rol;
  suplente?: boolean;
};

// Estado global para satisfacer las funciones que exige el test
let miembros: Miembro[] = [];

/**
 * Resetea el estado del equipo antes de cada prueba.
 */
export function resetearEquipo(): void {
  miembros = [];
}

/**
 * Ficha un miembro validando que su rol exista en los roles permitidos.
 */
export function ficharMiembro(miembro: Miembro): void {
  if (!ROLES.includes(miembro.rol)) {
    throw new Error(`El rol '${miembro.rol}' no es válido.`);
  }
  miembros.push(miembro);
}

/**
 * Devuelve únicamente los miembros que son suplentes.
 */
export function obtenerSuplentes(): Miembro[] {
  return miembros.filter(m => m.suplente);
}