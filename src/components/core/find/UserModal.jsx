import React from "react";
import Box from "@mui/material/Box";
import { BaseModal, ModalHeader } from "../../commons/modals";
import TextField from "../../commons/inputs/TextField";
import { SecondaryButton } from "../../commons/buttons";

export default function UserModal({ modal, setModal }) {
  return (
    <BaseModal
      open={modal}
      setModal={setModal}
      extraBaseStyles={{ maxWidth: 400, width: "95vw" }}
    >
      <ModalHeader title="Agregar Usuario" setModal={setModal} />
      <Box sx={{ mt: 3, width: "100%" }}>
        <TextField id="user-textfield" label="Usuario" />
      </Box>
      <SecondaryButton variant="contained" sx={{ mt: 3 }} fullWidth>
        Aceptar
      </SecondaryButton>
    </BaseModal>
  );
}
