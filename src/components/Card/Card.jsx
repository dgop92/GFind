import React from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const Card = styled((props) => <Paper component="section" elevation={3} {...props} />)(
  ({ theme }) => ({
    borderRadius: theme.spacing(4),
    margin: `${theme.spacing(3)} 0`,
    [theme.breakpoints.up("xs")]: {
      width: "100%",
    },
    [theme.breakpoints.up("md")]: {
      width: "95%",
    },
  })
);

export default Card;
