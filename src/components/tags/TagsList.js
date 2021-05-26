import React from "react";
import { Chip } from "@material-ui/core";
import styled from "styled-components";
import PropTypes from "prop-types";

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

TagsList.propTypes = {
  labels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ),
};
