import axios from "axios";
import deleteUser from "./deleteUser";

jest.mock("axios");

describe("deleteUser", () => {
  it("calls fetch once and returns a success message", async () => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const getToken = jest.fn(() => "fake token");
    const mRes = { data: "fake success message" };
    axios.mockResolvedValueOnce(mRes);
    const actual = await deleteUser(getToken);
    expect(actual).toEqual("fake success message");
    expect(axios).toBeCalledWith({
      method: "delete",
      url: `${baseUrl}/logout`,
      headers: {
        Authorization: "Bearer fake token",
        "content-type": "application/json",
      },
    });
  });
});
