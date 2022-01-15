import React from "react";
import { ClickableTableCell } from "../../../../components/Table/Pieces";

export default function RegisterCell({ cellData, onCellClick, selectedHours }) {
  const { i, j } = cellData;
  let sxProps = {};
  if (`${i}-${j}` in selectedHours) {
    sxProps = {
      backgroundColor: (theme) => theme.palette.primary.light,
      borderColor: (theme) => theme.palette.primary.light,
    };
  }
  return <ClickableTableCell onClick={() => onCellClick([i, j])} sx={sxProps} />;
}
