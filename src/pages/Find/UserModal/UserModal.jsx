import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { BaseModal, ModalHeader } from "../../../components/Modal";
import { TextField } from "../../../components/Input";
import { SecondaryButton } from "../../../components/Button";
import { isEmpty, validateStringRange } from "../../../utils/validators";
import { FIND_ACTIONS } from "../../../state/actionTypes";

export default function AddUserModal() {
  const [errorMessage, setErrorMessage] = useState("");
  const usernames = useSelector((state) => state.find.usernames);
  const open = useSelector((state) => state.find.isUserModalOpen);
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch({ type: FIND_ACTIONS.TOGGLE_ADD_USER_MODAL_TO, payload: false });
  };

  const handleSubmit = (event) => {
    const username = event.target.username.value;
    try {
      isEmpty({ value: username, errorMessage: "El usuario no puede estar vacío" });
      validateStringRange({
        value: username,
        maxLenght: 30,
        errorMessage: "El usuario no puede superar los 30 caracteres",
      });
      if (usernames.includes(username.toLowerCase())) {
        throw Error("Ya agregaste a este usuario");
      }
      dispatch({ type: FIND_ACTIONS.ADD_USER, payload: username });
      setErrorMessage("");
      // eslint-disable-next-line no-param-reassign
      event.target.username.value = "";
    } catch (error) {
      setErrorMessage(error.message);
    }
    event.preventDefault();
  };

  // on effect for cleaning errorMessage

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      extraBaseStyles={{ maxWidth: 400, width: "95vw" }}
    >
      <form onSubmit={handleSubmit}>
        <ModalHeader title="Agregar Usuario" onClose={onClose} />
        <Box sx={{ mt: 3, width: "100%" }}>
          <TextField id="user-textfield" label="Usuario" name="username" />
        </Box>
        {errorMessage && (
          <Typography
            variant="body2"
            sx={{
              color: "error.dark",
              p: 1,
              pl: 0,
              fontSize: "0.8rem",
            }}
          >
            {errorMessage}
          </Typography>
        )}
        <SecondaryButton type="submit" variant="contained" sx={{ mt: 3 }} fullWidth>
          Aceptar
        </SecondaryButton>
      </form>
    </BaseModal>
  );
}
