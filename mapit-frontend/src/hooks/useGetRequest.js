import { useState, useEffect } from "react";

export default function useGetRequest() {
  const [data, setData] = useState([]);
  const [url, setUrl] = useState("http://mapit-backend.local/place");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        fetch(url, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            setData(result);
          });
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };
    fetchData();
  }, [url]);

  return [{ data, isLoading, isError }, setUrl];
}
