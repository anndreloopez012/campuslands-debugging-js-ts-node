export type SkydiverChecklist = {
  helmet: boolean;
  goggles: boolean;
  altimeter: boolean;
  mainParachute: boolean;
  reserveParachute: boolean;
};

export function canJump(checklist: SkydiverChecklist): boolean {
    const items = Object.values(checklist);
    // FIX: Se debe usar `every` para asegurar que todos los elementos del checklist son `true`.
    // El bug usaba `some`, que devolvía `true` si al menos uno lo era.
    return items.every(item => item === true);
}
