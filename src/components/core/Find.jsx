import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";

export default function Find() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexGrow: 1,
        justifyContent: "center",
        flexDirection: {
          xs: "column",
          md: "row",
        },
      }}
    >
      <FindNameContainer name="Usuarios" />
      <FindNameContainer name="Huecos en común" />
    </Box>
  );
}

function FindNameContainer({ name }) {
  return (
    <Paper
      component="section"
      elevation={2}
      sx={{
        width: "90vw",
        maxWidth: 550,
        margin: "1.5rem 2rem",
        height: "65vh",
        borderRadius: (theme) => theme.spacing(2),
      }}
    >
      <Typography variant="h6" sx={{ padding: "1.5rem 2rem", fontWeight: 700 }}>
        {name}
      </Typography>
      <Divider sx={{ borderColor: (theme) => theme.palette.secondary.main, mx: 3 }} />
    </Paper>
  );
}
