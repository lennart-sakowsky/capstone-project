import { spy } from "sinon";
import useCombinedReducer from "./useCombinedReducer";
// Hook and test by Robien Wieruch

describe("useCombinedReducer", () => {
  it("returns a state object with defined substates", () => {
    const [state, dispatch] = useCombinedReducer({
      a: ["1", () => {}],
      b: ["2", () => {}],
    });

    expect(state).toEqual({ a: "1", b: "2" });
  });

  it("returns a dispatch function that calls all child dispatch functions", () => {
    const aCallback = spy();
    const bCallback = spy();

    const [state, dispatch] = useCombinedReducer({
      a: ["1", aCallback],
      b: ["2", bCallback],
    });

    dispatch({ type: "SOME_ACTION" });

    expect(aCallback.calledOnce).toBe(true);
    expect(bCallback.calledOnce).toBe(true);
  });
});
