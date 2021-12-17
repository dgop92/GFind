import { useRef, useState } from "react";

// so far there is no custom validators for fields, just commonValidators
export const useForm = ({ commonValidators = [] }) => {
  const formRef = useRef({});
  const [errors, setErrors] = useState({});

  const register =
    ({ validators = [] } = {}) =>
    (ref) => {
      if (ref?.name && !(`${ref.name}` in formRef.current)) {
        formRef.current[ref.name] = {
          input: ref,
          validators,
        };
      }
    };

  const handleSubmit = (onSubmit) => (e) => {
    e.preventDefault();
    const inputsData = Object.values(formRef.current);
    const currentErrors = {};
    inputsData.forEach((inputData) => {
      commonValidators.forEach((validatorFunc) => {
        try {
          validatorFunc({ value: inputData.input.value });
        } catch (error) {
          const oldArr = currentErrors[inputData.input.name] || [];
          currentErrors[inputData.input.name] = [...oldArr, error.message];
        }
      });
    });
    if (Object.keys(currentErrors).length === 0) {
      const formData = Object.keys(formRef.current).reduce(
        (accObj, keyName) => ({
          ...accObj,
          [keyName]: formRef.current[keyName].input.value,
        }),
        {}
      );
      onSubmit(formData);
      setErrors({});
    } else {
      setErrors(currentErrors);
    }
  };

  const clearInputs = () => {
    const inputsData = Object.values(formRef.current);
    inputsData.forEach((inputData) => {
      // eslint-disable-next-line no-param-reassign
      inputData.input.value = "";
    });
  };

  return { register, handleSubmit, errors, setErrors, clearInputs };
};
