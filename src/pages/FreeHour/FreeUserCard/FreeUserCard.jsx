import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { statusOptions } from "../algorithms";

const headerColor = {
  [statusOptions.FREE]: "#16A085",
  [statusOptions.IN_CLASS]: "#E74C3C",
  outOfRange: "#6D6D6D",
};

export default function FreeUserCard({ cardRegUser }) {
  return (
    <Paper elevation={2} sx={{ borderRadius: 2, m: 1 }}>
      <Box
        sx={{
          borderRadius: "inherit",
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          px: 2,
          py: 1,
          backgroundColor:
            headerColor[cardRegUser.availabilyData?.status] || headerColor.outOfRange,
          color: "primary.contrastText",
        }}
      >
        <Typography
          component="h6"
          variant="body1"
          sx={{
            fontFamily: (theme) => theme.typography.titleFontFamily,
            fontWeight: 700,
          }}
        >
          {cardRegUser.nickname}
        </Typography>
        <Typography variant="body2">{cardRegUser.username}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "inherit",
          p: 2,
          borderRadius: "inherit",
        }}
      >
        {typeof cardRegUser.availabilyData === "string" ? (
          <Typography variant="body2">{cardRegUser.availabilyData}</Typography>
        ) : (
          <>
            <Typography variant="body2">
              Estado: {cardRegUser.availabilyData.status}
            </Typography>
            <Typography variant="body2">
              {cardRegUser.availabilyData.previousClass}
            </Typography>
            <Typography variant="body2">
              {cardRegUser.availabilyData.nextClass}
            </Typography>
          </>
        )}
      </Box>
    </Paper>
  );
}
