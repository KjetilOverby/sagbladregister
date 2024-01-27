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
    service: string;
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
    "Havari",
    "Dårlig stamme",
    "Varmekjørt",
    "Store tannskader",
  ];
  const serviceReasons: string[] = [
    "Omlodding",
    "Rep tannskader",
    "Reklamasjon tannslipp",
    "Reklamasjon dårlig lodd",
    "Reklamasjon feil",
  ];
  const deleteReasonCount = deleteReasons.reduce((countObj, reason) => {
    countObj[reason] = 0;
    return countObj;
  }, {});
  const serviceReasonCount = serviceReasons.reduce((countObj, reason) => {
    countObj[reason] = 0;
    return countObj;
  }, {});

  deletedSawblades?.forEach((blade) => {
    const reason = blade.deleteReason;
    if (reason in deleteReasonCount) {
      deleteReasonCount[reason]++;
    }
  });
  historikkData?.forEach((blade) => {
    const reason = blade.service;
    if (reason in serviceReasonCount) {
      serviceReasonCount[reason]++;
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
      const { service, feilkode } = item;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (!updatedTableData[service]) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        updatedTableData[service] = { total: 1, [feilkode]: 1 };
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        updatedTableData[service].total += 1;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        updatedTableData[service][feilkode] =
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          (updatedTableData[service][feilkode] ?? 0) + 1;
      }
    });

    setTableData(updatedTableData);
  }, [historikkData]);

  useEffect(() => {
    const updatedServiceTableData: Record<
      string,
      { total: number; [key: string]: number }
    > = {};

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    historikkData?.forEach((item) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { service, feilkode } = item;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (!updatedServiceTableData[service]) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        updatedServiceTableData[service] = { total: 1, [feilkode]: 1 };
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        updatedServiceTableData[service].total += 1;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        updatedServiceTableData[service][feilkode] =
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          (updatedServiceTableData[service][feilkode] ?? 0) + 1;
      }
    });

    setTableData(updatedServiceTableData);
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
            <h1 className="text-2xl text-neutral">Service</h1>
            <p className="text-neutral">Antall: {historikkData?.length}</p>
            <BarCharts deleteReasonCount={serviceReasonCount} />
          </div>
          <div className="ml-16 w-3/5 rounded-xl bg-accent p-5 max-lg:ml-0 max-lg:w-full">
            {
              <>
                <h1 className="text-neutral">Service:</h1>
                <ul className=" italic text-neutral">
                  {Object.entries(serviceReasonCount).map(([reason, count]) => (
                    <li key={reason}>
                      {reason}: {count}
                    </li>
                  ))}
                </ul>
              </>
            }
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
