import React, { useReducer } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Divider from "@mui/material/Divider";
import Fab from "@mui/material/Fab";
import AddUserModal from "./UserModal";
import CardTitle from "../../commons/CardTitle";
import SettingModal from "./SettingModal";
import { ACTIONS, DEFAULT_STATE, FindState, reducer, useFindState } from "./utils";

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
        <AddUserModal />
        <SettingModal />
        <UsersCard />
        <GapsCard />
      </Box>
    </FindState.Provider>
  );
}

function FindCardFAB({ icon, onClick = () => {} }) {
  return (
    <Fab size="small" color="secondary" sx={{ boxShadow: "none" }} onClick={onClick}>
      {icon}
    </Fab>
  );
}

function FindCardHeader({ name, icon, onClick }) {
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

function UsersCard() {
  const { dispatch } = useFindState();
  return (
    <Paper
      component="section"
      elevation={3}
      sx={{
        width: {
          xs: "100%",
          md: "95%",
        },
        minHeight: 300,
        borderRadius: (theme) => theme.spacing(4),
        my: 1.5,
      }}
    >
      <FindCardHeader
        name="Usuarios"
        icon={<AddIcon />}
        onClick={() =>
          dispatch({ type: ACTIONS.TOGGLE_ADD_USER_MODAL_TO, payload: true })
        }
      />
    </Paper>
  );
}

function GapsCard() {
  const { dispatch } = useFindState();

  return (
    <Paper
      component="section"
      elevation={3}
      sx={{
        width: {
          xs: "100%",
          md: "95%",
        },
        minHeight: 500,
        borderRadius: (theme) => theme.spacing(4),
        my: 1.5,
      }}
    >
      <FindCardHeader
        name="Huecos en común"
        icon={<FilterAltIcon />}
        onClick={() =>
          dispatch({ type: ACTIONS.TOGGLE_SETTING_MODAL_TO, payload: true })
        }
      />
    </Paper>
  );
}
