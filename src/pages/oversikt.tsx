import React from "react";
import OverviewTable from "~/components/oversikt/OverviewTable";
import HeaderComponent from "~/components/reusable/HeaderComponent";
import { api } from "~/utils/api";

const oversikt = ({ theme }: { theme: string }) => {
  const { data: count } = api.sawblades.countSawblades.useQuery();
  return (
    <div className="min-h-screen" data-theme={theme}>
      <HeaderComponent />
      <div className=" px-48 max-2xl:w-screen max-xl:m-0">
        <OverviewTable count={count} />
      </div>
    </div>
  );
};

export default oversikt;
