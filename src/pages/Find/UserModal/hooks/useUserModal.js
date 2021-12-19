import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../../../hooks/useForm";
import { FIND_ACTIONS } from "../../../../state/actionTypes";
import { isEmpty, validateStringRange } from "../../../../utils/validators";

function uniqueUsername({ value, usernames }) {
  if (usernames.includes(value.toLowerCase())) {
    throw Error("Ya agregaste a este usuario");
  }
}

function getValidators(usernames) {
  return [
    ({ value }) => isEmpty({ value, errorMessage: "El usuario no puede estar vacío" }),
    ({ value }) =>
      validateStringRange({
        value,
        maxLenght: 30,
        errorMessage: "El usuario no puede superar los 30 caracteres",
      }),
    ({ value }) => uniqueUsername({ value, usernames }),
  ];
}

export function useUserModal() {
  const dispatch = useDispatch();
  const usernames = useSelector((state) => state.find.usernames);

  const { register, handleSubmit, errors, clearInputs, setErrors } = useForm({
    commonValidators: getValidators(usernames),
  });

  const onSubmit = (data) => {
    clearInputs();
    dispatch({ type: FIND_ACTIONS.ADD_USER, payload: data.username });
  };

  const handleSubmitForm = handleSubmit(onSubmit);

  return { register, handleSubmitForm, errors, setErrors };
}
