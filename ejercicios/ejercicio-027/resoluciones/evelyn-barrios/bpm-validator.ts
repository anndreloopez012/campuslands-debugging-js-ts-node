export type Genre = 'Rock' | 'Pop' | 'Techno' | 'Jazz';

export type Song = {
  title: string;
  genre: Genre;
  bpm: number;
};

const BPM_RANGES: Record<Genre, [number, number]> = {
  Rock: [90, 160],
  Pop: [80, 130],
  Techno: [120, 140],
  Jazz: [100, 120],
};

/**
 * Verifica si el BPM de una canción está dentro del rango válido para su género.
 *
 * BUG ORIGINAL: La lógica estaba invertida. Devolvía `true` para BPMs FUERA de rango.
 * FIX: Se ajustó la condición para que devuelva `true` solo si el BPM está
 * DENTRO del rango (inclusivo).
 */
export function isBpmInRange(song: Song): boolean {
  const range = BPM_RANGES[song.genre];
  if (!range) {
    return false; // Si el género no tiene un rango definido, no es válido.
  }
  const [min, max] = range;
  // La condición correcta es que el BPM sea >= min Y <= max.
  return song.bpm >= min && song.bpm <= max;
}