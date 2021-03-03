import axios from "axios";
import registerUser from "./registerUser";

jest.mock("axios");

describe("registerUser", () => {
  it("calls fetch once with supplied data", async () => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const mRes = { data: "fake data" };
    axios.mockResolvedValueOnce(mRes);
    const actual = await registerUser({
      firstName: "fake first name",
      lastName: "fake last name",
      email: "user@mock.com",
      password: "fake password",
    });
    expect(actual).toEqual("fake data");
    expect(axios).toBeCalledWith({
      method: "post",
      url: `${baseUrl}/user`,
      headers: { "Content-Type": "application/json" },
      data: {
        firstName: "fake first name",
        lastName: "fake last name",
        email: "user@mock.com",
        password: "fake password",
      },
    });
  });
});
