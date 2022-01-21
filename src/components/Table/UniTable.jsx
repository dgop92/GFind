import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { DAYS, HOURS } from "../../utils/constants";
import { TableHeader, TableCell } from "./Pieces";

const columnNames = ["Hora", ...DAYS];

export default function UniTable({ cellClass: CellComp, extraCellProps = {} }) {
  return (
    <TableContainer sx={{ py: 1.5, px: { xs: 1.5, md: 3 } }}>
      <Table sx={{ minWidth: 800 }} data-test="uni-table">
        <TableHeader columnNames={columnNames} />
        <TableBody>
          {HOURS.map((hour, i) => (
            <TableRow key={hour}>
              <TableCell>{hour}</TableCell>

              {DAYS.map((day, j) => (
                <CellComp
                  key={`${day}${hour}`}
                  cellData={{ i, j, hour, day }}
                  {...extraCellProps}
                />
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
