import axios from "axios";
import deleteTag from "./deleteTag";

jest.mock("axios");

describe("deleteTag", () => {
  it("calls fetch once and returns a success message", async () => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const getToken = jest.fn(() => "fake token");
    const tagId = 1;
    const placeId = 2;
    const mRes = { data: "fake success message" };
    axios.mockResolvedValueOnce(mRes);
    const actual = await deleteTag(tagId, placeId, getToken);
    expect(actual).toEqual("fake success message");
    expect(axios).toBeCalledWith({
      method: "delete",
      url: `${baseUrl}/tag/${tagId}/place/${placeId}`,
      headers: {
        Authorization: "Bearer fake token",
        "content-type": "application/json",
      },
    });
    expect(axios).toHaveBeenCalledTimes(1);
  });
});
