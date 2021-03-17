import { showAll, showActive, showRelated } from "../actions/filterActions";
import filterReducer from "./filterReducer";

const initialState = "mockState";

describe("filterReducer", () => {
  it("returns 'ALL' in showAll case", () => {
    expect("ALL").toBe(filterReducer(initialState, { type: showAll }));
  });
  it("returns 'ACTIVE' in showAll case", () => {
    expect("ACTIVE").toBe(filterReducer(initialState, { type: showActive }));
  });
  it("returns 'RELATED' in showAll case", () => {
    expect("RELATED").toBe(filterReducer(initialState, { type: showRelated }));
  });
  it("returns initialState in default case", () => {
    expect("mockState").toBe(filterReducer(initialState, { type: undefined }));
  });
});
