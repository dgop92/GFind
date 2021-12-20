import { useState } from "react";
import useFetch from "use-http";
import { useForm } from "../../../../hooks/useForm";
import { isEmpty } from "../../../../utils/validators";
import { UNEXPECTED_ERROR_MESSAGE } from "../../../../utils/constants";

export function useAutomaticRegister() {
  const [successModal, setSuccessModal] = useState(false);
  const { post, loading, response } = useFetch();

  const { register, handleSubmit, errors, setErrors, clearInputs } = useForm({
    commonValidators: [isEmpty],
  });

  const onSubmit = async (data) => {
    const resData = await post("/register", data);

    if (resData === undefined) {
      // no response from server or timeout
      setErrors({ non_field_errors: [UNEXPECTED_ERROR_MESSAGE] });
    } else if (response.status === 201) {
      clearInputs();
      setSuccessModal(true);
    } else if (response.status === 400) {
      setErrors(resData);
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
  };
}
