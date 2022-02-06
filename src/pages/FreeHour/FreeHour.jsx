import React from "react";
import Box from "@mui/material/Box";
import { FreeSettingsCard } from "./FreeSettingsCard";
import { FreeUserCardContainer } from "./FreeUserCardContainer";

export default function FreeHour() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
      }}
    >
      <FreeSettingsCard />
      <FreeUserCardContainer />
    </Box>
  );
}
