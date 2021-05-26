import React from "react";
import { TextField, CircularProgress } from "@material-ui/core";

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
