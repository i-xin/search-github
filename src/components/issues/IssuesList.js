import React from "react";
import { Card, CardContent, Box, Typography, Chip } from "@material-ui/core";
import { useSearchContext } from "../../context/search";

export const IssuesList = () => {
  const { searchState } = useSearchContext();

  return searchState.issues.map((issue) => {
    return (
      <Card key={issue.id}>
        <CardContent>
          <Box display="flex" flexDirection="row">
            <Typography variant="h6">{issue.title}</Typography>
            {issue.labels.map((label) => (
              <Chip key={label.id} label={label.name} color="primary" />
            ))}
          </Box>
          <Typography variant="body2">
            #{issue.number} opened {issue.createdAt} by {issue.reporterName}
          </Typography>
        </CardContent>
      </Card>
    );
  });
};
