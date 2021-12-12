import React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TableCell } from "./TableCell";

export default function TableHeader({ columnNames }) {
  return (
    <TableHead>
      <TableRow>
        {columnNames.map((colunmName) => (
          <TableCell key={colunmName}>{colunmName}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
