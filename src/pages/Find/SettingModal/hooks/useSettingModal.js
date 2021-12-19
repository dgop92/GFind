import { useSelector, useDispatch } from "react-redux";
import { FIND_ACTIONS } from "../../../../state/actionTypes";

export function useSettingModal() {
  const settingsData = useSelector((state) => state.find.settings);
  const dispatch = useDispatch();

  const updateSettings = (newSettings) => {
    dispatch({ type: FIND_ACTIONS.UPDATE_SETTINGS, payload: newSettings });
  };

  const handleSettingsChange = (event, settingKey) => {
    const { name, type: inputType } = event.target;
    let value;
    if (inputType === "checkbox") {
      value = event.target.checked;
    } else {
      value = event.target.value;
    }
    updateSettings({
      ...settingsData,
      [settingKey]: {
        ...settingsData[settingKey],
        [name]: value,
      },
    });
  };

  const handleDays = (_, newDays) => {
    updateSettings({
      ...settingsData,
      apiOptions: {
        ...settingsData.apiOptions,
        days_to_filter: newDays,
      },
    });
  };

  return { handleDays, handleSettingsChange, settingsData };
}
