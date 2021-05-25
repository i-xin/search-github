import React from "react";
import { Container, Box } from "@material-ui/core";

import { AutocompleteSearch } from "./components/search/AutocompleteSearch";

function App() {
  return (
    <Container>
      <Box>
        <AutocompleteSearch />
      </Box>
      <Box>Search content with load more</Box>
    </Container>
  );
}

export default App;
