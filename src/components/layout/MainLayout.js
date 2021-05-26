import React, { useState } from "react";
import { Container, Box } from "@material-ui/core";
import { BottomScrollListener } from "react-bottom-scroll-listener";

import { AutocompleteSearch } from "../search/AutocompleteSearch";
import { IssuesList } from "../issues/IssuesList";
import { PageConfig } from "../../utils/constants";
import { getIssues, processData } from "../../utils/api";
import { useSearchContext, SearchActions } from "../../context/search";

export const MainLayout = () => {
  const [input, setInput] = useState("");
  const [currentPage, setCurrentPage] = useState(PageConfig.StartPage);
  const { dispatchSearchContext } = useSearchContext();

  const handleBottomScroll = () => {
    getIssues(input, currentPage + 1).then((res) => {
      const issues = processData(res);
      dispatchSearchContext({
        type: SearchActions.UPDATE_ISSUES,
        data: issues,
      });
    });
    setCurrentPage(currentPage + 1);
  };

  return (
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
  );
};
