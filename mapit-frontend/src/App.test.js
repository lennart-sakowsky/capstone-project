import { getByAltText, render, screen } from "@testing-library/react";
import App, { handleFetchPlaces } from "./App";
import {
  fetchFailure,
  fetchInit,
  fetchSuccess,
} from "./actions/loadingActions";
import axios from "axios";

jest.mock("axios");

afterEach(() => {
  jest.clearAllMocks();
});

describe("App", () => {
  it("renders the landing page correctly", () => {
    const { getByText } = render(<App />);
    const displayedLogoImage = document.querySelector("img");
    expect(displayedLogoImage.src).toMatch(/mapitLogo.svg/);
    expect(getByText(/MapIt/)).not.toBeNull();
  });
  it("dispatches fetchInit and calls getPlaces()", async () => {
    const getPlaces = axios.mockImplementationOnce(() =>
      Promise.resolve({
        data: [{ name: "mock cafe 1" }, { name: "mock cafe 2" }],
      })
    );
    const dispatch = jest.fn();
    await handleFetchPlaces(dispatch, getPlaces);
    expect(dispatch).toHaveBeenCalledWith({
      type: fetchInit,
    });
    expect(dispatch).toHaveBeenCalledTimes(2);
  });
  it("dispatches fetchSuccess if fetching data has been successful", async () => {
    const getPlaces = axios.mockResolvedValue();
    const dispatch = jest.fn();
    await handleFetchPlaces(dispatch, getPlaces);
    expect(dispatch).toHaveBeenCalledWith({
      type: fetchSuccess,
    });
    expect(dispatch).toHaveBeenCalledTimes(2);
  });
  it("dispatches fetchFailure if the response is an error message", async () => {
    const getPlaces = axios.mockRejectedValue(new Error("error message"));
    const dispatch = jest.fn();
    await handleFetchPlaces(dispatch, getPlaces);
    expect(dispatch).toHaveBeenCalledWith({
      type: fetchFailure,
    });
    expect(dispatch).toHaveBeenCalledTimes(2);
  });
});
