import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { ANALYZE_ACTIONS } from "../../../../state/actionTypes";

export function useUserCard() {
  const inputFileRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const dispatch = useDispatch();

  const onInputChange = () => {
    const currentFile = inputFileRef.current.files[0];
    if (currentFile?.name) {
      setFileName(currentFile.name);
    } else {
      setFileName("");
    }
  };

  const handleSubmit = (event) => {
    const usernamesFile = event.target.usernames_file.files[0];
    const usernameToFilter = event.target.username_to_filter.value;
    const extraUsernames = event.target.extra_usernames.value;
    dispatch({
      type: ANALYZE_ACTIONS.UPDATE_USERNAMES_DATA,
      payload: { usernamesFile, usernameToFilter, extraUsernames },
    });
    event.preventDefault();
  };

  return { inputFileRef, fileName, onInputChange, handleSubmit };
}
