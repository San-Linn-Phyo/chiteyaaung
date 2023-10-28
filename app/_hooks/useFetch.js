import { useEffect, useState } from "react";

export function useFetch(url) {
  const [startFetching, setStartFetching] = useState(false);
  const [userOptions, setUserOptions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  function post({ options, params }) {
    const defaultOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: params && JSON.stringify(params),
    };

    setStartFetching(true);
    setIsLoading(true);
    setUserOptions(options ?? defaultOptions);
  }

  useEffect(() => {
    if (!startFetching) return;

    try {
      fetch(url, userOptions)
        .then((resp) => resp.json())
        .then((data) => {
          setData(data);
          setIsLoading(false);
          setStartFetching(false);
        });
    } catch (error) {
      console.error("useFetch -> Error: ", error);
    }
  }, [userOptions]);

  return { isLoading, data, post };
}
