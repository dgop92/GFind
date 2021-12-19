import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { CardTitle } from "../../../components/Text";
import { CircularButton } from "../../../components/Button/buttons";

export function FindCardHeader({ name, icon, onClick }) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 4,
          py: 2,
        }}
      >
        <CardTitle title={name} extraStyles={{ flexGrow: 1 }} />
        <CircularButton onClick={onClick}>{icon}</CircularButton>
      </Box>
      <Divider sx={{ borderColor: (theme) => theme.palette.secondary.main, mx: 3 }} />
    </>
  );
}
