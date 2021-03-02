import loadingReducer from "./loadingReducer";
import {
  fetchInit,
  fetchSuccess,
  fetchFailure,
} from "../actions/loadingActions";
import {
  setRelated,
  setUnrelated,
  setActive,
  setInactive,
  addPlace,
} from "../actions/placeActions";

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

const loadingState = {
  data: [],
  isLoading: true,
  isError: false,
};

const mockData = [1, 2, 3];

describe("placeReducer", () => {
  it("sets isLoading to true and does not change isError or data", () => {
    const newState = loadingReducer(initialState, {
      type: fetchInit,
      payload: initialState.data,
    });
    expect(newState.isLoading).toBe(true);
    expect(newState.data).toEqual(initialState.data);
  });
  it("sets isLoading and isError to false and data to payload", () => {
    const newState = loadingReducer(loadingState, {
      type: fetchSuccess,
      payload: mockData,
    });
    expect(newState.isLoading).toBe(false);
    expect(newState.data).toBe(mockData);
  });
  it("sets isLoading to false, isError to true and does not change data", () => {
    const newState = loadingReducer(loadingState, {
      type: fetchFailure,
      payload: initialState.data,
    });
    expect(newState.isLoading).toBe(false);
    expect(newState.isError).toBe(true);
    expect(newState.data).toEqual(initialState.data);
  });
});
