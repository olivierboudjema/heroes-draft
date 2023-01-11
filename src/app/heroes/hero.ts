export interface Hero {
  name: string,
  value: number;
  base_value: number;
  role: string;
  cac_ranged: string;
  map_strong: string[];
  map_weak: string[];
  synergy_with: string[];
  counter_by: string[];
  tier: number;
  selectedAlie?: boolean;
  selectedAdversaire?: boolean;
  showDetails?: boolean;
  showDetailsAdversaire?: boolean;
}
