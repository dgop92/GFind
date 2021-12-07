import React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import { ACTIONS } from "../stateManagement";
import { useFindState } from "../context";
import { FindCardHeader } from "../FindCard";

export default function UsersCard() {
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
