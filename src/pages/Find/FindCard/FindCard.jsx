import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Fab from "@mui/material/Fab";
import { CardTitle } from "../../../components/Text";

export function FindCardFAB({ icon, onClick = () => {} }) {
  return (
    <Fab size="small" color="secondary" sx={{ boxShadow: "none" }} onClick={onClick}>
      {icon}
    </Fab>
  );
}

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
        <FindCardFAB icon={icon} onClick={onClick} />
      </Box>
      <Divider sx={{ borderColor: (theme) => theme.palette.secondary.main, mx: 3 }} />
    </>
  );
}