import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { Card } from "../../../components/Card";
import { CardTitle } from "../../../components/Text";
import { TextField } from "../../../components/Input";
import { SecondaryButton } from "../../../components/Button";

export default function AutomaticRegister() {
  const handleSubmit = (event) => {
    console.log("hi");
    event.preventDefault();
  };

  return (
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
        <Divider sx={{ borderColor: (theme) => theme.palette.secondary.main, mx: 3 }} />
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "grid", gap: 2, mt: 2, px: { xs: 2, md: 4 }, py: 2 }}
        >
          <TextField
            label="Usuario"
            name="username"
            inputBaseProps={{ autoComplete: "username" }}
          />
          <TextField
            label="Contraseña"
            name="password"
            inputBaseProps={{ type: "password", autoComplete: "current-password" }}
          />
          <TextField
            label="Repetir contraseña"
            name="password_confirmation"
            inputBaseProps={{ type: "password", autoComplete: "current-password" }}
          />
          <SecondaryButton sx={{ mt: 6, mb: 2 }} type="submit">
            Aceptar
          </SecondaryButton>
        </Box>
      </Card>
    </Box>
  );
}
