import React, { useState } from "react";
import Box from "@mui/material/Box";
import { BaseModal, ModalHeader } from "../../commons/modals";
import SettingItem from "./SettingItem";
import Select from "../../commons/inputs/Select";
import Switch from "../../commons/inputs/Switch";
import { ACTIONS, useFindState } from "./utils";

const tempData = [
  {
    value: 1,
    text: "pedroski",
  },
  {
    value: 2,
    text: "unwosmt",
  },
];

export default function SettingModal() {
  const [value, setValue] = useState(1);
  const { findState, dispatch } = useFindState();

  const closeModal = () => {
    dispatch({ type: ACTIONS.TOGGLE_SETTING_MODAL_TO, payload: false });
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const [checked, setChecked] = React.useState(true);

  const handleChangeSwitch = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <BaseModal
      open={findState.isSettingModalOpen}
      onClose={closeModal}
      extraBaseStyles={{
        maxWidth: 1500,
        width: "95vw",
        height: "95vh",
        maxHeight: 700,
        overflowY: "auto",
      }}
    >
      <ModalHeader title="Configuraciones" onClose={closeModal} />
      <Box
        sx={{
          display: "grid",
          gap: 2,
          mt: 2,
          gridTemplateColumns: {
            lg: "1fr 1fr",
          },
        }}
      >
        <SettingItem
          title="Hello config"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua."
          inputElement={
            <Select
              id="temp"
              menuItemsData={tempData}
              currentValue={value}
              handleChange={handleChange}
              formControlProps={{ sx: { width: { xs: "100%", md: 200 } } }}
            />
          }
        />
        <SettingItem
          title="Hello config"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua."
          inputElement={
            <Select
              id="temp"
              menuItemsData={tempData}
              currentValue={value}
              handleChange={handleChange}
              formControlProps={{
                sx: { width: { xs: "100%", md: 200 } },
              }}
            />
          }
        />
        <SettingItem
          title="Hello config"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua."
          inputElement={<Switch checked={checked} onChange={handleChangeSwitch} />}
          inputBoxStyles={{ justifyContent: "flex-end", width: "100%" }}
        />
      </Box>
    </BaseModal>
  );
}
