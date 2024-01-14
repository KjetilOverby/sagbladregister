/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { useState, useEffect } from "react";
import DatepickerComponent from "../reusable/Datepicker";

interface statistikkProps {
  historikkData: {
    feilkode: string;
    sagNr: string;
  };
}

const StatistikkMain = ({
  historikkData,
  setDateValue,
  dateValue,
}: statistikkProps) => {
  const feilkoder: string[] = [
    "Ingen anmerkning",
    "Bølger",
    "Vandrer på hjul",
    "Sprekk",
    "Tannbrudd",
    "Sponpåliming",
    "Sløv",
    "River",
    "Ytre faktorer",
    "Reklamasjon",
    "Havari",
    "Ikjøring",
    "Riper/bølger",
    "Riper/sprekk",
    "Riper/vandrer",
    "Bølger/sprekk",
    "Bølger/vandrer",
    "Ikjøring/riper",
  ];

  const [tableData, setTableData] = useState<
    Record<string, { total: number; [key: string]: number }>
  >({});

  useEffect(() => {
    const updatedTableData: Record<
      string,
      { total: number; [key: string]: number }
    > = {};

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    historikkData?.forEach((item) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { sagNr, feilkode } = item;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (!updatedTableData[sagNr]) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        updatedTableData[sagNr] = { total: 1, [feilkode]: 1 };
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        updatedTableData[sagNr].total += 1;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        updatedTableData[sagNr][feilkode] =
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          (updatedTableData[sagNr][feilkode] ?? 0) + 1;
      }
    });

    setTableData(updatedTableData);
  }, [historikkData]);

  return (
    <div className="">
      <div className="mx-5 mt-5">
        <div>
          <DatepickerComponent
            setDateValue={setDateValue}
            dateValue={dateValue}
          />
          <table className="table-xs bg-neutral mt-20 table">
            <thead>
              <tr>
                <th className="text-accent text-sm">Sag</th>
                <th className="text-accent text-sm">Antall</th>
                {feilkoder.map((feilkode) => (
                  <th key={feilkode} className="text-accent text-sm">
                    {feilkode}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(tableData).map(([sagNr, data]) => (
                <tr className="bg-accent" key={sagNr}>
                  <td className="border-primary border bg-teal-700 px-4 py-2">
                    {sagNr}
                  </td>
                  <td className="border-primary border px-4 py-2">
                    {data.total}
                  </td>

                  {feilkoder.map((feilkode) => (
                    <td
                      key={feilkode}
                      className={`border-primary border px-4 py-2 ${
                        data[feilkode] ? "bg-secondary" : ""
                      }`}
                    >
                      {data[feilkode] ?? 0}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="">
          <table className="table-xs bg-neutral mt-20 table">
            <thead>
              <tr>
                <th className="text-accent text-sm">Sag</th>
                <th className="text-accent text-sm">Antall</th>
                {feilkoder.map((feilkode) => (
                  <th key={feilkode} className="text-accent text-sm">
                    {feilkode}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(tableData).map(([sagNr, data]) => (
                <tr className="bg-accent" key={sagNr}>
                  <td className="border-primary border bg-teal-700 px-4 py-2">
                    {sagNr}
                  </td>
                  <td className="border-primary border px-4 py-2">
                    {data.total}
                  </td>
                  {feilkoder.map((feilkode) => (
                    <td
                      key={feilkode}
                      className={`border-primary border px-4 py-2 ${
                        data[feilkode] ? "bg-secondary" : ""
                      }`}
                    >
                      {data?.total
                        ? (
                            ((data[feilkode] ?? 0) / data.total) * 100 || 0
                          ).toFixed(1) + "%"
                        : "0%"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StatistikkMain;
