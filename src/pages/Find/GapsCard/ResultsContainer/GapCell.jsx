import React from "react";
import { ClickableTableCell, TableCell } from "../../../../components/Table/Pieces";
import { getGap, getColorOfGap } from "../../../../utils/gapHelpers";
import { getPercent } from "../../../../utils/helpers";

export default function GapCell({ cellData, gaps, onGapCellClick }) {
  const { i, j } = cellData;
  const gap = getGap(gaps, i, j);
  if (gap) {
    const colorGap = getColorOfGap(gap, "quality");
    return (
      <ClickableTableCell
        align="center"
        sx={{ backgroundColor: colorGap, borderColor: colorGap }}
        onClick={() => onGapCellClick(gap)}
      >
        {getPercent(gap?.quality)}
      </ClickableTableCell>
    );
  }
  return <TableCell />;
}
