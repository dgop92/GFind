import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Card } from "../../../components/Card";
import { SecondaryButton } from "../../../components/Button";

export default function RegisterCard({
  iconClass: IconClass,
  title,
  description,
  path,
}) {
  return (
    <Card
      sx={{ p: 1, margin: (theme) => `${theme.spacing(1)} 0`, width: { md: "70%" } }}
    >
      <Box sx={{ display: "flex" }}>
        <IconClass
          sx={{
            width: "128px",
            height: "128px",
            m: 2,
            color: (theme) => theme.palette.primary.main,
            display: { md: "inline-block", xs: "none" },
          }}
        />
        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1, m: 2 }}>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body1" sx={{ flexGrow: 1, mb: 3 }}>
            {description}
          </Typography>
          <SecondaryButton sx={{ alignSelf: "flex-end" }} component="a" href={path}>
            Ir al registro
          </SecondaryButton>
        </Box>
      </Box>
    </Card>
  );
}
