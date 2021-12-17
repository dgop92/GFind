import React from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import StyledBaseInput from "./StyledInputBase";
import { ErrorMessage } from "./Extra";

export default function TextField({
  label,
  name,
  id = `${name}-id`,
  formControlProps = {},
  inputLabelProps = {},
  inputBaseProps = {},
  errorMessages = [],
}) {
  return (
    <FormControl variant="standard" fullWidth {...formControlProps}>
      {label && (
        <InputLabel shrink htmlFor={id} {...inputLabelProps}>
          {label}
        </InputLabel>
      )}
      <StyledBaseInput fullWidth id={id} name={name} {...inputBaseProps} />
      {errorMessages?.map((errorMessage, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <ErrorMessage key={index}>{errorMessage}</ErrorMessage>
      ))}
    </FormControl>
  );
}
