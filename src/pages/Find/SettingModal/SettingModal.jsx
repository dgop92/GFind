import React from "react";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { BaseModal, ModalHeader } from "../../../components/Modal";
import { DAYS, SETTINGS_SCOPE } from "../../../utils/constants";
import { SelectSettingItem } from "./SettingItem/SelectSettingItem";
import { SwitchSettingItem } from "./SettingItem/SwitchSettingItem";
import { ToggleSettingItem } from "./SettingItem/ToggleSettingItem";
import { FIND_ACTIONS } from "../../../state/actionTypes";
import { useSettingModal } from "./hooks/useSettingModal";

const viewOptions = [
  {
    value: "simple",
    text: "Simple",
  },
  {
    value: "table",
    text: "Tabla",
  },
];

const daysOptions = DAYS.map((day, index) => ({ value: index, text: day }));

export default function SettingModal() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.find.isSettingModalOpen);

  const { handleDays, handleSettingsChange, settingsData } = useSettingModal();

  const onClose = () => {
    dispatch({ type: FIND_ACTIONS.TOGGLE_SETTING_MODAL_TO, payload: false });
  };

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      extraBaseStyles={{
        maxWidth: 1500,
        width: "95vw",
        height: "95vh",
        maxHeight: 700,
        overflowY: "auto",
      }}
    >
      <ModalHeader title="Configuraciones" onClose={onClose} />
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
        <SelectSettingItem
          title="Vista"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua."
          name="view"
          currentValue={settingsData.preferences.view}
          handleChange={(event) =>
            handleSettingsChange(event, SETTINGS_SCOPE.PREFERENCES)
          }
          menuItemsData={viewOptions}
        />
        <SwitchSettingItem
          title="Días sin clase"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua."
          name="no_classes_day"
          checked={settingsData.apiOptions.no_classes_day}
          handleChange={(event) =>
            handleSettingsChange(event, SETTINGS_SCOPE.API_OPTIONS)
          }
        />
        <SwitchSettingItem
          title="Igualdad de cercanía"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua."
          name="compute_sd"
          checked={settingsData.apiOptions.compute_sd}
          handleChange={(event) =>
            handleSettingsChange(event, SETTINGS_SCOPE.API_OPTIONS)
          }
        />
        <SwitchSettingItem
          title="Ignorar fin de semana"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua."
          name="ignore_weekend"
          checked={settingsData.apiOptions.ignore_weekend}
          handleChange={(event) =>
            handleSettingsChange(event, SETTINGS_SCOPE.API_OPTIONS)
          }
        />
        <ToggleSettingItem
          title="Filtrar por dias"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua."
          name="days_to_filter"
          toggleOptions={daysOptions}
          values={settingsData.apiOptions.days_to_filter}
          handleChange={handleDays}
        />
      </Box>
    </BaseModal>
  );
}
