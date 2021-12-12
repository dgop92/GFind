import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { ClickableTableCell, TableCell, TableHeader } from "../../../components/Table";
import { DAYS, HOURS } from "../../../utils/constants";

const columnNames = ["Hora", ...DAYS];
const colorTypes = {
  good: "#7DCEA0",
  medium: "#F7DC6F",
  bad: "#F1948A",
};

function getGap(gaps, i, j) {
  if (!gaps) return undefined;
  const gapDataFiltered = gaps.filter(
    (gap) => gap.hour_index === i && gap.day_index === j
  );
  return gapDataFiltered[0];
}

function getColorOfGap(gap) {
  if (gap.quality < 0.33) return colorTypes.bad;
  if (gap.quality < 0.66) return colorTypes.medium;

  return colorTypes.good;
}

export default function TableGapView({ gaps, onGapCellClicked }) {
  return (
    <TableContainer sx={{ py: 1.5, px: { xs: 1.5, md: 3 } }}>
      <Table sx={{ minWidth: 800 }}>
        <TableHeader columnNames={columnNames} />
        <TableBody>
          {HOURS.map((hour, i) => (
            <TableRow key={hour}>
              <TableCell>{hour}</TableCell>

              {DAYS.map((day, j) => {
                const gap = getGap(gaps, i, j);
                if (gap) {
                  const colorGap = getColorOfGap(gap);
                  return (
                    <ClickableTableCell
                      sx={{ backgroundColor: colorGap, borderColor: colorGap }}
                      key={day}
                      onClick={() => onGapCellClicked(gap)}
                    />
                  );
                }
                return <TableCell key={day} />;
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
