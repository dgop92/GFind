import React from "react";
import MuiTableCell from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

export const TableCell = styled((props) => <MuiTableCell size="small" {...props} />)(
  ({ theme }) => ({
    border: `1px solid ${theme.palette.grey[400]}`,
  })
);

export const ClickableTableCell = styled((props) => (
  <MuiTableCell size="small" {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[400]}`,
  cursor: "pointer",
  "&:hover": {
    opacity: 0.85,
  },
}));

/* export const TableCell = styled((props) => <MuiTableCell size="small" {...props} />)(
  ({  }) => ({
    border: "none",
  })
);

export const ClickableTableCell = styled((props) => (
  <MuiTableCell size="small" {...props} />
))(({  }) => ({
  border: "none",
  cursor: "pointer",
  "&:hover": {
    opacity: 0.85,
  },
})); */

// border: `1px solid ${theme.pallete.grey[500]}`
