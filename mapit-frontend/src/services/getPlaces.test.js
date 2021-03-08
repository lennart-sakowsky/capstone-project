import axios from "axios";
import getPlaces from "./getPlaces";

jest.mock("axios");

describe("getPlaces", () => {
  it("calls fetch once and returns a place object", async () => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const getToken = jest.fn(() => "fake token");
    const mRes = { status: 200, data: "fake data" };
    axios.mockResolvedValueOnce(mRes);
    const actual = await getPlaces(getToken);
    expect(actual).toEqual("fake data");
    expect(axios).toBeCalledWith({
      method: "get",
      url: `${baseUrl}/place`,
      headers: {
        Authorization: "Bearer fake token",
        "content-type": "application/json",
      },
    });
    expect(axios).toHaveBeenCalledTimes(1);
  });

  it('should throw error "Not authorized" if status code equals 401', async () => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const mRes = {
      status: 401,
      text: jest.fn().mockReturnValue("Not authorized"),
    };
    const getToken = jest.fn(() => "fake token");
    axios.mockResolvedValueOnce(mRes);
    const logSpy = jest.spyOn(console, "log");
    const actual = await getPlaces(getToken);
    expect(actual).toBeUndefined();
    expect(axios).toBeCalledWith({
      method: "get",
      url: `${baseUrl}/place`,
      headers: {
        Authorization: "Bearer fake token",
        "content-type": "application/json",
      },
    });
    expect(mRes.text).toBeCalledTimes(1);
    expect(logSpy).toBeCalledWith(new Error("Not authorized"));
  });
});
