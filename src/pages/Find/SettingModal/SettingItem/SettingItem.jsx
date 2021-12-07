import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function SettingItem({
  title,
  description,
  inputElement,
  inputBoxStyles = {},
  textContainerStyles = {},
  mdFlexDirection = "row",
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: {
          xs: "column",
          md: mdFlexDirection,
        },
        alignItems: mdFlexDirection === "row" ? "center" : "stretch",
        border: (theme) => `1px solid ${theme.palette.grey[400]}`,
        borderRadius: (theme) => theme.spacing(2),
        px: 2,
        py: 2.5,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", ...textContainerStyles }}>
        <Typography
          variant="body"
          sx={{
            fontWeight: 700,
          }}
        >
          {title}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          ml: { md: 2 },
          width: { xs: "100%", md: "auto" },
          mt: { xs: 2, md: 0 },
          ...inputBoxStyles,
        }}
      >
        {inputElement}
      </Box>
    </Box>
  );
}
