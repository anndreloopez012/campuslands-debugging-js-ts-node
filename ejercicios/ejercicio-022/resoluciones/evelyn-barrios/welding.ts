// Define los materiales y sus límites de seguridad
const LIMITES_SEGURIDAD = {
  acero: { tempMin: 1370, tempMax: 1540, presMin: 10, presMax: 20 },
  aluminio: { tempMin: 600, tempMax: 660, presMin: 5, presMax: 15 },
  titanio: { tempMin: 1600, tempMax: 1700, presMin: 15, presMax: 25 },
} as const;

// Deriva el tipo de material a partir de las llaves del objeto de límites
export type Material = keyof typeof LIMITES_SEGURIDAD;

export type Proceso = {
  material: Material;
  temperatura: number;
  presion: number;
};

/**
 * Verifica si un proceso de soldadura se encuentra dentro de los
 * límites de temperatura y presión para un material específico.
 */
export function esSoldaduraSegura(proceso: Proceso): boolean {
  const limites = LIMITES_SEGURIDAD[proceso.material];

  // FIX: Se deben validar tanto la temperatura como la presión.
  const tempValida = proceso.temperatura >= limites.tempMin && proceso.temperatura <= limites.tempMax;
  const presionValida = proceso.presion >= limites.presMin && proceso.presion <= limites.presMax;

  // FIX: La soldadura es segura solo si AMBAS condiciones se cumplen.
  return tempValida && presionValida;
}
