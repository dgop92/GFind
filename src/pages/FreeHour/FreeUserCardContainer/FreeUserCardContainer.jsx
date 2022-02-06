import React from "react";
import Box from "@mui/material/Box";
import { statusOptions } from "../algorithms";
import { FreeUserCard } from "../FreeUserCard";

const testData = [
  {
    nickname: "PUser 1",
    username: "dkungado",
    availabilyData: {
      status: statusOptions.FREE,
      previousClass: "Última clase empezó: 10:30 AM",
      nextClass: "Proxima clase empieza: 1:30 PM",
    },
  },
  {
    nickname: "Juanito",
    username: "oyayakana",
    availabilyData: {
      status: statusOptions.IN_CLASS,
      previousClass: "Última clase empezó: 11:30 AM",
      nextClass: "Proxima clase empieza: 5:30 PM",
    },
  },
  {
    nickname: "PUser 3",
    username: "pedroski",
    availabilyData: {
      status: statusOptions.IN_CLASS,
      previousClass: "Última clase empezó: 10:30 AM",
      nextClass: "Proxima clase empieza: 1:30 PM",
    },
  },
  {
    nickname: "El Pancho",
    username: "caspancut",
    availabilyData: {
      status: statusOptions.FREE,
      previousClass: "Última clase empezó: 11:30 AM",
      nextClass: "Proxima clase empieza: 5:30 PM",
    },
  },
];

export default function FreeUserCardContainer() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(auto-fill, minmax(250px, 1fr))",
          md: "repeat(auto-fill, minmax(350px, 1fr))",
        },
        mx: { xs: 0, sm: 2, md: 4 },
        my: 2,
      }}
      component="section"
    >
      {testData.map((data) => (
        <FreeUserCard {...data} key={data.username} />
      ))}
    </Box>
  );
}
