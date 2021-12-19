import React from "react";
import { TableCell, ClickableTableCell } from "../../../../components/Table/Pieces";
import { getGap, getColorOfGap } from "../../../../utils/gapHelpers";
import { getPercent } from "../../../../utils/helpers";

export default function HourCell({ cellData, hours, onHourCellClick }) {
  const { i, j } = cellData;
  const hour = getGap(hours, i, j);
  if (hour) {
    const hourColor = getColorOfGap(hour, "availability");
    return (
      <ClickableTableCell
        align="center"
        sx={{ backgroundColor: hourColor, borderColor: hourColor }}
        onClick={() => onHourCellClick(hour)}
      >
        {getPercent(hour?.availability)}
      </ClickableTableCell>
    );
  }
  return <TableCell />;
}
