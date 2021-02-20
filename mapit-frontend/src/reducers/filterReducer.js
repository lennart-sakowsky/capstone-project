import { showAll, showActive, showRelated } from "../actions/filterActions";

export default function filterReducer(state, action) {
  switch (action.type) {
    case showAll:
      return "ALL";
    case showActive:
      return "ACTIVE";
    case showRelated:
      return "RELATED";
    default:
      throw new Error();
  }
}
