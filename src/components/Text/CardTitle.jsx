import React from "react";
import Typography from "@mui/material/Typography";

export default function CardTitle({ title, extraStyles = {} }) {
  return (
    <Typography
      component="h6"
      variant="h6"
      sx={{
        fontFamily: (theme) => theme.typography.titleFontFamily,
        fontWeight: 700,
        ...extraStyles,
      }}
    >
      {title}
    </Typography>
  );
}
