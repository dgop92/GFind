import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { getPercent } from "../../../../utils/helpers";

export default function SimpleGapContainer({ gaps }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(auto-fill, minmax(250px, 1fr))",
          md: "repeat(auto-fill, minmax(350px, 1fr))",
        },
        mx: 2,
        my: 2,
      }}
    >
      {gaps?.map((gap) => (
        <GapItem key={`${gap.day_index}${gap.hour_index}`} gap={gap} showAvgSd />
      ))}
    </Box>
  );
}

function GapItem({ gap, showAvgSd = false }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 2,
        m: 1,
        border: (theme) => `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 2,
      }}
    >
      <Typography variant="body1" sx={{ mb: 1 }}>
        {gap.day} - {gap.hour}
      </Typography>
      <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
        Calidad: {getPercent(gap.quality)}
      </Typography>
      {showAvgSd && (
        <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
          {/* Sd is optional */}
          Avg: {gap.avg.toFixed(2)} - Sd: {gap?.sd?.toFixed(2) || "No calculado"}
        </Typography>
      )}
    </Box>
  );
}
