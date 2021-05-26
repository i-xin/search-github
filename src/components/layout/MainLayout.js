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
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(PageConfig.StartPage);
  const { dispatchSearchContext } = useSearchContext();

  const handleBottomScroll = () => {
    console.log("it hits the bottom of page");
    const maxPage = parseInt(totalCount / PageConfig.PageSize);
    if (currentPage + 1 > maxPage) {
      console.log("It reaches end of page");
    } else {
      getIssues(input, currentPage + 1).then((res) => {
        const issues = processData(res);
        dispatchSearchContext({
          type: SearchActions.SET_INITIAL_ISSUES,
          data: issues,
        });
      });
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <BottomScrollListener onBottom={handleBottomScroll}>
      <Container>
        <Box>
          <AutocompleteSearch
            setInput={setInput}
            setTotalCount={setTotalCount}
          />
        </Box>
        <Box>
          <IssuesList />
        </Box>
      </Container>
    </BottomScrollListener>
  );
};
