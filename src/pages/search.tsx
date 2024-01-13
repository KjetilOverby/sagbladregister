// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import SearchMain from "~/components/search/SearchMain";
import { api } from "~/utils/api";

const search = () => {
  const { data } = api.sawblades.getAll.useQuery({});
  return (
    <div data-theme="darkmode">
      <SearchMain sawblades={data} />
    </div>
  );
};

export default search;
