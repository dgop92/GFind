import React from "react";
import { TableCell, ClickableTableCell } from "../../../components/Table/Pieces";
import { UniTable } from "../../../components/Table";
import { Card } from "../../../components/Card";
import { CardTitle } from "../../../components/Text";
import { getGap, getColorOfGap } from "../../../utils/gapHelpers";
import { getPercent } from "../../../utils/helpers";

function HourCell({ cellData, hours, onHourCellClick }) {
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

export default function AnalyzeHourCard({ hours, onHourCellClick }) {
  return (
    <Card sx={{ minHeight: 500 }}>
      <CardTitle title="Analisís" extraStyles={{ py: 2, px: 4 }} />
      <UniTable cellClass={HourCell} extraCellProps={{ hours, onHourCellClick }} />;
    </Card>
  );
}
