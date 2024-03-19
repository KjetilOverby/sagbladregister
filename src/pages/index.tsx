// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { signIn, signOut, useSession } from "next-auth/react";

import AdminStartpage from "~/components/startpage/AdminStartpage";
import FrontpageSessionless from "~/components/startpage/FrontpageSessionless";
import CustomerStartpage from "../components/startpage/CustomerStartpage";
import NotLoggedInPage from "~/components/startpage/NotLoggedInPage";
import { useEffect, useState } from "react";
import dateFormat from "dateformat";
import { api } from "~/utils/api";
import RoleAdminMV from "~/components/roles/RoleAdminMV";

interface adminProps {
  theme: string;
}

export default function Home({ theme }: adminProps) {
  const { data: sessionData } = useSession();

  const [customerInit, setCustomerInit] = useState("");

  useEffect(() => {
    if (sessionData?.user.role === "MV_ADMIN") {
      setCustomerInit("MV-");
    } else if (sessionData?.user.role === "MT_ADMIN") {
      setCustomerInit("MT-");
    }
  }, [sessionData]);

  const [dateValue, setDateValue] = useState({
    endDate: dateFormat(new Date(), "yyyy-mm-dd"),
    startDate: dateFormat(new Date(), "yyyy-mm-dd"),
  });

  const { data: newblades } = api.sawblades.getAllCreate.useQuery({
    date: `${dateValue.endDate}T23:59:59.000Z`,
    date2: `${dateValue.startDate}T00:00:00.000Z`,
    IdNummer: "",
  });
  const { data: deletedblades } = api.sawblades.getAllDeleted.useQuery({
    date: `${dateValue.endDate}T23:59:59.000Z`,
    date2: `${dateValue.startDate}T00:00:00.000Z`,
  });
  const { data: servicepost } =
    api.statistikkBladeData.getAllHistorikk.useQuery({
      date: `${dateValue.endDate}T23:59:59.000Z`,
      date2: `${dateValue.startDate}T00:00:00.000Z`,
    });

  const { data: servicepostUpdate } =
    api.statistikkBladeData.getAllHistorikkUpdate.useQuery({
      date: `${dateValue.endDate}T23:59:59.000Z`,
      date2: `${dateValue.startDate}T00:00:00.000Z`,
    });
  const { data: servicepostKS } =
    api.statistikkBladeData.getAllHistorikkKS.useQuery({
      date: `${dateValue.endDate}T23:59:59.000Z`,
      date2: `${dateValue.startDate}T00:00:00.000Z`,
    });

  // ************* CUSTOMERS *************

  const { data: newbladesCustomer } =
    api.sawblades.getAllCreateCustomer.useQuery({
      date: `${dateValue.endDate}T23:59:59.000Z`,
      date2: `${dateValue.startDate}T00:00:00.000Z`,
      IdNummer: "",
      init: customerInit,
    });

  const { data: deletedbladesCustomer } =
    api.sawblades.getCustomerAllDeleted.useQuery({
      date: `${dateValue.endDate}T23:59:59.000Z`,
      date2: `${dateValue.startDate}T00:00:00.000Z`,
      init: customerInit,
    });

  const { data: servicepostCustomer } =
    api.statistikkBladeData.getAllCustomerHistorikk.useQuery({
      date: `${dateValue.endDate}T23:59:59.000Z`,
      date2: `${dateValue.startDate}T00:00:00.000Z`,
      init: customerInit,
      bladeRelationId: "",
    });

  const { data: servicepostUpdateCustomer } =
    api.statistikkBladeData.getAllHistorikkUpdateCustomer.useQuery({
      date: `${dateValue.endDate}T23:59:59.000Z`,
      date2: `${dateValue.startDate}T00:00:00.000Z`,
      init: customerInit,
    });

  const { data: servicepostKSCustomer } =
    api.statistikkBladeData.getAllHistorikkKSCustomer.useQuery({
      date: `${dateValue.endDate}T23:59:59.000Z`,
      date2: `${dateValue.startDate}T00:00:00.000Z`,
      init: customerInit,
      bladeRelationId: "",
    });

  return (
    <div className="min-h-screen">
      {!sessionData && <NotLoggedInPage />}
      {sessionData && sessionData.user.role === "LOGIN" && (
        <FrontpageSessionless session={sessionData} />
      )}
      {sessionData && sessionData.user.role === "ADMIN" && (
        <AdminStartpage
          theme={theme}
          newblades={newblades}
          deletedblades={deletedblades}
          servicepost={servicepost}
          servicepostKS={servicepostKS}
          dateValue={dateValue}
          setDateValue={setDateValue}
          servicepostUpdate={servicepostUpdate}
        />
      )}
      <RoleAdminMV>
        <CustomerStartpage
          dateValue={dateValue}
          setDateValue={setDateValue}
          theme={theme}
          newblades={newbladesCustomer}
          deletedblades={deletedbladesCustomer}
          servicepost={servicepostCustomer}
          servicepostUpdate={servicepostUpdateCustomer}
          servicepostKS={servicepostKSCustomer}
        />
      </RoleAdminMV>

      {sessionData && sessionData.user.role === "MT_ADMIN" && (
        <CustomerStartpage />
      )}
    </div>
  );
}
