import axios from "axios";

import { PageConfig } from "./constants";
import { getRelativeTime } from "./date";
import { SearchActions } from "../context/search";

export const getIssues = (input, pageNum, dispatch) => {
  const startPage = pageNum ? pageNum : PageConfig.StartPage;
  const queryString =
    "q=" +
    encodeURIComponent(`repo:facebook/react ${input} in:title`) +
    `&per_page=${PageConfig.PageSize}&page=${startPage}`;
  return axios
    .get(`https://api.github.com/search/issues?${queryString}`)
    .catch((err) => {
      dispatch({
        type: SearchActions.SET_ERROR,
        data: err.response.data.message,
      });
      console.error(err.response.data.message);
    });
};

export const processData = (res) => {
  if (!res || !res.data || !res.data.items) return [];

  return res.data.items.map((item) => {
    return {
      id: item.id,
      url: item.html_url,
      labels: item.labels,
      number: item.number,
      title: item.title,
      createdAt: getRelativeTime(item.created_at),
      reporterName: item.user.login,
    };
  });
};
