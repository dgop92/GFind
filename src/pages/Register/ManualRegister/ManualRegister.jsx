import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { Card } from "../../../components/Card";
import { CardTitle } from "../../../components/Text";
import { UniTable } from "../../../components/Table";
import { TextField, NonFieldErrors } from "../../../components/Input";
import { SecondaryButton } from "../../../components/Button";
import { SuccessSnackbar } from "../../../components/Snackbar";
import { withCenteredBoxLoading } from "../../../components/HOC/loadings";
import RegisterCell from "./RegisterCell/RegisterCell";
import { useManualRegister } from "./hooks";

function ButtonContainer({ errors }) {
  return (
    <Box sx={{ mt: 2, width: "100" }}>
      <SecondaryButton fullWidth type="submit">
        Aceptar
      </SecondaryButton>
      {"non_field_errors" in errors && <NonFieldErrors errors={errors} />}
    </Box>
  );
}

const LButtonContainer = withCenteredBoxLoading(ButtonContainer, { mt: 4, mb: 2 });

export default function ManualRegister() {
  const {
    register,
    handleSubmitForm,
    errors,
    loading,
    setSuccessModal,
    successModal,
    onCellClick,
    selectedHours,
  } = useManualRegister();

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
        <Card>
          <CardTitle title="Selecciona tu horario" extraStyles={{ py: 2, px: 4 }} />
          <Divider
            sx={{ borderColor: (theme) => theme.palette.secondary.main, mx: 3 }}
          />

          <UniTable
            cellClass={RegisterCell}
            extraCellProps={{ onCellClick, selectedHours }}
          />
          <Box
            component="form"
            onSubmit={handleSubmitForm}
            sx={{
              p: 2,
              px: { xs: 2, md: 3 },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextField
              label="Usuario"
              name="username"
              inputBaseProps={{ autoComplete: "username", inputRef: register() }}
              errorMessages={errors?.username}
            />
            <LButtonContainer loading={loading} errors={errors} />
          </Box>
        </Card>
      </Box>
    </>
  );
}
