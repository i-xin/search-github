import { useReducer } from "react";
import { SearchActions } from "./SearchActions";

const initialState = {
  issues: [],
  error: null,
};
export const useSearchReducer = () => {
  const [searchState, dispatchSearchContext] = useReducer((state, action) => {
    switch (action.type) {
      case SearchActions.SET_INITIAL_ISSUES:
        return { ...state, issues: action.data || [] };
      case SearchActions.UPDATE_ISSUES:
        return { ...state, issues: [...state.issues, ...action.data] };
      case SearchActions.SET_ERROR:
        return { ...state, error: action.data };
      default:
        return state;
    }
  }, initialState);

  return {
    searchState,
    dispatchSearchContext,
  };
};
