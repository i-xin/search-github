import React from "react";
import { TextField, CircularProgress } from "@material-ui/core";
import PropTypes from "prop-types";

export const Search = ({ params, searchValue, onChange, loading }) => {
  return (
    <TextField
      {...params}
      label="Search Issues"
      value={searchValue}
      onChange={onChange}
      InputProps={{
        ...params.InputProps,
        endAdornment: (
          <>
            {loading ? <CircularProgress color="inherit" size={20} /> : null}
            {params.InputProps.endAdornment}
          </>
        ),
      }}
    />
  );
};

Search.propTypes = {
  params: PropTypes.object.isRequired,
  searchValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
