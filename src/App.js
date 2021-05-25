import React, { useState, useEffect, useCallback } from "react";
import { Container, Box, TextField, CircularProgress } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import axios from "axios";

import { debounce } from "./utils/helper";

function App() {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const [suggestion, setSuggestion] = useState("");

  const debouncedSuggestion = useCallback(
    debounce((val) => setSuggestion(val)),
    []
  );

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    debouncedSuggestion(e.target.value);
  };

  useEffect(() => {
    let isCurrent = true;
    if (suggestion.length === 0) return;
    setLoading(true);
    const queryString =
      "q=" +
      encodeURIComponent(`repo:facebook/react ${suggestion} in:title in:body`);
    axios
      .get(`https://api.github.com/search/issues?${queryString}`)
      .then((res) => {
        if (isCurrent) {
          setOptions(res.data.items.map((item) => item.title));
          setLoading(false);
        }

        return () => {
          isCurrent = false;
        };
      });
  }, [loading, suggestion]);

  useEffect(() => {
    if (!open) setOptions([]);
  }, [open]);

  return (
    <Container>
      <Box>
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
            <TextField
              {...params}
              label="Search Issues"
              value={searchValue}
              onChange={handleChange}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </Box>
      <Box>Search Contents</Box>
    </Container>
  );
}

export default App;
