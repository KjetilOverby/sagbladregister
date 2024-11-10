/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";

interface Blad {
  type: string;
  bandhistorikk: { service: string }[];
}

interface OmloddingComponentProps {
  retipStats: Blad[];
  theme: string;
}

const OmloddingComponent: React.FC<OmloddingComponentProps> = ({
  retipStats,
  theme,
}) => {
  const groupByOmloddinger = (blader: Blad[]) => {
    const groupedStats: Record<string, Record<string, number>> = {};

    blader?.forEach((blad) => {
      const omloddingCount = blad.bandhistorikk.filter(
        (entry) => entry.service === "Omlodding",
      ).length;

      if (!groupedStats[blad.type]) {
        groupedStats[blad.type] = {
          "0 omlodding": 0,
          "1 omlodding": 0,
          "2 omloddinger": 0,
          "3 omloddinger": 0,
          "4 omloddinger": 0,
          "5 eller fler omloddinger": 0,
        };
      }

      if (omloddingCount === 0) {
        groupedStats[blad.type]["0 omlodding"] += 1;
      } else if (omloddingCount === 1) {
        groupedStats[blad.type]["1 omlodding"] += 1;
      } else if (omloddingCount === 2) {
        groupedStats[blad.type]["2 omloddinger"] += 1;
      } else if (omloddingCount === 3) {
        groupedStats[blad.type]["3 omloddinger"] += 1;
      } else if (omloddingCount === 4) {
        groupedStats[blad.type]["4 omloddinger"] += 1;
      } else {
        groupedStats[blad.type]["5 eller fler omloddinger"] += 1;
      }
    });

    return groupedStats;
  };

  const groupedStats = groupByOmloddinger(retipStats);

  // Funksjon for å samle totaler for alle bladtyper
  const calculateTotalStats = () => {
    const totalStats = {
      "0 omlodding": 0,
      "1 omlodding": 0,
      "2 omloddinger": 0,
      "3 omloddinger": 0,
      "4 omloddinger": 0,
      "5 eller fler omloddinger": 0,
    };

    Object.values(groupedStats).forEach((counts) => {
      Object.entries(counts).forEach(([key, value]) => {
        totalStats[key] += value;
      });
    });

    return totalStats;
  };

  const totalStats = calculateTotalStats();

  return (
    <div className="mb-10 rounded-lg bg-base-100 p-6">
      <h2 className="mb-6 text-xl font-semibold text-neutral">
        Omloddingstatistikk per type
      </h2>
      <table className="table-sm w-full border-collapse">
        <thead>
          <tr className={`bg-${theme === "darkmode" ? "primary" : "neutral"}`}>
            <th className="p-2 text-left text-xs text-gray-200">Bladtype</th>
            <th className="p-2 text-left text-xs text-gray-200">0 omlodding</th>
            <th className="p-2 text-left text-xs text-gray-200">1 omlodding</th>
            <th className="p-2 text-left text-xs text-gray-200">
              2 omloddinger
            </th>
            <th className="p-2 text-left text-xs text-gray-200">
              3 omloddinger
            </th>
            <th className="p-2 text-left text-xs text-gray-200">
              4 omloddinger
            </th>
            <th className="p-2 text-left text-xs text-gray-200">
              5 eller fler omloddinger
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(groupedStats).map((bladType) => (
            <tr
              key={bladType}
              className={`text-neutral ${theme === "darkmode" ? "odd:bg-gray-700" : "odd:bg-gray-200"} `}
            >
              <td className=" p-3">{bladType}</td>
              <td className=" p-3">{groupedStats[bladType]["0 omlodding"]}</td>
              <td className=" p-3">{groupedStats[bladType]["1 omlodding"]}</td>
              <td className=" p-3">
                {groupedStats[bladType]["2 omloddinger"]}
              </td>
              <td className=" p-3">
                {groupedStats[bladType]["3 omloddinger"]}
              </td>
              <td className=" p-3">
                {groupedStats[bladType]["4 omloddinger"]}
              </td>
              <td className=" p-3">
                {groupedStats[bladType]["5 eller fler omloddinger"]}
              </td>
            </tr>
          ))}
          {/* Total-rad for alle blad */}
          <tr className="font-semibold text-neutral">
            <td className=" p-2">Total</td>
            <td className=" p-2">{totalStats["0 omlodding"]}</td>
            <td className=" p-2">{totalStats["1 omlodding"]}</td>
            <td className=" p-2">{totalStats["2 omloddinger"]}</td>
            <td className=" p-2">{totalStats["3 omloddinger"]}</td>
            <td className=" p-2">{totalStats["4 omloddinger"]}</td>
            <td className=" p-2">{totalStats["5 eller fler omloddinger"]}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OmloddingComponent;
