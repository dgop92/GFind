import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { Card } from "../../../components/Card";
import { SecondaryButton } from "../../../components/Button";
import { CardTitle } from "../../../components/Text";
import { TextField } from "../../../components/Input";
import { CircularButton } from "../../../components/Button/buttons";
import { useUserCard } from "./hooks";

export default function UsersCard() {
  const { inputFileRef, fileName, onInputChange, handleSubmit } = useUserCard();

  return (
    <Card sx={{ minHeight: 300 }}>
      <CardTitle title="Usuarios" extraStyles={{ py: 2, px: 4 }} />
      <Divider sx={{ borderColor: (theme) => theme.palette.secondary.main, mx: 3 }} />

      <Box
        sx={{ px: 3, py: 2.5, display: "grid", gap: 2 }}
        component="form"
        onSubmit={handleSubmit}
      >
        <Box sx={{ display: "flex" }}>
          <Box sx={{ display: "grid", gap: 1, flexGrow: 1 }}>
            <Typography sx={{ fontWeight: 700 }} variant="body">
              Archivo de Usuarios
            </Typography>
            <Typography variant="body2">
              Selecciona un archivo con los nombres de usuarios a analizar. Asegurate de
              que el archivo posea la extensión txt, y tenga el siguiente formato:{" "}
              <Link
                href="/examples/archivo_de_usuarios.txt"
                target="_blank"
                color="inherit"
                rel="noopener"
              >
                Ejemplos de archivo de usuarios
              </Link>{" "}
              .
            </Typography>
            <Typography variant="body2">Archivo seleccionado: {fileName}</Typography>
          </Box>
          <Box sx={{ mx: 1.5, display: "flex", alignItems: "center" }}>
            <input
              ref={inputFileRef}
              name="usernames_file"
              type="file"
              accept=".txt"
              hidden
              onChange={onInputChange}
            />
            <CircularButton
              onClick={() => inputFileRef.current && inputFileRef.current.click()}
            >
              <InsertDriveFileIcon />
            </CircularButton>
          </Box>
        </Box>
        <UserInputContainer title="Usuario a ignorar" name="username_to_filter">
          Opcionalmente puedes escribir el nombre de un usuario para ignorar sus horas
          de clases. Generalmente este va a ser el monitor de clase.
        </UserInputContainer>
        <UserInputContainer title="Usuarios extras" name="extra_usernames">
          Se pueden agregar más usuarios escribiendo sus nombres de usuario separados
          por coma, ejemplo: “pedcosanaide,wilnardes”. Incluso puedes no subir un
          archivo si vas a analizar unos cuantos usuarios usando este método.
        </UserInputContainer>
        <SecondaryButton type="submit" sx={{ mt: 2 }}>
          Analizar
        </SecondaryButton>
      </Box>
    </Card>
  );
}

function UserInputContainer({ title, children, name }) {
  return (
    <Box sx={{ display: "grid", gap: 1 }}>
      <Typography sx={{ fontWeight: 700 }} variant="body">
        {title}
      </Typography>
      <Typography variant="body2">{children}</Typography>
      <TextField name={name} />
    </Box>
  );
}
