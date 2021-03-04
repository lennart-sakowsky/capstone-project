import axios from "axios";
import postTag from "./postTag";

jest.mock("axios");

describe("postTag", () => {
  it("calls fetch once with supplied data", async () => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const getToken = jest.fn(() => "fake token");
    const mRes = { data: "fake data" };
    axios.mockResolvedValueOnce(mRes);
    const actual = await postTag(
      {
        name: "FAKE TAG",
        taggedPlace: {
          name: "Fake Cafe",
          street: "Fake street",
        },
      },
      getToken
    );
    expect(actual).toEqual("fake data");
    expect(axios).toBeCalledWith({
      method: "post",
      url: `${baseUrl}/tag`,
      headers: {
        Authorization: "Bearer fake token",
        "content-type": "application/json",
      },
      data: {
        name: "FAKE TAG",
        taggedPlace: {
          name: "Fake Cafe",
          street: "Fake street",
        },
      },
    });
  });
});
