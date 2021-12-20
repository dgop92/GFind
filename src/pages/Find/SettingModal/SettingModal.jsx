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
          description="La vista por tabla proporciona una vista espacial de todos los 
          huecos. La vista simple muestra en forma de lista los huecos disponibles 
          organizados de mejor a peor."
          name="view"
          currentValue={settingsData.preferences.view}
          handleChange={(event) =>
            handleSettingsChange(event, SETTINGS_SCOPE.PREFERENCES)
          }
          menuItemsData={viewOptions}
        />
        <SwitchSettingItem
          title="Mostrar Avg y Sd"
          description="El promedio de cercanía con las clases es representado con avg. 
          La inestabilidad entre la distancia de los huecos a las clases por todos los 
          participantes es representada con sd (Desviación estándar)."
          name="showAvgSd"
          checked={settingsData.preferences.showAvgSd}
          handleChange={(event) =>
            handleSettingsChange(event, SETTINGS_SCOPE.PREFERENCES)
          }
        />
        <SwitchSettingItem
          title="Días sin clase"
          description="Activa esta opción para que el algoritmo no ignore aquellos días 
          donde un usuario no tenga clases. En otras palabras, si un usuario no tiene 
          clases el jueves, en ese día no se encontraron huecos."
          name="no_classes_day"
          checked={settingsData.apiOptions.no_classes_day}
          handleChange={(event) =>
            handleSettingsChange(event, SETTINGS_SCOPE.API_OPTIONS)
          }
        />
        <SwitchSettingItem
          title="Igualdad de cercanía"
          description="Activa esta opción para mantener casi igual la distancia de los 
          huecos a las clases por todos los participantes."
          name="compute_sd"
          checked={settingsData.apiOptions.compute_sd}
          handleChange={(event) =>
            handleSettingsChange(event, SETTINGS_SCOPE.API_OPTIONS)
          }
        />
        <SwitchSettingItem
          title="Ignorar fin de semana"
          description="Desactiva esta opción para tener en cuenta los fines de semana."
          name="ignore_weekend"
          checked={settingsData.apiOptions.ignore_weekend}
          handleChange={(event) =>
            handleSettingsChange(event, SETTINGS_SCOPE.API_OPTIONS)
          }
        />
        <ToggleSettingItem
          title="Filtrar por dias"
          description="Selecciona los días que deseas filtrar en la búsqueda de huecos."
          name="days_to_filter"
          toggleOptions={daysOptions}
          values={settingsData.apiOptions.days_to_filter}
          handleChange={handleDays}
        />
      </Box>
    </BaseModal>
  );
}
