import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDidMount, useLoadData } from "../../../../hooks";
import {
  appendToFormDataHelper,
  convertCamelCaseToSnakeCase,
  getApiBodyWithoutUnwantedValues,
  pipe,
} from "../../../../utils/helpers";

export function useHoursCard() {
  const usernameData = useSelector((state) => state.analyze.usernameData);
  const isMount = useDidMount();

  // no-cache is a temporal solution
  const {
    loading,
    responseData: hoursData,
    loadData,
  } = useLoadData({ path: "/analyze", fetchOptions: { cachePolicy: "no-cache" } });

  useEffect(() => {
    if (!isMount) {
      const cleanObj = pipe(
        getApiBodyWithoutUnwantedValues,
        convertCamelCaseToSnakeCase
      );
      const cleanBody = cleanObj(usernameData);
      if ("usernames_file" in cleanBody) {
        const formDataBody = new FormData();
        Object.keys(cleanBody).forEach((keyName) => {
          appendToFormDataHelper(formDataBody, keyName, cleanBody[keyName]);
        });
        loadData(formDataBody);
      } else {
        loadData(cleanBody);
      }
    }
    // in the first render, i don't want to make and api call
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadData, usernameData]);

  return { loading, hoursData };
}
