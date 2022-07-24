import React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import BuildIcon from "@mui/icons-material/Build";
import AutoFixNormalIcon from "@mui/icons-material/AutoFixNormal";
import { RegisterCard } from "./RegisterCard";

const cardData = [
  {
    title: "Registro manual",
    description: `Regístrate seleccionando tú mismo las horas donde tienes clases 
    junto con tu usuario uninorte. Este método de registro es temporal y será eliminado 
    al cabo de una semana. Usa este método para probar la aplicación unas cuantas veces 
    y no quedar registrado durante todo el semestre.`,
    iconClass: BuildIcon,
    path: "/register/manual",
  },
  {
    title: "Registro automático",
    description: (
      <>
        Regístrate proporcionando tu usuario y contraseña uninorte, pero tranquilo no
        guardamos tu contraseña solo tu usuario uninorte e información de cuando tienes
        clases o no. Este método de registro es permanente durante todo el semestre y
        usa la página de{" "}
        <Link
          href="https://mihorario.herokuapp.com/"
          target="_blank"
          underline="hover"
          color="primary"
          sx={{ color: "hsla(207, 37%, 36.1%, 1)" }}
          rel="noopener"
        >
          “horario de colores”
        </Link>{" "}
        para obtener el horario. Si cambiaste de horario puedes actualizarlo realizando
        el mismo proceso de registro. Nota: algunas veces el horario de colores no es
        capaz de diferenciar de un error inesperado entre uno de usuario o contraseña
        incorrecta, así que ten cuidado de realizar múltiples peticiones.
      </>
    ),
    iconClass: AutoFixNormalIcon,
    path: "/register/automatic",
  },
];

export default function Register() {
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
      {cardData.map((data) => (
        <RegisterCard key={data.title} {...data} />
      ))}
    </Box>
  );
}
