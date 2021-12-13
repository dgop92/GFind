import { CELL_COLORS } from "./constants";

export function getGap(gaps, i, j) {
  if (!gaps) return undefined;
  const gapDataFiltered = gaps.filter(
    (gap) => gap.hour_index === i && gap.day_index === j
  );
  return gapDataFiltered[0];
}

export function getColorOfGap(gap, keyName) {
  if (gap[keyName] < 0.33) return CELL_COLORS.bad;
  if (gap[keyName] < 0.67) return CELL_COLORS.medium;

  return CELL_COLORS.good;
}
