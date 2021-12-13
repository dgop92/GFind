import React from "react";
import { ClickableTableCell, TableCell } from "../../../components/Table/Pieces";
import { UniTable } from "../../../components/Table";
import { getGap, getColorOfGap } from "../../../utils/gapHelpers";

function GapCell({ cellData, gaps, onGapCellClick }) {
  const { i, j } = cellData;
  const gap = getGap(gaps, i, j);
  if (gap) {
    const colorGap = getColorOfGap(gap, "quality");
    return (
      <ClickableTableCell
        sx={{ backgroundColor: colorGap, borderColor: colorGap }}
        onClick={() => onGapCellClick(gap)}
      />
    );
  }
  return <TableCell />;
}

export default function TableGapView({ gaps, onGapCellClick }) {
  return <UniTable cellClass={GapCell} extraCellProps={{ gaps, onGapCellClick }} />;
}
