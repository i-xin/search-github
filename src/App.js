import React from "react";
import { Container, Box } from "@material-ui/core";

import { AutocompleteSearch } from "./components/search/AutocompleteSearch";
import { SearchContextProvider } from "./context/search";
import { IssuesList } from "./components/issues/IssuesList";

function App() {
  return (
    <SearchContextProvider>
      <Container>
        <Box>
          <AutocompleteSearch />
        </Box>
        <Box>
          <IssuesList />
        </Box>
      </Container>
    </SearchContextProvider>
  );
}

export default App;
