import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { Card } from "../../../components/Card";
import { CardTitle } from "../../../components/Text";
import { NonFieldErrors, TextField } from "../../../components/Input";
import { SecondaryButton } from "../../../components/Button";
import { SuccessSnackbar } from "../../../components/Snackbar";
import { useAutomaticRegister } from "./hooks";
import { withCenteredBoxLoading } from "../../../components/HOC/loadings";

function ButtonContainer({ errors }) {
  return (
    <Box sx={{ mt: 6, mb: 2, width: "100" }}>
      <SecondaryButton fullWidth type="submit">
        Aceptar
      </SecondaryButton>
      {"non_field_errors" in errors && <NonFieldErrors errors={errors} />}
    </Box>
  );
}

const LButtonContainer = withCenteredBoxLoading(ButtonContainer, { mt: 6, mb: 2 });

export default function AutomaticRegister() {
  const { register, handleSubmitForm, errors, loading, setSuccessModal, successModal } =
    useAutomaticRegister();

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
            onSubmit={handleSubmitForm}
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
            <LButtonContainer loading={loading} errors={errors} />
          </Box>
        </Card>
      </Box>
    </>
  );
}
