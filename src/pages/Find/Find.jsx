import React, { useReducer } from "react";
import Box from "@mui/material/Box";
import { UserModal } from "./UserModal";
import { SettingModal } from "./SettingModal";
import { DEFAULT_STATE, reducer } from "./stateManagement";
import { FindState } from "./context";
import { UsersCard } from "./UsersCard";
import { GapsCard } from "./GapsCard";

export default function Find() {
  const [findState, dispatch] = useReducer(reducer, DEFAULT_STATE);
  return (
    // is only re render when the dispatch is called.
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <FindState.Provider value={{ findState, dispatch }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          alignItems: "center",
        }}
      >
        <UserModal />
        <SettingModal />
        <UsersCard />
        <GapsCard />
      </Box>
    </FindState.Provider>
  );
}
