import deleteReducer from "./deleteReducer";
import {
  deleteInit,
  deleteSuccess,
  deleteFailure,
} from "../actions/deleteActions";

const initialState = {
  isLoading: false,
  isError: false,
};

const deleteState = {
  isLoading: true,
  isError: false,
};

describe("deleteReducer", () => {
  it("sets isLoading to true and does not change isError", () => {
    const newState = deleteReducer(initialState, {
      type: deleteInit,
    });
    expect(newState.isLoading).toBe(true);
    expect(newState.isError).toBe(initialState.isError);
  });

  it("sets isLoading to false and sets isError to true", () => {
    const newState = deleteReducer(deleteState, {
      type: deleteFailure,
    });
    expect(newState.isLoading).toBe(false);
    expect(newState.isError).toBe(true);
  });

  it("sets isLoading and isError to false", () => {
    const newState = deleteReducer(deleteState, {
      type: deleteSuccess,
    });
    expect(newState.isLoading).toBe(false);
    expect(newState.isError).toBe(false);
  });
});
