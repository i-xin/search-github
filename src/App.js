import React, { useState } from "react";
import { Container, Box } from "@material-ui/core";
import { BottomScrollListener } from "react-bottom-scroll-listener";

import { AutocompleteSearch } from "./components/search/AutocompleteSearch";
import { SearchContextProvider } from "./context/search";
import { IssuesList } from "./components/issues/IssuesList";

function App() {
  const [input, setInput] = useState("");
  const handleBottomScroll = () => {
    console.log("it hits the bottom of page");
    console.log(input);
  };

  return (
    <SearchContextProvider>
      <BottomScrollListener onBottom={handleBottomScroll}>
        <Container>
          <Box>
            <AutocompleteSearch setInput={setInput} />
          </Box>
          <Box>
            <IssuesList />
          </Box>
        </Container>
      </BottomScrollListener>
    </SearchContextProvider>
  );
}

export default App;
