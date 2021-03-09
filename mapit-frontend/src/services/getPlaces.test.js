import axios from "axios";
import getPlaces from "./getPlaces";

jest.mock("axios");

describe("getPlaces", () => {
  it("calls fetch once and returns a place object", async () => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const getToken = jest.fn(() => "fake token");
    const mRes = { data: "fake data" };
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
});
