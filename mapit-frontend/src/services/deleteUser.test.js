import axios from "axios";
import deleteUser from "./deleteUser";

jest.mock("axios");

describe("deleteUser", () => {
  it("calls fetch once and returns a success message", async () => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const getToken = jest.fn(() => "fake token");
    const mRes = { status: 200, data: "fake success message" };
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
  it('should throw error "Session has expired" if status code equals 401', async () => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const mRes = {
      status: 401,
      text: jest.fn().mockReturnValue("Session has expired"),
    };
    const getToken = jest.fn(() => "fake token");
    axios.mockResolvedValueOnce(mRes);
    const logSpy = jest.spyOn(console, "log");
    const actual = await deleteUser(getToken);
    expect(actual).toBeUndefined();
    expect(axios).toBeCalledWith({
      method: "delete",
      url: `${baseUrl}/logout`,
      headers: {
        Authorization: "Bearer fake token",
        "content-type": "application/json",
      },
    });
    expect(mRes.text).toBeCalledTimes(1);
    expect(logSpy).toBeCalledWith(new Error("Session has expired"));
  });
  it('should throw error "Token not found" if status code equals 422', async () => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const mRes = {
      status: 422,
      text: jest.fn().mockReturnValue("Token not found"),
    };
    const getToken = jest.fn(() => "fake token");
    axios.mockResolvedValueOnce(mRes);
    const logSpy = jest.spyOn(console, "log");
    const actual = await deleteUser(getToken);
    expect(actual).toBeUndefined();
    expect(axios).toBeCalledWith({
      method: "delete",
      url: `${baseUrl}/logout`,
      headers: {
        Authorization: "Bearer fake token",
        "content-type": "application/json",
      },
    });
    expect(mRes.text).toBeCalledTimes(1);
    expect(logSpy).toBeCalledWith(new Error("Token not found"));
  });
});
