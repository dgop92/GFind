import { useCallback, useState } from "react";
import useFetch from "use-http";

export function useLoadData({ path, fetchOptions = {} }) {
  const [responseData, setResponseData] = useState({ error: false, data: {} });
  const { post, loading, response } = useFetch(fetchOptions);

  const loadData = useCallback(
    async (body) => {
      const resData = await post(path, body);
      if (response.ok) {
        setResponseData({ error: false, data: resData });
      } else {
        setResponseData({ error: true, data: resData });
      }
    },
    [post, response.ok, path]
  );

  return { loading, responseData, loadData };
}
