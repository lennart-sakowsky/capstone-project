import placeReducer from "./placeReducer";
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

const placeOne = {
  id: 0,
  name: "Public Coffee Roasters",
  street: "Wexstraße 28",
  zipcode: "20355 Hamburg",
  related: false,
  active: false,
  tags: [
    { id: 0, name: "LAUT" },
    { id: 1, name: "KAFFEE" },
  ],
};
const placeTwo = {
  id: 1,
  name: "Hatari",
  street: "Schanzenstraße 4",
  zipcode: "20357 Hamburg",
  related: false,
  active: false,
  tags: [
    { id: 0, name: "BURGER" },
    { id: 1, name: "FRIES" },
  ],
};
const placeThree = {
  id: 3,
  name: "Café Paris",
  street: "Rathausstraße 4",
  zipcode: "20095 Hamburg",
  related: false,
  active: false,
  tags: [
    { id: 0, name: "AMERICANO" },
    { id: 1, name: "LAUT" },
  ],
};

const places = [placeOne, placeTwo, placeThree];

describe("placeReducer", () => {
  it("returns the initial state", () => {
    const state = placeReducer(initialState, "unknown action");
    expect(state).toBe(initialState);
  });
  it("sets isLoading to true and does not change isError or data", () => {
    const newState = placeReducer(initialState, {
      type: fetchInit,
      payload: initialState.data,
    });
    expect(newState.isLoading).toBe(true);
    expect(newState.data).toEqual(initialState.data);
  });
  it("sets isLoading and isError to false and data to payload", () => {
    const newState = placeReducer(loadingState, {
      type: fetchSuccess,
      payload: "fake data",
    });
    expect(newState.isLoading).toBe(false);
    expect(newState.data).toBe("fake data");
  });
  it("sets isLoading to false, isError to true and does not change data", () => {
    const newState = placeReducer(loadingState, {
      type: fetchFailure,
      payload: initialState.data,
    });
    expect(newState.isLoading).toBe(false);
    expect(newState.isError).toBe(true);
    expect(newState.data).toEqual(initialState.data);
  });
  it("sets related to true for places with identical tags, otherwise related should be false", () => {
    const action = { type: setRelated, payload: "laut" };
    const state = { data: places, isLoading: false, isError: false };

    const newState = placeReducer(state, action);
    const expectedState = {
      data: [
        { ...placeOne, related: true },
        { ...placeTwo, related: false },
        { ...placeThree, related: true },
      ],
      isLoading: false,
      isError: false,
    };

    expect(newState).toStrictEqual(expectedState);
  });
  it("sets related to false for every object in the state array", () => {
    const action = { type: setUnrelated };
    const state = {
      data: [
        { ...placeOne, related: true },
        { ...placeTwo, related: false },
        { ...placeThree, related: true },
      ],
      isLoading: false,
      isError: false,
    };

    const newState = placeReducer(state, action);
    const expectedState = {
      data: [
        { ...placeOne, related: false },
        { ...placeTwo, related: false },
        { ...placeThree, related: false },
      ],
      isLoading: false,
      isError: false,
    };

    expect(newState).toStrictEqual(expectedState);
  });
  it("sets active to true if the object in the state array is equal to the payload's object, otherwise active should be false", () => {
    const action = { type: setActive, payload: placeTwo };
    const state = { data: places, isLoading: false, isError: false };

    const newState = placeReducer(state, action);
    const expectedState = {
      data: [
        { ...placeOne, active: false },
        { ...placeTwo, active: true },
        { ...placeThree, active: false },
      ],
      isLoading: false,
      isError: false,
    };

    expect(newState).toStrictEqual(expectedState);
  });
  it("sets active to false for every object in the state array", () => {
    const action = { type: setInactive };
    const state = { data: places, isLoading: false, isError: false };

    const newState = placeReducer(state, action);
    const expectedState = {
      data: [
        { ...placeOne, active: false },
        { ...placeTwo, active: false },
        { ...placeThree, active: false },
      ],
      isLoading: false,
      isError: false,
    };

    expect(newState).toStrictEqual(expectedState);
  });
  it("adds the payload's object to the state array and sets its active property to true", () => {
    const action = { type: addPlace, payload: placeThree };
    const state = {
      data: [placeOne, placeTwo],
      isLoading: false,
      isError: false,
    };

    const newState = placeReducer(state, action);
    const expectedState = {
      data: [placeOne, placeTwo, { ...placeThree, active: true }],
      isLoading: false,
      isError: false,
    };

    expect(newState).toStrictEqual(expectedState);
  });
});
