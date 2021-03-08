import axios from "axios";
import deleteTag from "./deleteTag";

jest.mock("axios");

describe("deleteTag", () => {
  it("calls fetch once and returns a success message", async () => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const getToken = jest.fn(() => "fake token");
    const tagId = 1;
    const placeId = 2;
    const mRes = { status: 200, data: "fake success message" };
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

  it('should throw error "Not authorized" if status code equals 401', async () => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const tagId = 1;
    const placeId = 2;
    const mRes = {
      status: 401,
      text: jest.fn().mockReturnValue("Not authorized"),
    };
    const getToken = jest.fn(() => "fake token");
    axios.mockResolvedValueOnce(mRes);
    const logSpy = jest.spyOn(console, "log");
    const actual = await deleteTag(tagId, placeId, getToken);
    expect(actual).toBeUndefined();
    expect(axios).toBeCalledWith({
      method: "delete",
      url: `${baseUrl}/tag/${tagId}/place/${placeId}`,
      headers: {
        Authorization: "Bearer fake token",
        "content-type": "application/json",
      },
    });
    expect(mRes.text).toBeCalledTimes(1);
    expect(logSpy).toBeCalledWith(new Error("Not authorized"));
  });

  it('should throw error "Success: false" if status code equals 404', async () => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const tagId = 1;
    const placeId = 2;
    const mRes = {
      status: 404,
      text: jest.fn().mockReturnValue("Success: false"),
    };
    const getToken = jest.fn(() => "fake token");
    axios.mockResolvedValueOnce(mRes);
    const logSpy = jest.spyOn(console, "log");
    const actual = await deleteTag(tagId, placeId, getToken);
    expect(actual).toBeUndefined();
    expect(axios).toBeCalledWith({
      method: "delete",
      url: `${baseUrl}/tag/${tagId}/place/${placeId}`,
      headers: {
        Authorization: "Bearer fake token",
        "content-type": "application/json",
      },
    });
    expect(mRes.text).toBeCalledTimes(1);
    expect(logSpy).toBeCalledWith(new Error("Success: false"));
  });
});
