import React, { useReducer } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
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
  const { findState, dispatch } = useFindState();

  const removeUser = (username) => {
    dispatch({
      type: ACTIONS.REMOVE_USER,
      payload: username,
    });
  };

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
      <Box sx={{ display: "flex", flexWrap: "wrap", mx: { xs: 2, md: 3 }, my: 2 }}>
        {findState.usernames.map((username) => (
          <Chip
            sx={{ m: 0.5 }}
            key={username}
            label={username}
            color="primary"
            variant="outlined"
            onDelete={() => removeUser(username)}
          />
        ))}
      </Box>
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
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(auto-fill, minmax(250px, 1fr))",
            md: "repeat(auto-fill, minmax(350px, 1fr))",
          },
          mx: 2,
          my: 2,
        }}
      >
        <GapItem
          gap={{
            day: "Martes",
            hour: "1:30 PM",
            avg: 1,
            day_index: 1,
            hour_index: 7,
            sd: 0,
          }}
          showAvgSd
        />
      </Box>
    </Paper>
  );
}

function GapItem({ gap, showAvgSd = false }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 2,
        m: 1,
        border: (theme) => `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 2,
      }}
    >
      <Typography variant="body1">
        {gap.day} - {gap.hour}
      </Typography>
      {showAvgSd && (
        <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
          Avg: {gap.avg.toFixed(2)} - Sd: {gap.sd.toFixed(2)}
        </Typography>
      )}
    </Box>
  );
}
