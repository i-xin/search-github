import React, { useState, useEffect, useCallback } from "react";
import { Autocomplete } from "@material-ui/lab";
import axios from "axios";

import { debounce } from "../../utils/helper";
import { Search } from "./Search";
import { PageConfig } from "../../utils/constants";
import { useSearchContext, SearchActions } from "../../context/search";

export const AutocompleteSearch = () => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const { dispatchSearchContext } = useSearchContext();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSuggestion = useCallback(
    debounce((suggestion) => {
      setLoading(true);
      processSuggestions(suggestion);
    }),
    []
  );

  const processSuggestions = (suggestion) => {
    if (suggestion.length === 0) return;
    const queryString =
      "q=" + encodeURIComponent(`repo:facebook/react ${suggestion} in:title`);
    axios
      .get(
        `https://api.github.com/search/issues?${queryString}&per_page=${PageConfig.PageSize}&page=${PageConfig.StartPage}`
      )
      .then((res) => {
        const issues = res.data.items.map((item) => {
          return {
            id: item.id,
            url: item.html_url,
            labels: item.labels,
            number: item.number,
            title: item.title,
            update_at: item.update_at,
            reporterName: item.user.login,
          };
        });
        dispatchSearchContext({
          type: SearchActions.SET_ISSUES,
          data: issues,
        });
        setOptions(issues.map((item) => item.title).slice(0, 5));
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    debouncedSuggestion(e.target.value);
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
      renderInput={(params) => (
        <Search
          params={params}
          searchValue={searchValue}
          handleChange={handleChange}
          loading={loading}
        ></Search>
      )}
    />
  );
};
