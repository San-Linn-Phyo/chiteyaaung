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

  function postWithFile({ options, params }) {
    const formData = new FormData();
    formData.append("name", params.name);
    formData.append("ph_no", params.ph_no);
    formData.append("password", params.password);
    formData.append("age", params.age);
    formData.append("gender", params.gender);
    formData.append("image", params.image);

    const defaultOptions = {
      method: "POST",
      body: formData,
    };

    setStartFetching(true);
    setIsLoading(true);
    setUserOptions(options ?? defaultOptions);
  }

  useEffect(() => {
    if (!startFetching) return;

    try {
      console.log("URL", url);
      console.log("UserOptions", userOptions);

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

  return { isLoading, data, post, postWithFile };
}
