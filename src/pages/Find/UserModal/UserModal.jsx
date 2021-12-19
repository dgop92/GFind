import React from "react";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import { BaseModal, ModalHeader } from "../../../components/Modal";
import { TextField } from "../../../components/Input";
import { SecondaryButton } from "../../../components/Button";
import { FIND_ACTIONS } from "../../../state/actionTypes";
import { useUserModal } from "./hooks/useUserModal";

export default function AddUserModal() {
  const open = useSelector((state) => state.find.isUserModalOpen);
  const dispatch = useDispatch();
  const { register, handleSubmitForm, errors, setErrors } = useUserModal();

  const onClose = () => {
    setErrors({});
    dispatch({ type: FIND_ACTIONS.TOGGLE_ADD_USER_MODAL_TO, payload: false });
  };

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      extraBaseStyles={{ maxWidth: 400, width: "95vw" }}
    >
      <form onSubmit={handleSubmitForm}>
        <ModalHeader title="Agregar Usuario" onClose={onClose} />
        <Box sx={{ mt: 3, width: "100%" }}>
          <TextField
            label="Usuario"
            name="username"
            inputBaseProps={{ autoComplete: "username", inputRef: register() }}
            errorMessages={errors?.username}
          />
        </Box>
        <SecondaryButton type="submit" variant="contained" sx={{ mt: 3 }} fullWidth>
          Aceptar
        </SecondaryButton>
      </form>
    </BaseModal>
  );
}
