import React from "react";

import { SearchContextProvider } from "./context/search";
import { MainLayout } from "./components/layout/MainLayout";

function App() {
  return (
    <SearchContextProvider>
      <MainLayout />
    </SearchContextProvider>
  );
}

export default App;
