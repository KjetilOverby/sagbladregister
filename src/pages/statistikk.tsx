/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react-hooks/rules-of-hooks */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState, useEffect } from "react";
import { api } from "~/utils/api";
import { getServerAuthSession } from "~/server/auth";
import { signIn, signOut, useSession } from "next-auth/react";
import StatistikkMain from "~/components/statistikk/StatistikkMain";
import HeaderComponent from "~/components/reusable/HeaderComponent";
import dateFormat from "dateformat";

const statistikk = ({ theme }) => {
  const { data: sessionData } = useSession();
  const [dateValue, setDateValue] = useState({
    endDate: dateFormat(new Date(), "yyyy-mm-dd"),
    startDate: dateFormat(new Date(), "yyyy-mm-dd"),
  });

  const [customerInit, setCustomerInit] = useState("");

  useEffect(() => {
    if (sessionData?.user.role === "MV_ADMIN") {
      setCustomerInit("MV-");
    } else if (sessionData?.user.role === "MT_ADMIN") {
      setCustomerInit("MT-");
    }
  }, [sessionData]);

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
        />
      )}
      {sessionData?.user.role === "MV_ADMIN" && (
        <StatistikkMain
          historikkData={statistikkDataCustomer}
          setDateValue={setDateValue}
          dateValue={dateValue}
          deletedSawblades={deletedSawbladesCustomer}
          toothCountCustomer={toothCountCustomer}
          feilkodeReklamasjon={reklamasjonTyperCustomer}
          handlingService={handlingServiceCustomer}
        />
      )}
      {sessionData?.user.role === "MT_ADMIN" && (
        <StatistikkMain
          historikkData={statistikkDataCustomer}
          setDateValue={setDateValue}
          dateValue={dateValue}
          deletedSawblades={deletedSawbladesCustomer}
          toothCountCustomer={toothCountCustomer}
          feilkodeReklamasjon={reklamasjonTyperCustomer}
          handlingService={handlingServiceCustomer}
        />
      )}
    </div>
  );
};

export default statistikk;
