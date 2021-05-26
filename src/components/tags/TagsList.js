import React from "react";
import { Chip } from "@material-ui/core";
import styled from "styled-components";

const ColoredChip = styled(Chip)`
  background-color: ${(props) => props.chipcolor};
`;
export const TagsList = ({ labels }) => {
  return labels.map((label) => {
    return (
      <ColoredChip
        key={label.id}
        label={label.name}
        chipcolor={`#${label.color}`}
      />
    );
  });
};
