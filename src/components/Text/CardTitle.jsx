import React from "react";
import Typography from "@mui/material/Typography";

export function CardTitle({ title, extraStyles = {} }) {
  return (
    <Typography
      component="h6"
      variant="h6"
      sx={{
        flexGrow: 1,
        fontFamily: (theme) => theme.typography.titleFontFamily,
        fontWeight: 700,
        ...extraStyles,
      }}
    >
      {title}
    </Typography>
  );
}
