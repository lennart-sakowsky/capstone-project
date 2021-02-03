import useRequest from "./useRequest";

export default function useCustomRequest() {
  const [{ isLoading, isError }, makeRequest] = useRequest();

  const getRequest = (baseUrl) => {
    return makeRequest("get", baseUrl);
  };

  const postRequest = async (baseUrl, body) => {
    return makeRequest("post", baseUrl, body);
  };

  const putRequest = async (baseUrl, body) => {
    return makeRequest("put", baseUrl, body);
  };

  const deleteRequest = (baseUrl) => {
    return makeRequest("delete", baseUrl);
  };

  async function getPlaces(baseUrl) {
    return await getRequest(`${baseUrl}/place`);
  }

  async function postRegisterUser(baseUrl, body) {
    return await postRequest(`${baseUrl}/user`, body);
  }

  async function postUser(baseUrl, body) {
    return await postRequest(`${baseUrl}/login`, body);
  }

  async function postPlace(baseUrl, body) {
    return await postRequest(`${baseUrl}/place`, body);
  }

  async function postTag(baseUrl, body) {
    return await postRequest(`${baseUrl}/tag`, body);
  }

  async function putTag(baseUrl, body) {
    return await putRequest(`${baseUrl}/tag`, body);
  }

  async function deleteTag(baseUrl, tagId, placeId) {
    if (!tagId || !placeId) {
      console.error("To delete sth, tag id and place id are required.");
    }
    const url = `${baseUrl}/tag/${tagId}/place/${placeId}`;
    return await deleteRequest(url);
  }

  async function deleteUser(baseUrl) {
    return await deleteRequest(`${baseUrl}/logout`);
  }

  return {
    isLoading,
    isError,
    getPlaces,
    postRegisterUser,
    postUser,
    postPlace,
    postTag,
    putTag,
    deleteTag,
    deleteUser,
  };
}
