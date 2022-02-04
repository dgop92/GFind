import React from "react";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import { styled } from "@mui/material/styles";

export const PrimaryButton = styled(Button)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
  },
}));

const SecondaryStyledButton = styled(Button)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.secondary.light,
  },
}));

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function CircularButton({ children, color = "secondary", onClick = () => {} }) {
  return (
    <Fab size="small" color={color} sx={{ boxShadow: "none" }} onClick={onClick}>
      {children}
    </Fab>
  );
}

export function SecondaryButton({ children, ...props }) {
  return (
    <SecondaryStyledButton color="secondary" variant="contained" {...props}>
      {children}
    </SecondaryStyledButton>
  );
}
