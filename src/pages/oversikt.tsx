/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useState, useEffect } from "react";
import OverviewTable from "~/components/oversikt/OverviewTable";
import HeaderComponent from "~/components/reusable/HeaderComponent";
import { api } from "~/utils/api";
import { signIn, signOut, useSession } from "next-auth/react";
import MonthlyTable from "~/components/oversikt/MonthlyTable";
import RoleAdmin from "~/components/roles/RoleAdmin";
import RoleAdminMV from "~/components/roles/RoleAdminMV";
import YearlyRetipOverview from "~/components/oversikt/YearlyRetipOverview";
import NewDeletedYearTable from "~/components/oversikt/NewDeletedYearTable";
import { getKundeID } from "~/utils/roleMapping";
import GeneralAdmin from "~/components/roles/GeneralAdmin";

const Oversikt = ({ theme }: { theme: string }) => {
  const { data: sessionData } = useSession();

  const [customerInit, setCustomerInit] = useState("");

  useEffect(() => {
    if (sessionData?.user.role) {
      const kundeID = getKundeID(sessionData.user.role);
      if (kundeID) {
        setCustomerInit(kundeID + "-");
      }
    }
  }, [sessionData]);

  // useEffect(() => {
  //   if (sessionData?.user.role === "MV_ADMIN") {
  //     setCustomerInit("MV-");
  //   } else if (sessionData?.user.role === "MT_ADMIN") {
  //     setCustomerInit("MT-");
  //   }
  // }, [sessionData]);

  const { data: monthlyCount } = api.sawblades.getMonthlyCount.useQuery();

  const { data: monthlyCountCustomer } =
    api.sawblades.getMonthlyCountCustomer.useQuery({
      init: customerInit,
    });

  const { data: monthlyHistoryCount } =
    api.statistikkBladeData.getMonthlyHistoryStats.useQuery();

  const { data: historyCountYearly } =
    api.statistikkBladeData.historyCountYearly.useQuery();

  const { data: newDeletedYearly } = api.sawblades.newDeletedYearly.useQuery();

  const { data: newDeletedYearlyCustomer } =
    api.sawblades.newDeletedYearlyCustomer.useQuery({
      init: customerInit,
    });

  const { data: historyCountYearlyCustomer } =
    api.statistikkBladeData.historyCountYearlyCustomer.useQuery({
      init: customerInit,
    });

  const { data: monthlyHistoryCountCustomer } =
    api.statistikkBladeData.getMonthlyHistoryStatsCustomer.useQuery({
      init: customerInit,
    });

  const { data: count } = api.sawblades.countSawblades.useQuery();

  const { data: countCustomer } = api.sawblades.countSawbladesCustomer.useQuery(
    {
      init: customerInit,
    },
  );

  console.log(historyCountYearly);

  return (
    <div className="min-h-screen" data-theme={theme}>
      <HeaderComponent />
      <div className="px-5 max-2xl:w-screen max-xl:m-0 xl:px-48">
        {sessionData?.user.role === "ADMIN" && (
          <OverviewTable count={count} theme={theme} />
        )}
        {sessionData?.user.role === "MT_ADMIN" && (
          <OverviewTable count={countCustomer} theme={theme} />
        )}
        {sessionData?.user.role === "MV_ADMIN" && (
          <OverviewTable count={countCustomer} theme={theme} />
        )}
        <RoleAdmin>
          <MonthlyTable
            monthlyCount={monthlyCount}
            monthlyHistoryCount={monthlyHistoryCount}
            theme={theme}
          />
          {historyCountYearly && (
            <YearlyRetipOverview data={historyCountYearly} theme={theme} />
          )}
          {newDeletedYearly && (
            <NewDeletedYearTable data={newDeletedYearly} theme={theme} />
          )}
        </RoleAdmin>
        <GeneralAdmin>
          <MonthlyTable
            monthlyCount={monthlyCountCustomer}
            monthlyHistoryCount={monthlyHistoryCountCustomer}
            theme={theme}
          />
          {historyCountYearlyCustomer && (
            <YearlyRetipOverview
              data={historyCountYearlyCustomer}
              theme={theme}
            />
          )}
          {newDeletedYearlyCustomer && (
            <NewDeletedYearTable
              data={newDeletedYearlyCustomer}
              theme={theme}
            />
          )}
        </GeneralAdmin>
      </div>
    </div>
  );
};

export default Oversikt;
