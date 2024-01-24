import { useEffect, useState, useCallback } from "react";

async function sendHttpRequest(url: string, config?: any) {
  const response = await fetch(url, config);

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData || "Something went wrong, failed to send request.");
  }

  return resData;
}

export default function useHttp(url: string, config?: any) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback(
    async function sendRequest() {
      try {
        const resData = await sendHttpRequest(url, config);
        setData(resData);
      } catch (error: any) {
        setError(error.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    },
    [url, config]
  );

  useEffect(() => {
    if (config && config.method === "GET") {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
  };
}
