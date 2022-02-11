import React, { useState } from "react";
import Box from "@mui/material/Box";
import useFetch from "use-http";
import { useDispatch } from "react-redux";
import { BaseModal, ModalHeader } from "../../../components/Modal";
import { TextField } from "../../../components/Input";
import { SecondaryButton } from "../../../components/Button";
import { isEmpty, validateStringRange } from "../../../utils/validators";
import { useForm } from "../../../hooks/useForm";
import { FREE_ACTIONS } from "../../../state/actionTypes";
import { addRegUser } from "../regUsers";
import { withCenteredBoxLoading } from "../../../components/HOC/loadings";
import { SuccessSnackbar } from "../../../components/Snackbar";

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

const nickNameRegexValidator = ({ value }) => {
  if (!/^[\w ñ]+$/.test(value)) {
    throw Error("Los apodos sólo pueden contener dígitos o letras");
  }
};

const LoadingSecButton = withCenteredBoxLoading(SecondaryButton, { mt: 2 });

export default function FreeHourModal({ open, onClose }) {
  const [successModal, setSuccessModal] = useState(false);
  const { register, handleSubmit, errors, clearInputs, setErrors } = useForm();
  const { get, response, loading } = useFetch();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const resData = await get(`/users/${data.username}`);
    if (response.status === 200) {
      const regUserData = { ...data, schedule: resData.schedule };
      addRegUser(regUserData);
      dispatch({ type: FREE_ACTIONS.ADD_USER, payload: regUserData });
      clearInputs();
      setSuccessModal(true);
    } else if (response.status === 404) {
      setErrors({ username: ["Usuario no encontrado"] });
    } else {
      console.log("500 server error or no service");
    }
  };

  return (
    <>
      <SuccessSnackbar
        open={successModal}
        setOpen={setSuccessModal}
        title="Usuario agregado exitosamente"
      />
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
                  validators: [
                    ...getValidators({ fieldName: "apodo", maxLenght: 20 }),
                    nickNameRegexValidator,
                  ],
                }),
              }}
              errorMessages={errors?.nickname}
            />
          </Box>
          <LoadingSecButton
            loading={loading}
            type="submit"
            variant="contained"
            sx={{ mt: 3 }}
            fullWidth
          >
            Aceptar
          </LoadingSecButton>
        </form>
      </BaseModal>
    </>
  );
}
