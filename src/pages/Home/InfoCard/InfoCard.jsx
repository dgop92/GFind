import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useMediaQuery } from "@mui/material";
import { CardTitle } from "../../../components/Text";

export default function InfoCard({
  title,
  description,
  imgSrcUpMd,
  imgSrcUpXs,
  extraImgStyles = {},
  paperStyles = {},
  imgAlt,
}) {
  const belowMd = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const { md: mdStyles, ...imgStyles } = extraImgStyles;
  const finalImgStyles = belowMd ? { ...imgStyles, ...mdStyles } : imgStyles;

  return (
    <Paper
      component="section"
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: (theme) => theme.spacing(4),
        ...paperStyles,
      }}
    >
      <picture>
        <source media="(min-width: 900px)" srcSet={imgSrcUpMd} alt={imgAlt} />
        <img
          src={imgSrcUpXs}
          alt={imgAlt}
          width="100%"
          height={belowMd ? 300 : 400}
          style={{
            borderTopLeftRadius: "inherit",
            borderTopRightRadius: "inherit",
            objectFit: "cover",
            ...finalImgStyles,
          }}
        />
      </picture>
      <Box sx={{ p: 2 }}>
        <CardTitle title={title} extraStyles={{ mb: 2 }} />
        <Typography variant="body2">{description}</Typography>
      </Box>
    </Paper>
  );
}
