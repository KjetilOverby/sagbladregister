// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import SearchMain from "~/components/search/SearchMain";
import { api } from "~/utils/api";

const search = () => {
  const { data } = api.sawblades.getAll.useQuery({
    date: "2024-01-14",
    date2: "2023-12-15",
    IdNummer: "",
  });
  return (
    <div data-theme="darkmode">
      <SearchMain sawblades={data} />
    </div>
  );
};

export default search;
// IdNummer: "MS-00002",
