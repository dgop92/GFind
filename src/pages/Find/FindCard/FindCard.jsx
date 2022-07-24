import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { CardTitle } from "../../../components/Text";
import { CircularButton } from "../../../components/Button/buttons";

export function FindCardHeader({ name, icon, onClick, description }) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          px: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            py: 2,
            ...(description && { paddingBottom: "0.2rem" }),
          }}
        >
          <CardTitle title={name} extraStyles={{ flexGrow: 1 }} />
          <CircularButton onClick={onClick}>{icon}</CircularButton>
        </Box>
        {description && (
          <Typography variant="body2" sx={{ mb: 2, width: "80%" }}>
            {description}
          </Typography>
        )}
      </Box>
      <Divider sx={{ borderColor: (theme) => theme.palette.secondary.main, mx: 3 }} />
    </>
  );
}
