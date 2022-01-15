import { useState } from "react";
import useFetch from "use-http";
import { useForm } from "../../../../hooks/useForm";
import { isEmpty } from "../../../../utils/validators";
import { UNEXPECTED_ERROR_MESSAGE } from "../../../../utils/constants";

function getIndicesFromSelectedHours(selectedHours) {
  return Object.keys(selectedHours).map((s) => s.split("-").map(Number));
}

export function useManualRegister() {
  const [selectedHours, setSelectedHours] = useState({});
  const [successModal, setSuccessModal] = useState(false);

  const onCellClick = (position) => {
    const [i, j] = position;
    const newKey = `${i}-${j}`;
    setSelectedHours((oldSelectedHours) => {
      if (newKey in oldSelectedHours) {
        const { [newKey]: deletedKey, ...newSelectedHours } = oldSelectedHours;
        return newSelectedHours;
      }
      return {
        ...oldSelectedHours,
        [`${i}-${j}`]: true,
      };
    });
  };

  const { post, loading, response } = useFetch();

  const { register, handleSubmit, errors, setErrors, clearInputs } = useForm({
    commonValidators: [isEmpty],
  });

  const onSubmit = async (data) => {
    const bodyData = {
      list_of_indices: getIndicesFromSelectedHours(selectedHours),
      ...data,
    };
    const resData = await post("/manual", bodyData);
    if (resData === undefined) {
      // no response from server or timeout
      setErrors({ non_field_errors: [UNEXPECTED_ERROR_MESSAGE] });
    } else if (response.status === 201) {
      clearInputs();
      setSuccessModal(true);
    } else if (response.status === 400) {
      if ("list_of_indices" in resData) {
        const oldArr = resData.non_field_errors || [];
        setErrors({
          ...resData,
          non_field_errors: [...oldArr, ...resData.list_of_indices],
        });
      } else {
        setErrors(resData);
      }
    } else {
      // TODO snackbar
      console.log("500 error or something else");
      setErrors({ non_field_errors: [UNEXPECTED_ERROR_MESSAGE] });
    }
  };

  const handleSubmitForm = handleSubmit(onSubmit);

  return {
    register,
    handleSubmitForm,
    errors,
    loading,
    setSuccessModal,
    successModal,
    onCellClick,
    selectedHours,
  };
}
