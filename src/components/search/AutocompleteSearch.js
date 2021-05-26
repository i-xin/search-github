import React, { useState, useEffect, useCallback } from "react";
import { Autocomplete } from "@material-ui/lab";

import { debounce } from "../../utils/helper";
import { Search } from "./Search";
import { useSearchContext, SearchActions } from "../../context/search";
import { getIssues, processData } from "../../utils/api";

export const AutocompleteSearch = ({ setInput, setTotalCount }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const { dispatchSearchContext } = useSearchContext();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSuggestion = useCallback(
    debounce((input) => {
      setLoading(true);
      processSuggestions(input);
    }),
    []
  );

  const processSuggestions = (input) => {
    if (input.length === 0) return;
    setInput(input);
    getIssues(input).then((res) => {
      setTotalCount(res.total_count);
      const issues = processData(res);
      dispatchSearchContext({
        type: SearchActions.SET_INITIAL_ISSUES,
        data: issues,
      });
      setOptions(issues.map((item) => item.title).slice(0, 5));
      setLoading(false);
    });
  };

  const handleChange = (e, value) => {
    // Value is defined referring that one of autocomplete suggestion is selected
    if (value) {
      setSearchValue(value);
      debouncedSuggestion(value);
    } else {
      setSearchValue(e.target.value);
      debouncedSuggestion(e.target.value);
    }
  };

  useEffect(() => {
    if (!open) setOptions([]);
  }, [open]);

  return (
    <Autocomplete
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      loading={loading}
      options={options}
      onChange={handleChange}
      renderInput={(params) => (
        <Search
          params={params}
          searchValue={searchValue}
          onChange={handleChange}
          loading={loading}
        ></Search>
      )}
    />
  );
};
