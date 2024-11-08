/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";

interface Blad {
  type: string;
  bandhistorikk: { service: string }[];
}

interface OmloddingComponentProps {
  retipStats: Blad[];
}

const OmloddingComponent: React.FC<OmloddingComponentProps> = ({
  retipStats,
}) => {
  // Funksjon for å gruppere etter antall omloddinger og bladtype
  const groupByOmloddinger = (blader: Blad[]) => {
    const groupedStats: Record<string, Record<string, number>> = {};

    // Gå gjennom alle bladene
    blader?.forEach((blad) => {
      // Tell antall omloddinger for hver bladtype
      const omloddingCount = blad.bandhistorikk.filter(
        (entry) => entry.service === "Omlodding",
      ).length;

      // Hvis bladtypen ikke finnes i groupedStats, legg den til
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

      // Oppdater tellingen for antall omloddinger
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

  // Gruppere bladene ved hjelp av funksjonen
  const groupedStats = groupByOmloddinger(retipStats);

  const groupByOmloddingerAll = (blader: Blad[]) => {
    const groupedStats: Record<string, number> = {
      "0 omlodding": 0,
      "1 omlodding": 0,
      "2 omloddinger": 0,
      "3 omloddinger": 0,
      "4 omloddinger": 0,
      "5 eller fler omloddinger": 0,
    };

    // Gå gjennom alle bladene
    blader?.forEach((blad) => {
      // Tell antall omloddinger for hvert blad
      const omloddingCount = blad.bandhistorikk.filter(
        (entry) => entry.service === "Omlodding",
      ).length;

      // Oppdater tellingen for antall omloddinger
      if (omloddingCount === 0) {
        groupedStats["0 omlodding"] += 1;
      } else if (omloddingCount === 1) {
        groupedStats["1 omlodding"] += 1;
      } else if (omloddingCount === 2) {
        groupedStats["2 omloddinger"] += 1;
      } else if (omloddingCount === 3) {
        groupedStats["3 omloddinger"] += 1;
      } else if (omloddingCount === 4) {
        groupedStats["4 omloddinger"] += 1;
      } else {
        groupedStats["5 eller fler omloddinger"] += 1;
      }
    });

    return groupedStats;
  };

  // Gruppere bladene ved hjelp av funksjonen
  const groupedStatsAll = groupByOmloddingerAll(retipStats);

  return (
    <div className="rounded-lg bg-base-100 p-6 ">
      <h2 className="mb-6 text-xl font-semibold text-neutral">
        Omloddingstatistikk per type
      </h2>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {Object.keys(groupedStats).map((bladType) => (
          <div
            className="mb-6 rounded-lg border border-primary bg-base-100 p-5"
            key={bladType}
          >
            <h3 className="mb-4 text-lg font-semibold text-neutral">
              {bladType}
            </h3>
            <ul className="space-y-2">
              {Object.entries(groupedStats[bladType]).map(([key, value]) => (
                <li
                  key={key}
                  className="flex justify-between rounded p-2 text-xs hover:bg-primary"
                >
                  <span className="text-neutral">{key}</span>
                  <span className="text-xs font-semibold text-neutral">
                    {value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <h2 className="mb-6 mt-8 text-xl font-semibold text-neutral">
        Samlet omloddingstatistikk
      </h2>
      <div className="rounded-lg border border-primary bg-base-100 p-5">
        <ul className="space-y-2">
          {Object.entries(groupedStatsAll).map(([key, value]) => (
            <li
              key={key}
              className="flex justify-between rounded p-2 text-xs hover:bg-primary"
            >
              <span className="text-neutral">{key}</span>
              <span className="text-xs font-semibold text-neutral">
                {value}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OmloddingComponent;
