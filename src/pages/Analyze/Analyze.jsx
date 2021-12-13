import React from "react";
import Box from "@mui/material/Box";
import { UsersCard } from "./UsersCard";
import { HoursCard } from "./HoursCard";

export default function Analyze() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        alignItems: "center",
      }}
    >
      <UsersCard />
      <HoursCard />
    </Box>
  );
}
