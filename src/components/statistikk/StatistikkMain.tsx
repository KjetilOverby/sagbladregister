/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { useState, useEffect } from "react";
import DatepickerComponent from "../reusable/Datepicker";
import BarCharts from "../statistikk/BarCharts";

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
  deletedSawblades,
}: statistikkProps) => {
  const deleteReasons: string[] = [
    "Normal slitasje",
    "Ikjøring",
    "Røk av",
    "Sprekk",
    "Dårlig stamme",
    "Varmekjørt",
    "Store tannskader",
    "Oppspenningsfeil i sag",
  ];
  const deleteReasonCount = deleteReasons.reduce((countObj, reason) => {
    countObj[reason] = 0;
    return countObj;
  }, {});

  deletedSawblades?.forEach((blade) => {
    const reason = blade.deleteReason;
    if (reason in deleteReasonCount) {
      deleteReasonCount[reason]++;
    }
  });

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
    <div className="pb-10">
      <div className="mx-5 mt-5 max-lg:mx-0">
        <div>
          <div className="w-1/5 max-lg:w-full">
            <DatepickerComponent
              setDateValue={setDateValue}
              dateValue={dateValue}
            />
          </div>
        </div>

        <div className="mt-20 flex w-full rounded-xl border border-secondary p-5 max-lg:grid">
          <div className="w-2/5 max-lg:w-full">
            <h1 className="text-2xl text-neutral">Årsak til vrak</h1>
            <p className="text-neutral">
              Antall vrak: {deletedSawblades?.length}
            </p>
            <BarCharts deleteReasonCount={deleteReasonCount} />
          </div>
          <div className="ml-16 w-3/5 rounded-xl bg-accent p-5 max-lg:ml-0 max-lg:w-full">
            {
              <>
                <h1 className="text-neutral">Årsak til vrak:</h1>
                <ul className=" italic text-neutral">
                  {Object.entries(deleteReasonCount).map(([reason, count]) => (
                    <li key={reason}>
                      {reason}: {count}
                    </li>
                  ))}
                </ul>
              </>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatistikkMain;
