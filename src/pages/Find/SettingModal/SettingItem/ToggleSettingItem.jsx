import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import SettingItem from "./SettingItem";
import { ToggleButtonGroup } from "../../../../components/Input";

export function ToggleSettingItem({
  title,
  description,
  toggleOptions,
  values,
  handleChange,
}) {
  return (
    <SettingItem
      title={title}
      description={description}
      mdFlexDirection="column"
      inputElement={
        <ToggleButtonGroup value={values} onChange={handleChange}>
          {toggleOptions.map((toggleOption) => (
            <ToggleButton
              color="secondary"
              size="small"
              key={toggleOption.value}
              value={toggleOption.value}
              sx={{ m: 1, borderRadius: 2 }}
            >
              {toggleOption.text}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      }
      inputBoxStyles={{ justifyContent: "center", width: "100%", mt: 2 }}
    />
  );
}
