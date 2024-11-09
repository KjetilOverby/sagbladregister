/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @next/next/no-img-element */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";

const MonthlyTable = ({ monthlyCount, monthlyHistoryCount }) => {
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return parseInt(yearB ?? "0", 10) - parseInt(yearA ?? "0", 10);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return parseInt(monthB ?? "0", 10) - parseInt(monthA ?? "0", 10);
  });
  return (
    <div className="mt-10 pb-10">
      <h2 className="mb-4 text-lg font-semibold">
        Månedlig Oversikt med Nye, Slettede og Service
      </h2>
      <table className="table-xs w-full table-auto border-collapse  text-left">
        <thead>
          <tr className="bg-purple-500">
            <th className=" p-2 text-xs text-white">Måned</th>
            <th className=" p-2 text-xs text-white">Nye Sagblad</th>
            <th className=" p-2 text-xs text-white">Slettede Sagblad</th>
            <th className=" p-2 text-xs text-white">Reparasjon</th>
            <th className=" p-2 text-xs text-white">Omlodding</th>
            <th className=" p-2 text-xs text-white">Reklamasjon</th>
          </tr>
        </thead>
        <tbody>
          {sortedCombinedData?.map((entry) => (
            <tr key={entry.yearMonth} className="hover:bg-primary">
              <td className=" p-2">
                {formatYearMonth(entry.yearMonth as string)}
              </td>
              <td className=" p-2">{entry.newCount}</td>
              <td className=" p-2">{entry.deletedCount}</td>
              <td className=" p-2">{entry.reparasjon}</td>
              <td className=" p-2">{entry.omlodding}</td>
              <td className=" p-2">{entry.reklamasjon}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MonthlyTable;
