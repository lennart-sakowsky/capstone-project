import axios from "axios";
import loginUser from "./loginUser";

jest.mock("axios");

describe("loginUser", () => {
  it("calls fetch once with supplied data", async () => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const mRes = { data: "fake data" };
    axios.mockResolvedValueOnce(mRes);
    const actual = await loginUser({
      email: "user@mock.com",
      password: "fake password",
    });
    expect(actual).toEqual("fake data");
    expect(axios).toBeCalledWith({
      method: "post",
      url: `${baseUrl}/login`,
      headers: { "content-type": "application/json" },
      data: { email: "user@mock.com", password: "fake password" },
    });
  });
});
