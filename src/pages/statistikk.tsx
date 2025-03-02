/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react-hooks/rules-of-hooks */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState, useEffect } from "react";
import { api, ApiType } from "~/utils/api";
import { getServerAuthSession } from "~/server/auth";
import { signIn, signOut, useSession } from "next-auth/react";
import StatistikkMain from "~/components/statistikk/StatistikkMain";
import HeaderComponent from "~/components/reusable/HeaderComponent";
import dateFormat from "dateformat";
import { getKundeID } from "~/utils/roleMapping";
import GeneralAdmin from "~/components/roles/GeneralAdmin";

const statistikk = ({ theme, dateValue, setDateValue }: { theme: string }) => {
  const { data: sessionData } = useSession();

  const [customerInit, setCustomerInit] = useState("");

  useEffect(() => {
    if (sessionData?.user.role) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const kundeID = getKundeID(sessionData.user.role);
      if (kundeID) {
        setCustomerInit(kundeID + "-");
      }
    }
  }, [sessionData]);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const { data: retipStats } = (api as ApiType).sawblades.getRetipStats // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    .useQuery({});

  const { data: retipStatsCustomer } =
    api.sawblades.getRetipStatsCustomer.useQuery({
      init: customerInit,
    });

  const { data: statistikkData } =
    api.statistikkBladeData.getAllHistorikk.useQuery({
      date: `${dateValue.endDate}T23:59:59.000Z`,
      date2: `${dateValue.startDate}T00:00:00.000Z`,
    });

  const { data: toothCount } =
    api.statistikkBladeData.getAllToothCount.useQuery({
      date: `${dateValue.endDate}T23:59:59.000Z`,
      date2: `${dateValue.startDate}T00:00:00.000Z`,
    });

  const { data: statistikkDataCustomer } =
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    api.statistikkBladeData.getAllCustomerHistorikk.useQuery({
      date: `${dateValue.endDate}T23:59:59.000Z`,
      date2: `${dateValue.startDate}T00:00:00.000Z`,
      bladeRelationId: customerInit,
      init: customerInit,
    });

  const { data: deletedSawblades } = api.sawblades.getAllDeleted.useQuery({
    date: `${dateValue.endDate}T23:59:59.000Z`,
    date2: `${dateValue.startDate}T00:00:00.000Z`,
    IdNummer: "",
  });

  const { data: reklamasjonTyper } =
    api.statistikkBladeData.reklamasjonTypes.useQuery({
      date: `${dateValue.endDate}T23:59:59.000Z`,
      date2: `${dateValue.startDate}T00:00:00.000Z`,
    });
  const { data: serviceTypes } =
    api.statistikkBladeData.serviceTypesCount.useQuery({
      date: `${dateValue.endDate}T23:59:59.000Z`,
      date2: `${dateValue.startDate}T00:00:00.000Z`,
    });
  const { data: serviceTypesCustomer } =
    api.statistikkBladeData.serviceTypesCountCustomer.useQuery({
      date: `${dateValue.endDate}T23:59:59.000Z`,
      date2: `${dateValue.startDate}T00:00:00.000Z`,
      init: customerInit,
    });

  const { data: handlingService } =
    api.statistikkBladeData.handlingServiceData.useQuery({
      date: `${dateValue.endDate}T23:59:59.000Z`,
      date2: `${dateValue.startDate}T00:00:00.000Z`,
    });

  const { data: deletedSawbladesCustomer } =
    api.sawblades.getCustomerAllDeleted.useQuery({
      date: `${dateValue.endDate}T23:59:59.000Z`,
      date2: `${dateValue.startDate}T00:00:00.000Z`,
      IdNummer: "",
      init: customerInit,
    });

  const { data: toothCountCustomer } =
    api.statistikkBladeData.getAllCustomerToothCount.useQuery({
      date: `${dateValue.endDate}T23:59:59.000Z`,
      date2: `${dateValue.startDate}T00:00:00.000Z`,
      init: customerInit,
    });

  const { data: reklamasjonTyperCustomer } =
    api.statistikkBladeData.reklamasjonTypesCustomer.useQuery({
      date: `${dateValue.endDate}T23:59:59.000Z`,
      date2: `${dateValue.startDate}T00:00:00.000Z`,
      init: customerInit,
    });

  const { data: handlingServiceCustomer } =
    api.statistikkBladeData.handlingServiceDataCustomer.useQuery({
      date: `${dateValue.endDate}T23:59:59.000Z`,
      date2: `${dateValue.startDate}T00:00:00.000Z`,
      init: customerInit,
    });

  return (
    <div data-theme={theme} className="min-h-screen">
      <HeaderComponent />
      {sessionData?.user.role === "ADMIN" && (
        <StatistikkMain
          historikkData={statistikkData}
          setDateValue={setDateValue}
          dateValue={dateValue}
          deletedSawblades={deletedSawblades}
          toothCountCustomer={toothCount}
          feilkodeReklamasjon={reklamasjonTyper}
          handlingService={handlingService}
          serviceTypes={serviceTypes}
          retipStats={retipStats}
          theme={theme}
        />
      )}
      <GeneralAdmin>
        <StatistikkMain
          historikkData={statistikkDataCustomer}
          setDateValue={setDateValue}
          dateValue={dateValue}
          deletedSawblades={deletedSawbladesCustomer}
          toothCountCustomer={toothCountCustomer}
          feilkodeReklamasjon={reklamasjonTyperCustomer}
          handlingService={handlingServiceCustomer}
          serviceTypes={serviceTypesCustomer}
          retipStats={retipStatsCustomer}
          theme={theme}
        />
      </GeneralAdmin>

      {/* {sessionData?.user.role === "MT_ADMIN" && (
        <StatistikkMain
          historikkData={statistikkDataCustomer}
          setDateValue={setDateValue}
          dateValue={dateValue}
          deletedSawblades={deletedSawbladesCustomer}
          toothCountCustomer={toothCountCustomer}
          feilkodeReklamasjon={reklamasjonTyperCustomer}
          handlingService={handlingServiceCustomer}
          retipStats={retipStatsCustomer}
          theme={theme}
        />
      )} */}
    </div>
  );
};

export default statistikk;
