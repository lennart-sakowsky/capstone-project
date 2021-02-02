import useRequest from "../hooks/useRequest";

export default function useCustomRequest() {
  const [{ isLoading, isError }, makeRequest] = useRequest();

  const getRequest = async (endpoint) => {
    return makeRequest("get", endpoint);
  };

  const deleteRequest = async (endpoint) => {
    return makeRequest("delete", endpoint);
  };

  const postRequest = async (endpoint, body) => {
    return makeRequest("post", endpoint, body);
  };

  const putRequest = async (endpoint, body) => {
    return makeRequest("put", endpoint, body);
  };

  function getPlaces(endpoint) {
    return getRequest(`${endpoint}/place`).then((response) => {
      return response;
    });
  }

  function del(endpoint, tagId, placeId) {
    if (!tagId && !placeId) {
      return deleteRequest(`${endpoint}/logout`).then((response) => {
        return response;
      });
    }

    if (!tagId || !placeId) {
      console.error("To delete sth, tag id and place id are needed.");
    }

    const url = `${endpoint}/tag/${tagId}/place/${placeId}`;
    return deleteRequest(url).then((response) => {
      return response;
    });
  }

  function postUser(endpoint, body) {
    return postRequest(`${endpoint}/login`, body).then((response) => {
      return response;
    });
  }

  function postPlace(endpoint, body) {
    return postRequest(`${endpoint}/place`, body).then((response) => {
      return response;
    });
  }

  function postTag(endpoint, body) {
    return postRequest(`${endpoint}/tag`, body).then((response) => {
      return response;
    });
  }

  function putTag(endpoint, body) {
    return putRequest(`${endpoint}/tag`, body).then((response) => {
      return response;
    });
  }

  return {
    isLoading,
    isError,
    getPlaces,
    del,
    postUser,
    postPlace,
    postTag,
    putTag,
  };
}
