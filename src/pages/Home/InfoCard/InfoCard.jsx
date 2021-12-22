import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { CardTitle } from "../../../components/Text";

export default function InfoCard({ title, description, imgSrc, imgAlt }) {
  return (
    <Paper
      component="section"
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: (theme) => theme.spacing(4),
      }}
    >
      <img
        src={imgSrc}
        width="100%"
        height={400}
        alt={imgAlt}
        style={{
          borderTopLeftRadius: "inherit",
          borderTopRightRadius: "inherit",
          objectFit: "cover",
        }}
      />
      <Box sx={{ p: 2 }}>
        <CardTitle title={title} extraStyles={{ mb: 2 }} />
        <Typography variant="body2">{description}</Typography>
      </Box>
    </Paper>
  );
}
