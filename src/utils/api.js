import axios from "axios";

import { PageConfig } from "./constants";
import { getRelativeTime } from "./date";

export const getIssues = (input, pageNum) => {
  const startPage = pageNum ? pageNum : PageConfig.StartPage;
  const queryString =
    "q=" +
    encodeURIComponent(`repo:facebook/react ${input} in:title`) +
    `&per_page=${PageConfig.PageSize}&page=${startPage}`;
  return axios.get(`https://api.github.com/search/issues?${queryString}`);
};

export const processData = (res) => {
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
