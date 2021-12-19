import React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../../../components/Card";
import { FindCardHeader } from "../FindCard";
import { FIND_ACTIONS } from "../../../state/actionTypes";

export default function UsersCard() {
  const dispatch = useDispatch();
  const usernames = useSelector((state) => state.find.usernames);

  const removeUser = (username) => {
    dispatch({
      type: FIND_ACTIONS.REMOVE_USER,
      payload: username,
    });
  };

  return (
    <Card
      sx={{
        minHeight: 300,
      }}
    >
      <FindCardHeader
        name="Usuarios"
        icon={<AddIcon />}
        onClick={() =>
          dispatch({ type: FIND_ACTIONS.TOGGLE_ADD_USER_MODAL_TO, payload: true })
        }
      />
      <Box sx={{ display: "flex", flexWrap: "wrap", mx: { xs: 2, md: 3 }, my: 2 }}>
        {usernames.map((username) => (
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
    </Card>
  );
}
