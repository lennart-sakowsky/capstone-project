import {
  fetchInit,
  fetchSuccess,
  fetchFailure,
} from "../actions/loadingActions";

export default function placeReducer(state, action) {
  switch (action.type) {
    case fetchInit:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case fetchSuccess:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case fetchFailure:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case "SET_RELATED":
      return {
        ...state,
        data: state.data.map((place) => {
          let matchingTag = place.tags.some(
            (tags) => tags.name === action.payload.toLocaleUpperCase()
          );
          if (matchingTag) {
            return { ...place, related: true };
          } else {
            return { ...place, related: false };
          }
        }),
      };
    case "SET_UNRELATED":
      return {
        ...state,
        data: state.data.map((place) => {
          return { ...place, related: false };
        }),
      };
    case "SET_ACTIVE":
      return {
        ...state,
        data: state.data.map((place) => {
          if (
            place.name === action.payload.name &&
            place.street === action.payload.street &&
            place.zipcode === action.payload.zipcode
          ) {
            return { ...place, active: true };
          } else {
            return { ...place, active: false };
          }
        }),
      };
    case "SET_INACTIVE":
      return {
        ...state,
        data: state.data.map((place) => {
          return { ...place, active: false };
        }),
      };
    case "ADD_PLACE":
      return {
        ...state,
        data: state.data.concat({
          ...action.payload,
          active: true,
        }),
      };
    default:
      return state;
  }
}
