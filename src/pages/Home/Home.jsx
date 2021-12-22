import React from "react";
import Box from "@mui/material/Box";
import { InfoCard } from "./InfoCard";

const temporalDescription = `
Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur sunt
beatae illo incidunt consectetur veniam nulla doloribus porro suscipit
soluta. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
quas, aperiam enim amet et pariatur iusto repudiandae totam officiis
facilis!
`;

const infoCardData = [
  {
    title: "¿Qué es?",
    description: temporalDescription,
    imgSrc: "https://via.placeholder.com/800x400",
    imgAlt: "placeholder-1",
  },
  {
    title: "¿Por qué usarlo?",
    description: temporalDescription,
    imgSrc: "https://via.placeholder.com/800x400",
    imgAlt: "placeholder-2",
  },
  {
    title: "¿Cómo usarlo?",
    description: temporalDescription,
    imgSrc: "https://via.placeholder.com/800x400",
    imgAlt: "placeholder-3",
  },
  {
    title: "Nuevo: Análisis",
    description: temporalDescription,
    imgSrc: "https://via.placeholder.com/800x400",
    imgAlt: "placeholder-4",
  },
];

export default function Home() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(auto-fill, minmax(280px, 1fr))",
          sm: "repeat(auto-fill, minmax(550px, 1fr))",
        },
        flexGrow: 1,
        placeItems: "center",
        gap: 3,
        p: { xs: 0, md: 2 },
      }}
    >
      {infoCardData.map((data) => (
        <InfoCard key={data.title} {...data} />
      ))}
    </Box>
  );
}
