export type ElementType = 'Fire' | 'Water' | 'Grass' | 'Normal';

export type Character = {
  type: ElementType;
  attack: number;
  defense: number;
};

const MODIFIERS: Record<ElementType, Record<ElementType, number>> = {
  Fire: { Grass: 2, Water: 0.5, Normal: 1, Fire: 1 },
  Water: { Fire: 2, Grass: 0.5, Normal: 1, Water: 1 },
  Grass: { Water: 2, Fire: 0.5, Normal: 1, Grass: 1 },
  Normal: { Normal: 1, Fire: 1, Water: 1, Grass: 1 },
};

/**
 * Calcula el daño infligido por un atacante a un defensor.
 * BUG ORIGINAL: Los modificadores de daño se aplicaban incorrectamente
 * y no se garantizaba un daño mínimo de 1.
 */
export function calculateDamage(attacker: Character, defender: Character): number {
  const modifier = MODIFIERS[attacker.type]?.[defender.type] ?? 1;
  const baseDamage = attacker.attack - defender.defense;

  // FIX: El daño se calcula multiplicando el daño base por el modificador.
  const totalDamage = baseDamage * modifier;

  // FIX: El daño final debe ser como mínimo 1.
  return Math.max(1, Math.floor(totalDamage));
}