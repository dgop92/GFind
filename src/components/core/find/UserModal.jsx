import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { BaseModal, ModalHeader } from "../../commons/modals";
import TextField from "../../commons/inputs/TextField";
import { SecondaryButton } from "../../commons/buttons";
import { ACTIONS, useFindState } from "./utils";
import { isEmpty, validateStringRange } from "../../../utils/validators";

export default function AddUserModal() {
  const { findState, dispatch } = useFindState();
  const [errorMessage, setErrorMessage] = useState("");

  const closeModal = () => {
    dispatch({ type: ACTIONS.TOGGLE_ADD_USER_MODAL_TO, payload: false });
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
      dispatch({ type: ACTIONS.ADD_USER, payload: username });
      setErrorMessage("");
      // eslint-disable-next-line no-param-reassign
      event.target.username.value = "";
    } catch (error) {
      setErrorMessage(error.message);
    }
    event.preventDefault();
  };

  return (
    <BaseModal
      open={findState.isUserModalOpen}
      onClose={closeModal}
      extraBaseStyles={{ maxWidth: 400, width: "95vw" }}
    >
      <form onSubmit={handleSubmit}>
        <ModalHeader title="Agregar Usuario" onClose={closeModal} />
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
