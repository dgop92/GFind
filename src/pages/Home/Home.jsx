/* eslint-disable global-require */
import React from "react";
import Box from "@mui/material/Box";
import { InfoCard } from "./InfoCard";

// TODO, data, <picture>, and images can be improved.
const infoCardData = [
  {
    title: "¿Qué es?",
    description: `Es una aplicación que puedes usar para buscar los mejores huecos 
    entre clases para reunirte con tus compañeros o amigos con la finalidad 
    de crear un grupo de estudio, charlar entre otras cosas.`,
    imgSrcUpMd: require("../../assets/homeImages/what-1.PNG").default,
    imgSrcUpXs: require("../../assets/homeImages/what-1.PNG").default,
    imgAlt: "Pequeñas tarjetas que muestran los diferentes huecos",
    extraImgStyles: { objectPosition: "left top" },
  },
  {
    title: "¿Por qué usarlo?",
    description: `Podrás buscar tus huecos de manera más rápida que la convencional, 
    además de que encontrarás los mejores, es decir aquellos que no se alejen mucho de 
    tus clases.`,
    imgSrcUpMd: require("../../assets/homeImages/why-1.PNG").default,
    imgSrcUpXs: require("../../assets/homeImages/why-1.PNG").default,
    imgAlt: "Tabla que muestra los diferentes huecos y sus calidades",
    extraImgStyles: { objectPosition: "right top" },
  },
  {
    title: "¿Cómo usarlo?",
    description: `Simplemente registrate, luego ingresa los usuarios uninorte de las 
    personas con las que quieres buscar huecos en común y listo escoge el que más te 
    guste.`,
    imgSrcUpMd: require("../../assets/homeImages/how-1.PNG").default,
    imgSrcUpXs: require("../../assets/homeImages/how-1.PNG").default,
    imgAlt: "Tabla que muestra la forma para registrarse ",
    extraImgStyles: { objectPosition: "left top" },

    paperStyles: { alignSelf: "stretch" },
  },
  {
    title: "Nuevo: Análisis",
    description: `Ahora puedes analizar los horarios de múltiples usuarios para 
    encontrar horas con la mayor disponibilidad posible, en otras palabras, horas donde 
    la mayoría de los estudiantes no están en clase. Está funcionalidad es útil para 
    organizar horarios de atención por parte de los monitores del CREE`,
    imgSrcUpMd: require("../../assets/homeImages/analisis-1.PNG").default,
    imgSrcUpXs: require("../../assets/homeImages/analisis-1.PNG").default,
    imgAlt: "Tabla que muestra las diferentes obras y su porcentaje de disponibilidad ",
    extraImgStyles: { objectPosition: "left top" },
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
