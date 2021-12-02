import React from "react";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const StyledBaseInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: theme.spacing(1),
    position: "relative",
    border: `1px solid ${theme.palette.grey[500]}`,
    fontSize: 14,
    padding: 8,
  },
}));

export default function TextField({
  label,
  id,
  formControlProps = {},
  inputLabelProps = {},
  inputBaseProps = {},
}) {
  return (
    <FormControl variant="standard" fullWidth {...formControlProps}>
      <InputLabel shrink htmlFor={id} {...inputLabelProps}>
        {label}
      </InputLabel>
      <StyledBaseInput fullWidth id={id} {...inputBaseProps} />
    </FormControl>
  );
}
