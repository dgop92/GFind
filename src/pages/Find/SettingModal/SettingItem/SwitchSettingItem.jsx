import React from "react";
import SettingItem from "./SettingItem";
import { Switch } from "../../../../components/Input";

export function SwitchSettingItem({ title, description, name, checked, handleChange }) {
  return (
    <SettingItem
      title={title}
      description={description}
      inputElement={
        <Switch
          id={`${name}-id`}
          name={name}
          checked={checked}
          onChange={handleChange}
        />
      }
      textContainerStyles={{ flexGrow: 1 }}
      inputBoxStyles={{
        justifyContent: "flex-end",
      }}
    />
  );
}
