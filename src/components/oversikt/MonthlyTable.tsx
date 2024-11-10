/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";

const MonthlyTable = ({ monthlyCount, monthlyHistoryCount, theme }) => {
  const formatYearMonth = (yearMonth) => {
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

  // Kombinerer monthlyCount og monthlyHistoryCount til ett array
  const combinedData = monthlyCount?.map((entry) => {
    const historyEntry = monthlyHistoryCount?.find(
      (history) => history.yearMonth === entry.yearMonth,
    );

    return {
      yearMonth: entry.yearMonth,
      newCount: entry.newCount,
      deletedCount: entry.deletedCount,
      reparasjon: historyEntry?.reparasjon ?? 0,
      omlodding: historyEntry?.omlodding ?? 0,
      reklamasjon: historyEntry?.reklamasjon ?? 0,
    };
  });

  // Sorter data etter år og måned i synkende rekkefølge
  const sortedCombinedData = combinedData?.sort((a, b) => {
    const [yearA, monthA] = a.yearMonth?.split("-") || [];
    const [yearB, monthB] = b.yearMonth?.split("-") || [];
    if (yearA !== yearB)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return parseInt(yearB ?? "0", 10) - parseInt(yearA ?? "0", 10);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return parseInt(monthB ?? "0", 10) - parseInt(monthA ?? "0", 10);
  });

  // Beregn totaler for hver kolonne
  const totals = sortedCombinedData?.reduce(
    (acc, entry) => ({
      newCount: acc.newCount + (entry.newCount || 0),
      deletedCount: acc.deletedCount + (entry.deletedCount || 0),
      reparasjon: acc.reparasjon + (entry.reparasjon || 0),
      omlodding: acc.omlodding + (entry.omlodding || 0),
      reklamasjon: acc.reklamasjon + (entry.reklamasjon || 0),
    }),
    {
      newCount: 0,
      deletedCount: 0,
      reparasjon: 0,
      omlodding: 0,
      reklamasjon: 0,
    },
  );

  return (
    <div className="mt-10 pb-10">
      <h2 className="mb-4 text-lg text-neutral ">Månedlig Oversikt</h2>
      <table className="table-xs w-full table-auto border-collapse text-left">
        <thead>
          <tr
            className={`${theme === "darkmode" ? "bg-primary" : "bg-neutral"}`}
          >
            <th className="p-3 text-xs text-white">Måned</th>
            <th className="p-3 text-xs text-white">Nye Sagblad</th>
            <th className="p-3 text-xs text-white">Slettede Sagblad</th>
            <th className="p-3 text-xs text-white">Reparasjon</th>
            <th className="p-3 text-xs text-white">Omlodding</th>
            <th className="p-3 text-xs text-white">Reklamasjon</th>
          </tr>
        </thead>
        <tbody>
          {sortedCombinedData?.map((entry) => (
            <tr
              key={entry.yearMonth}
              className={`${theme === "darkmode" ? "odd:bg-gray-700" : "odd:bg-gray-200"}`}
            >
              <td className="p-3 text-neutral">
                {formatYearMonth(entry.yearMonth)}
              </td>
              <td className="p-3 text-neutral">{entry.newCount}</td>
              <td className="p-3 text-neutral">{entry.deletedCount}</td>
              <td className="p-3 text-neutral">{entry.reparasjon}</td>
              <td className="p-3 text-neutral">{entry.omlodding}</td>
              <td className="p-3 text-neutral">{entry.reklamasjon}</td>
            </tr>
          ))}
          {/* Totalrad */}
          <tr
            className={`font-bold text-white ${theme === "darkmode" ? "bg-accent" : "bg-neutral"}`}
          >
            <td className="p-3">Totalt</td>
            <td className="p-3">{totals?.newCount}</td>
            <td className="p-3">{totals?.deletedCount}</td>
            <td className="p-3">{totals?.reparasjon}</td>
            <td className="p-3">{totals?.omlodding}</td>
            <td className="p-3">{totals?.reklamasjon}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MonthlyTable;
