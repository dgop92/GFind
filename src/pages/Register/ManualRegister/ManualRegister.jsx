import React, { useState } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { Card } from "../../../components/Card";
import { CardTitle } from "../../../components/Text";
import { ClickableTableCell } from "../../../components/Table/Pieces";
import { UniTable } from "../../../components/Table";
import { TextField } from "../../../components/Input";
import { SecondaryButton } from "../../../components/Button";

function RegisterCell({ cellData, onCellClick, selectedHours }) {
  const { i, j } = cellData;
  let sxProps = {};
  if (`${i}${j}` in selectedHours) {
    sxProps = {
      backgroundColor: (theme) => theme.palette.primary.light,
      borderColor: (theme) => theme.palette.primary.light,
    };
  }
  return <ClickableTableCell onClick={() => onCellClick([i, j])} sx={sxProps} />;
}

export default function ManualRegister() {
  const [selectedHours, setSelectedHours] = useState({});

  const onCellClick = (position) => {
    const [i, j] = position;
    const newKey = `${i}${j}`;
    setSelectedHours((oldSelectedHours) => {
      if (newKey in oldSelectedHours) {
        const { [newKey]: deletedKey, ...newSelectedHours } = oldSelectedHours;
        return newSelectedHours;
      }
      return {
        ...oldSelectedHours,
        [`${i}${j}`]: true,
      };
    });
  };

  const handleSubmit = (event) => {
    console.log("hi");
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card>
        <CardTitle title="Selecciona tu horario" extraStyles={{ py: 2, px: 4 }} />
        <Divider sx={{ borderColor: (theme) => theme.palette.secondary.main, mx: 3 }} />

        <UniTable
          cellClass={RegisterCell}
          extraCellProps={{ onCellClick, selectedHours }}
        />
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ p: 2, px: { xs: 2, md: 3 }, display: "flex", flexDirection: "column" }}
        >
          <TextField label="Usuario" name="username" />
          <SecondaryButton sx={{ alignSelf: "flex-end", mt: 2 }} type="submit">
            Registrarse
          </SecondaryButton>
        </Box>
      </Card>
    </Box>
  );
}
