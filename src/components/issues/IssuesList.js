import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  CardActionArea,
} from "@material-ui/core";
import styled from "styled-components";

import { useSearchContext } from "../../context/search";
import { TagsList } from "../tags/TagsList";

const StyledCard = styled(Card)`
  margin: 8px 16px;
`;

export const IssuesList = () => {
  const { searchState } = useSearchContext();

  return searchState.issues.map((issue) => {
    return (
      <StyledCard key={issue.id}>
        <CardActionArea href={issue.url} target="_blank">
          <CardContent>
            <Box display="flex" flexDirection="row">
              <Typography variant="h6">{issue.title}</Typography>
              <Box mx={2}>
                <TagsList labels={issue.labels} />
              </Box>
            </Box>
            <Typography variant="body2">
              #{issue.number} opened {issue.createdAt} by {issue.reporterName}
            </Typography>
          </CardContent>
        </CardActionArea>
      </StyledCard>
    );
  });
};
