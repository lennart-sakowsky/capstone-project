import useRequest from "../hooks/useRequest";

export default function CustomRequest() {
  const [{ isLoading, isError }, makeRequest] = useRequest();

  const getRequest = async (endpoint) => {
    return makeRequest("get", endpoint);
  };

  return {
    getRequest,
    isLoading,
    isError,
  };
}
