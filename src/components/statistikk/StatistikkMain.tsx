/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { useState, useEffect } from "react";
import DatepickerComponent from "../reusable/Datepicker";
import BarCharts from "../statistikk/BarCharts";
import BarChartTooth from "../statistikk/BarChartTooth";
import ReklamasjontyperChart from "../statistikk/ReklamasjontyperChart";
import BarChartHandling from "../statistikk/BarchartHandling";
import ServiceKodeTabell from "../reusable/ServiceKodeTabell";
import RoleAdminMV from "../roles/RoleAdminMV";
import RoleAdminMT from "../roles/RoleAdminMT";
import RoleAdmin from "../roles/RoleAdmin";
import ServiceKodeTblAll from "../search/CustomersInit/allCustomers/ServiceKodeTblAll";

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
  toothCountCustomer,
  feilkodeReklamasjon,
  handlingService,
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
    "Sliping",
    "Reparasjon",
    "Reklamasjon",
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
    <div className="pb-45 mx-20 2xl:mx-96">
      <div className="mx-5 mt-5 max-lg:mx-0">
        <div>
          <div className="w-1/5 max-lg:w-full">
            <DatepickerComponent
              setDateValue={setDateValue}
              dateValue={dateValue}
            />
          </div>
        </div>

        <div className="flex w-full flex-col">
          <div className="lg:flex">
            <div className="m-5 mt-20 flex rounded-xl p-10 shadow-xl shadow-primary max-lg:grid lg:w-1/2">
              <div className="w-full ">
                <h1 className="text-2xl text-neutral">Service</h1>
                <p className="text-neutral">Antall: {historikkData?.length}</p>
                <BarCharts deleteReasonCount={serviceReasonCount} />
                <div className="rounded-xl  p-5 max-lg:ml-0 max-lg:w-full">
                  {
                    <>
                      <h1 className="text-neutral">Service:</h1>
                      <ul className="text-xs italic text-neutral">
                        {Object.entries(serviceReasonCount).map(
                          ([reason, count]) => (
                            <li key={reason}>
                              {reason}: {count}
                            </li>
                          ),
                        )}
                      </ul>
                    </>
                  }
                </div>
              </div>
            </div>

            <div className="m-5 mt-20 flex rounded-xl p-10 shadow-xl shadow-primary max-lg:grid lg:w-1/2">
              <div className="w-full">
                <h1 className="text-2xl text-neutral">
                  Antall tannslipp og reparasjoner av tenner
                </h1>

                <BarChartTooth data={toothCountCustomer} />
                <div className="rounded-xl  p-5 max-lg:ml-0 max-lg:w-full">
                  {
                    <>
                      <h1 className="text-neutral">Antall rep og tannslipp:</h1>
                      <ul className="text-xs italic text-neutral">
                        {toothCountCustomer?._sum &&
                          Object.entries(toothCountCustomer._sum).map(
                            ([key, value]) => (
                              <li key={key}>
                                {key}: {value}
                              </li>
                            ),
                          )}
                      </ul>
                    </>
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="lg:flex">
            <div className="m-5 mt-20 flex rounded-xl p-10 shadow-xl shadow-primary max-lg:grid lg:w-1/2">
              <div className="w-full">
                <h1 className="text-2xl text-neutral">Reklamasjonsårsaker</h1>

                <ReklamasjontyperChart data={feilkodeReklamasjon} />
                <div className="rounded-xl  p-5 max-lg:ml-0 max-lg:w-full">
                  {
                    <>
                      <h1 className="text-neutral">Reklamasjonsårsaker:</h1>
                      <ul className="text-xs italic text-neutral">
                        {feilkodeReklamasjon &&
                          feilkodeReklamasjon.map((item) => (
                            <li key={item.feilkode}>
                              {item.feilkode}: {item._count.feilkode}
                            </li>
                          ))}
                      </ul>
                    </>
                  }
                </div>
              </div>
            </div>

            <div className="m-5 mt-20 flex rounded-xl p-10 shadow-xl shadow-primary max-lg:grid lg:w-1/2">
              <div className="w-full">
                <h1 className="text-2xl text-neutral">Årsak til vrak</h1>
                <p className="text-neutral">
                  Antall vrak: {deletedSawblades?.length}
                </p>
                <BarCharts deleteReasonCount={deleteReasonCount} />
                <div className="rounded-xl  p-5 max-lg:ml-0 max-lg:w-full">
                  {
                    <>
                      <h1 className="text-neutral">Årsak til vrak:</h1>
                      <ul className="text-xs italic text-neutral">
                        {Object.entries(deleteReasonCount).map(
                          ([reason, count]) => (
                            <li key={reason}>
                              {reason}: {count}
                            </li>
                          ),
                        )}
                      </ul>
                    </>
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="m-5 mt-20 flex rounded-xl p-10 shadow-xl shadow-primary max-lg:grid ">
              <div className="w-full">
                <h1 className="text-2xl text-neutral">Service handling</h1>
                <p className="text-neutral">
                  Antall serviceposter: {historikkData?.length}
                </p>
                <BarChartHandling data={handlingService} />
                {/* <div className="rounded-xl  p-5 max-lg:ml-0 max-lg:w-full">
                  {
                    <>
                      <h1 className="text-neutral">Handling Service:</h1>
                      <ul className="text-xs italic text-neutral">
                        {handlingService &&
                          Object.entries(handlingService).map(
                            ([service, count]) => (
                              <li key={service}>
                                {service || "Ingen handling"}: {count}
                              </li>
                            ),
                          )}
                      </ul>
                    </>
                  }
                </div> */}
              </div>
            </div>
            <div className="m-5 mt-20 flex w-1/2 rounded-xl p-10 shadow-xl shadow-primary max-lg:grid">
              <div>
                <h1>Servicekoder</h1>
                <RoleAdmin>
                  <ServiceKodeTblAll />
                </RoleAdmin>
                <RoleAdminMV>
                  <ServiceKodeTabell bladeInit="MV-" />
                </RoleAdminMV>
                <RoleAdminMT>
                  <ServiceKodeTabell bladeInit="MT-" />
                </RoleAdminMT>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatistikkMain;
