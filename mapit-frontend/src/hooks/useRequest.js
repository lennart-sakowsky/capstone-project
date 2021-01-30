import { useState } from "react";
import authHeader from "../lib/authHeader";
import axios from "axios";

export default function useRequest() {
  const defaultHeader = authHeader();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const makeRequest = (method, url, body) => {
    setIsLoading(true);
    const options = {
      method: method,
      url: url,
      headers: defaultHeader,
      data: body,
    };
    try {
      return axios(options).then((response) => response.data);
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  return [{ isLoading, isError }, makeRequest];
}
