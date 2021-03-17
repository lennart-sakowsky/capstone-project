import postingReducer from "./postingReducer";
import { postInit, postSuccess, postFailure } from "../actions/postingActions";

const initialState = {
  isPosting: false,
  isError: false,
};

const postingState = {
  isPosting: true,
  isError: false,
};

describe("postingReducer", () => {
  it("sets isPosting to true and does not change isError", () => {
    const newState = postingReducer(initialState, {
      type: postInit,
    });
    expect(newState.isPosting).toBe(true);
    expect(newState.isError).toBe(initialState.isError);
  });

  it("sets isPosting to false and sets isError to true", () => {
    const newState = postingReducer(postingState, {
      type: postFailure,
    });
    expect(newState.isPosting).toBe(false);
    expect(newState.isError).toBe(true);
  });

  it("sets isPosting and isError to false", () => {
    const newState = postingReducer(postingState, {
      type: postSuccess,
    });
    expect(newState.isPosting).toBe(false);
    expect(newState.isError).toBe(false);
  });
});
