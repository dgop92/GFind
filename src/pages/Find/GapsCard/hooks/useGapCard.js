import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLoadData } from "../../../../hooks";
import { getApiBodyWithoutUnwantedValues } from "../../../../utils/helpers";

export function useGapCard() {
  const apiOptions = useSelector((state) => state.find.settings.apiOptions);
  const usernames = useSelector((state) => state.find.usernames);

  const {
    loading,
    responseData: gapsData,
    loadData,
  } = useLoadData({ path: "/results" });

  useEffect(() => {
    if (usernames.length >= 2) {
      const cleanApiOptions = getApiBodyWithoutUnwantedValues(apiOptions);
      const body = {
        usernames: usernames,
        ...cleanApiOptions,
      };
      loadData(body);
    }
  }, [apiOptions, loadData, usernames]);

  return { loading, gapsData };
}
