import React from "react";
import SettingItem from "./SettingItem";
import { Select } from "../../../../components/Input";

export function SelectSettingItem({
  title,
  description,
  name,
  currentValue,
  handleChange,
  menuItemsData,
  mdWidth = 200,
}) {
  return (
    <SettingItem
      title={title}
      description={description}
      inputElement={
        <Select
          name={name}
          menuItemsData={menuItemsData}
          currentValue={currentValue}
          handleChange={handleChange}
          formControlProps={{
            sx: { width: { xs: "100%", md: mdWidth } },
          }}
        />
      }
    />
  );
}
