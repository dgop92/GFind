import React from "react";
import Box from "@mui/material/Box";
import { BaseModal, ModalHeader } from "../../../components/Modal";
import { TextField } from "../../../components/Input";
import { SecondaryButton } from "../../../components/Button";
import { isEmpty, validateStringRange } from "../../../utils/validators";
import { useForm } from "../../../hooks/useForm";

function getValidators({ fieldName = "Campo", maxLenght }) {
  return [
    ({ value }) =>
      isEmpty({ value, errorMessage: `El ${fieldName} no puede estar vacío` }),
    ({ value }) =>
      validateStringRange({
        value,
        maxLenght,
        errorMessage: `El ${fieldName} no puede superar los ${maxLenght} caracteres`,
      }),
  ];
}

export default function FreeHourModal({ open, onClose }) {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      extraBaseStyles={{ maxWidth: 400, width: "95vw" }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader title="Agregar Usuario" onClose={onClose} />
        <Box sx={{ display: "grid", mt: 3, width: "100%", gap: 1 }}>
          <TextField
            label="Usuario Uninorte"
            name="username"
            inputBaseProps={{
              autoComplete: "username",
              inputRef: register({
                validators: getValidators({ fieldName: "usuario", maxLenght: 30 }),
              }),
            }}
            errorMessages={errors?.username}
          />
          <TextField
            label="Apodo"
            name="nickname"
            inputBaseProps={{
              inputRef: register({
                validators: getValidators({ fieldName: "apodo", maxLenght: 15 }),
              }),
            }}
            errorMessages={errors?.nickname}
          />
        </Box>
        <SecondaryButton type="submit" variant="contained" sx={{ mt: 3 }} fullWidth>
          Aceptar
        </SecondaryButton>
      </form>
    </BaseModal>
  );
}
