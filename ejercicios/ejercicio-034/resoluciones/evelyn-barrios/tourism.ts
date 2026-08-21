export type Season = 'Summer' | 'Autumn' | 'Winter' | 'Spring';

export type Package = {
  id: string;
  destination: string;
  price: number;
  seasons: Season[];
};

export type Filters = {
  maxBudget?: number;
  season?: Season;
};

export function filterPackages(packages: Package[], filters: Filters): Package[] {
  let filteredPackages = packages;

  // BUG: La lógica de filtrado es incorrecta. No aplica los filtros de forma acumulativa.
  // FIX: Se deben aplicar los filtros en cadena para que ambos se cumplan.
  if (filters.maxBudget !== undefined) {
    filteredPackages = filteredPackages.filter(p => p.price <= filters.maxBudget!);
  }

  if (filters.season) {
    filteredPackages = filteredPackages.filter(p => p.seasons.includes(filters.season!));
  }

  return filteredPackages;
}