export type Item = {
  name: string;
  type: 'Mythic' | 'Legendary' | 'Boots' | 'Basic';
};

export type Build = Item[];

const MAX_ITEMS = 6;
const MAX_MYTHICS = 1;
const MAX_BOOTS = 1;

/**
 * Valida si una build de items para un personaje de MOBA es válida.
 *
 * BUG ORIGINAL: La validación permitía múltiples objetos míticos y no
 * contaba correctamente el límite de objetos.
 */
export function isValidBuild(build: Build): boolean {
  if (build.length > MAX_ITEMS) {
    return false;
  }

  const mythicCount = build.filter(item => item.type === 'Mythic').length;
  if (mythicCount > MAX_MYTHICS) {
    return false;
  }

  const bootsCount = build.filter(item => item.type === 'Boots').length;
  if (bootsCount > MAX_BOOTS) {
    return false;
  }

  return true;
}
