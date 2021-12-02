import React from "react";
import Button from "@mui/material/Button";
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

export function SecondaryButton({ children, ...props }) {
  return (
    <SecondaryStyledButton color="secondary" variant="contained" {...props}>
      {children}
    </SecondaryStyledButton>
  );
}
