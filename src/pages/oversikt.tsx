import React, { useState, useEffect } from "react";
import OverviewTable from "~/components/oversikt/OverviewTable";
import HeaderComponent from "~/components/reusable/HeaderComponent";
import { api } from "~/utils/api";
import { signIn, signOut, useSession } from "next-auth/react";

const Oversikt = ({ theme }: { theme: string }) => {
  const { data: sessionData } = useSession();

  const [customerInit, setCustomerInit] = useState("");

  useEffect(() => {
    if (sessionData?.user.role === "MV_ADMIN") {
      setCustomerInit("MV-");
    } else if (sessionData?.user.role === "MT_ADMIN") {
      setCustomerInit("MT-");
    }
  }, [sessionData]);

  const { data: monthlyCount } = api.sawblades.getMonthlyCount.useQuery();
  const { data: monthlyHistoryCount } =
    api.statistikkBladeData.getMonthlyHistoryStats.useQuery();
  const { data: count } = api.sawblades.countSawblades.useQuery();
  const { data: countCustomer } = api.sawblades.countSawbladesCustomer.useQuery(
    {
      init: customerInit,
    },
  );

  const formatYearMonth = (yearMonth: string) => {
    if (typeof yearMonth !== "string") return "";
    const [year, month] = yearMonth.split("-");
    const monthNames = [
      "Januar",
      "Februar",
      "Mars",
      "April",
      "Mai",
      "Juni",
      "Juli",
      "August",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    return `${monthNames[parseInt(month ?? "1", 10) - 1]} ${year}`;
  };

  // Combine monthlyCount and monthlyHistoryCount into one array
  const combinedData = monthlyCount?.map((entry) => {
    // Find the matching history entry based on the yearMonth
    const historyEntry = monthlyHistoryCount?.find(
      (history) => history.yearMonth === entry.yearMonth,
    );

    return {
      yearMonth: entry.yearMonth,
      newCount: entry.newCount,
      deletedCount: entry.deletedCount,
      reparasjon: historyEntry?.reparasjon ?? 0, // If no history entry, default to 0
      omlodding: historyEntry?.omlodding ?? 0,
      reklamasjon: historyEntry?.reklamasjon ?? 0,
    };
  });

  // Sort combined data based on year and month in descending order
  const sortedCombinedData = combinedData?.sort((a, b) => {
    const [yearA, monthA] = a.yearMonth?.split("-") || [];
    const [yearB, monthB] = b.yearMonth?.split("-") || [];

    // Sort by year first, then by month (both in descending order)
    if (yearA !== yearB) {
      return parseInt(yearB ?? "0", 10) - parseInt(yearA ?? "0", 10);
    }
    return parseInt(monthB ?? "0", 10) - parseInt(monthA ?? "0", 10);
  });

  return (
    <div className="min-h-screen" data-theme={theme}>
      <HeaderComponent />
      <div className="px-5 max-2xl:w-screen max-xl:m-0 xl:px-48">
        {sessionData?.user.role === "ADMIN" && <OverviewTable count={count} />}
        {sessionData?.user.role === "MT_ADMIN" && (
          <OverviewTable count={countCustomer} />
        )}
        {sessionData?.user.role === "MV_ADMIN" && (
          <OverviewTable count={countCustomer} />
        )}

        {/* Monthly Count Overview */}
        <div className="mt-10 pb-10">
          <h2 className="mb-4 text-lg font-semibold">
            Månedlig Oversikt med Nye, Slettede og Service
          </h2>
          <table className="table-xs w-full table-auto border-collapse border border-gray-200 text-left">
            <thead>
              <tr className="bg-accent">
                <th className="border border-primary p-2 text-xs">Måned</th>
                <th className="border border-primary p-2 text-xs">
                  Nye Sagblad
                </th>
                <th className="border border-primary p-2 text-xs">
                  Slettede Sagblad
                </th>
                <th className="border border-primary p-2 text-xs">
                  Reparasjon
                </th>
                <th className="border border-primary p-2 text-xs">Omlodding</th>
                <th className="border border-primary p-2 text-xs">
                  Reklamasjon
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedCombinedData?.map((entry) => (
                <tr key={entry.yearMonth} className="hover:bg-gray-50">
                  <td className="border border-primary p-2">
                    {formatYearMonth(entry.yearMonth)}
                  </td>
                  <td className="border border-primary p-2">
                    {entry.newCount}
                  </td>
                  <td className="border border-primary p-2">
                    {entry.deletedCount}
                  </td>
                  <td className="border border-primary p-2">
                    {entry.reparasjon}
                  </td>
                  <td className="border border-primary p-2">
                    {entry.omlodding}
                  </td>
                  <td className="border border-primary p-2">
                    {entry.reklamasjon}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Oversikt;
