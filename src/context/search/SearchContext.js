import React from "react";

import { useSearchReducer } from "./SearchReducer";

const SearchContext = React.createContext();

export const SearchContextProvider = ({ children }) => {
  const stateAndDispatch = useSearchReducer();

  return (
    <SearchContext.Provider value={stateAndDispatch}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  return React.useContext(SearchContext);
};
