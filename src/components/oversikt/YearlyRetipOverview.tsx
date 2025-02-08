/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @next/next/no-img-element */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";

// Komponent for å vise data for en spesifikk service-type (Omlodding, Reparasjon, Reklamasjon)
interface ServiceTypeTableProps {
  serviceType: string;
  data: Record<string, Record<string, number>>;
  theme: string;
}

const ServiceTypeTable: React.FC<ServiceTypeTableProps> = ({
  serviceType,
  data,
  theme,
}) => {
  // Sjekk at data ikke er null eller undefined
  const bladeTypes = data ? Object.keys(data) : [];

  // Hvis bladeTypes er tomt, vis ingen data tilgjengelig
  if (bladeTypes.length === 0) {
    return <div>Ingen data tilgjengelig for {serviceType}.</div>;
  }

  // Hent årstallene
  const years =
    bladeTypes.length > 0 && bladeTypes[0] && data[bladeTypes[0]]
      ? Object.keys(data[bladeTypes[0]] as Record<string, number>)
      : [];

  return (
    <div className="py-10">
      <h3 className="text-neutral">{serviceType}</h3>
      <table className="table table-xs w-full overflow-x-auto">
        <thead>
          <tr
            className={`md:text-md border border-b-accent border-l-base-100 border-r-base-100 border-t-accent text-[.7rem] text-white ${
              theme === "darkmode" ? "bg-primary" : "bg-neutral"
            }`}
          >
            <th>Blad Type</th>
            {years.map((year) => (
              <th key={year}>{year}</th>
            ))}
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {bladeTypes.map((bladType) => (
            <tr
              className={`border-none ${
                theme === "darkmode" ? "odd:bg-gray-700" : "odd:bg-gray-200"
              }`}
              key={bladType}
            >
              <td className="md:text-md py-3 text-[.7rem] text-neutral ">
                {bladType}
              </td>
              {years.map((year) => (
                <td
                  className="md:text-md py-3 text-[.7rem] text-neutral "
                  key={year}
                >
                  {data[bladType]?.[year] ?? 0}
                </td>
              ))}
              <td className="md:text-md py-3 text-[.7rem] text-neutral ">
                {/* Summen per bladtype, som allerede er i data */}
                {years.reduce(
                  (sum, year) => sum + (data[bladType]?.[year] ?? 0),
                  0,
                )}
              </td>
            </tr>
          ))}
          <tr>
            <td className="md:text-md py-3 text-[.7rem] text-neutral ">
              <strong>Total</strong>
            </td>
            {years.map((year) => (
              <td
                key={year}
                className="md:text-md py-3 text-[.7rem] text-neutral "
              >
                {/* Summerer per år basert på data */}
                {Object.keys(data).reduce(
                  (sum, bladType) => sum + (data[bladType]?.[year] ?? 0),
                  0,
                )}
              </td>
            ))}
            <td className="md:text-md py-3 text-[.7rem] text-neutral ">
              {/* Summerer totalene for alle år */}
              {Object.values(data).reduce(
                (sum, bladeData) =>
                  sum +
                  Object.values(bladeData).reduce((s, count) => s + count, 0),
                0,
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

interface YearlyRetipOverviewProps {
  data: Record<
    string,
    {
      bladeTypesOmlodding?: Record<string, number>;
      bladeTypesReparasjon?: Record<string, number>;
      bladeTypesReklamasjon?: Record<string, number>;
    }
  >;
  theme: string;
}

const YearlyRetipOverview: React.FC<YearlyRetipOverviewProps> = ({
  data,
  theme,
}) => {
  // Ekstraherer data for hver type service (Omlodding, Reparasjon, Reklamasjon)
  const omloddingData: Record<string, Record<string, number>> = {};
  const reparasjonData: Record<string, Record<string, number>> = {};
  const reklamasjonData: Record<string, Record<string, number>> = {};

  // Sjekk at data er tilgjengelig og behandle hvert år
  Object.entries(data || {}).forEach(([year, stats]) => {
    // Håndterer omlodding
    Object.entries(stats.bladeTypesOmlodding ?? {}).forEach(
      ([bladType, count]) => {
        if (!omloddingData[bladType]) omloddingData[bladType] = {};
        omloddingData[bladType][year] = count;
      },
    );

    // Håndterer reparasjon
    Object.entries(stats.bladeTypesReparasjon ?? {}).forEach(
      ([bladType, count]) => {
        if (!reparasjonData[bladType]) reparasjonData[bladType] = {};
        reparasjonData[bladType][year] = count;
      },
    );

    // Håndterer reklamasjon
    Object.entries(stats.bladeTypesReklamasjon ?? {}).forEach(
      ([bladType, count]) => {
        if (!reklamasjonData[bladType]) reklamasjonData[bladType] = {};
        reklamasjonData[bladType][year] = count;
      },
    );
  });

  return (
    <div>
      <h2 className="text-neutral">Årlig oversikt</h2>

      {/* Tabell for Omlodding */}
      <ServiceTypeTable
        serviceType="Omlodding"
        data={omloddingData}
        theme={theme}
      />

      {/* Tabell for Reparasjon */}
      <ServiceTypeTable
        serviceType="Reparasjon"
        data={reparasjonData}
        theme={theme}
      />

      {/* Tabell for Reklamasjon */}
      <ServiceTypeTable
        serviceType="Reklamasjon"
        data={reklamasjonData}
        theme={theme}
      />
    </div>
  );
};

export default YearlyRetipOverview;
