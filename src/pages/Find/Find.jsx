import React from "react";
import Box from "@mui/material/Box";
import { UserModal } from "./UserModal";
import { SettingModal } from "./SettingModal";
import { UsersCard } from "./UsersCard";
import { GapsCard } from "./GapsCard";

export default function Find() {
  return (
    // is only re render when the dispatch is called.
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        alignItems: "center",
      }}
    >
      <UserModal />
      <UsersCard />
      <GapsCard />
      <SettingModal />
    </Box>
  );
}
