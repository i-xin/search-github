import { useReducer } from "react";
import { SearchActions } from "./SearchActions";

const initialState = {
  issues: [],
};
export const useSearchReducer = () => {
  const [searchState, dispatchSearchContext] = useReducer((state, action) => {
    switch (action.type) {
      case SearchActions.SET_INITIAL_ISSUES:
        return { issues: action.data };
      case SearchActions.UPDATE_ISSUES:
        return { issues: [...state.issues, ...action.data] };
      default:
        return state;
    }
  }, initialState);

  return {
    searchState,
    dispatchSearchContext,
  };
};
