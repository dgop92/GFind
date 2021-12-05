import React from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import StyledBaseInput from "./StyledInputBase";

export default function TextField({
  label,
  id,
  name,
  formControlProps = {},
  inputLabelProps = {},
  inputBaseProps = {},
}) {
  return (
    <FormControl variant="standard" fullWidth {...formControlProps}>
      <InputLabel shrink htmlFor={id} {...inputLabelProps}>
        {label}
      </InputLabel>
      <StyledBaseInput fullWidth id={id} name={name} {...inputBaseProps} />
    </FormControl>
  );
}
