import React, { useState } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import useFetch from "use-http";
import { Card } from "../../../components/Card";
import { CardTitle } from "../../../components/Text";
import { NonFieldErrors, TextField } from "../../../components/Input";
import { SecondaryButton } from "../../../components/Button";
import { useForm } from "../../../hooks/useForm";
import { isEmpty } from "../../../utils/validators";
import { CenteredBox } from "../../../components/CommonLayout";
import { UNEXPECTED_ERROR_MESSAGE } from "../../../utils/constants";
import { SuccessSnackbar } from "../../../components/Snackbar";

export default function AutomaticRegister() {
  const [successModal, setSuccessModal] = useState(false);
  const { post, loading, response } = useFetch();

  const { register, handleSubmit, errors, setErrors, clearInputs } = useForm({
    commonValidators: [isEmpty],
  });

  const onSubmit = async (data) => {
    const resData = await post("/register", data);

    if (resData === undefined) {
      // no response from server or timeout
      setErrors({ non_field_errors: [UNEXPECTED_ERROR_MESSAGE] });
    } else if (response.status === 201) {
      clearInputs();
      setSuccessModal(true);
    } else if (response.status === 400) {
      setErrors(resData);
    } else {
      // TODO snackbar
      console.log("500 error or something else");
      setErrors({ non_field_errors: [UNEXPECTED_ERROR_MESSAGE] });
    }
  };

  return (
    <>
      <SuccessSnackbar
        open={successModal}
        setOpen={setSuccessModal}
        title="Registro exitoso"
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card sx={{ width: { md: "70%" }, maxWidth: "600px" }}>
          <CardTitle title="Registrate" extraStyles={{ py: 2, px: 4 }} />
          <Divider
            sx={{ borderColor: (theme) => theme.palette.secondary.main, mx: 3 }}
          />
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: "grid", gap: 2, mt: 2, px: { xs: 2, md: 4 }, py: 2 }}
          >
            <TextField
              label="Usuario"
              name="username"
              inputBaseProps={{ autoComplete: "username", inputRef: register() }}
              errorMessages={errors?.username}
            />
            <TextField
              label="Contraseña"
              name="password"
              inputBaseProps={{
                type: "password",
                autoComplete: "current-password",
                inputRef: register(),
              }}
              errorMessages={errors?.password}
            />
            <TextField
              label="Repetir contraseña"
              name="password_confirmation"
              inputBaseProps={{
                type: "password",
                autoComplete: "current-password",
                inputRef: register(),
              }}
              errorMessages={errors?.password_confirmation}
            />
            {loading ? (
              <CenteredBox sx={{ mt: 6, mb: 2 }}>
                <CircularProgress color="primary" />
              </CenteredBox>
            ) : (
              <Box sx={{ mt: 6, mb: 2, width: "100" }}>
                <SecondaryButton fullWidth type="submit">
                  Aceptar
                </SecondaryButton>
                {"non_field_errors" in errors && <NonFieldErrors errors={errors} />}
              </Box>
            )}
          </Box>
        </Card>
      </Box>
    </>
  );
}
