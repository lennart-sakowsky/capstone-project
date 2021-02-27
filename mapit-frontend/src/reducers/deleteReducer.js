import {
  deleteInit,
  deleteSuccess,
  deleteFailure,
} from "../actions/deleteActions";

const deleteReducer = (state, action) => {
  switch (action.type) {
    case deleteInit:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case deleteSuccess:
      return {
        ...state,
        isLoading: false,
        isError: false,
      };
    case deleteFailure:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};

export default deleteReducer;
