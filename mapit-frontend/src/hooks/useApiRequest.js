import { useState, useEffect } from "react";

export default function useApiRequest(url, requestMethod, rawData) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(rawData);

    const requestOptions = {
      method: requestMethod,
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    function fetchData() {
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setData(result);
          console.log("This is the " + result);
        });
    }
    fetchData();
  }, [url, requestMethod]);

  return { data };
}
