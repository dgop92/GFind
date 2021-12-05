import React from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import MuiSelect from "@mui/material/Select";
import StyledBaseInput from "./StyledInputBase";

export default function Select({
  label,
  name,
  id = `${name}-id`,
  currentValue,
  handleChange,
  menuItemsData,
  formControlProps = {},
  inputLabelProps = {},
  inputBaseProps = {},
}) {
  return (
    <FormControl variant="standard" {...formControlProps}>
      {label && (
        <InputLabel shrink id={id} {...inputLabelProps}>
          {label}
        </InputLabel>
      )}
      <MuiSelect
        labelId={id}
        id={id}
        name={name}
        value={currentValue}
        onChange={handleChange}
        input={<StyledBaseInput {...inputBaseProps} />}
      >
        {menuItemsData.map((menuItemData) => (
          <MenuItem key={menuItemData.value} value={menuItemData.value}>
            {menuItemData.text}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
}
