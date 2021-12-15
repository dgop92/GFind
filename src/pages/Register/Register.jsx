import React from "react";
import Box from "@mui/material/Box";
import BuildIcon from "@mui/icons-material/Build";
import AutoFixNormalIcon from "@mui/icons-material/AutoFixNormal";
import { RegisterCard } from "./RegisterCard";

const temporalDescription = `
Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur sunt
beatae illo incidunt consectetur veniam nulla doloribus porro suscipit
soluta. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
quas, aperiam enim amet et pariatur iusto repudiandae totam officiis
facilis!
`;

const cardData = [
  {
    title: "Registro manual",
    description: temporalDescription,
    iconClass: BuildIcon,
    path: "/register/manual",
  },
  {
    title: "Registro automático",
    description: temporalDescription,
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
