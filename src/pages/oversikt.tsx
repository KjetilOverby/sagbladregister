import React, { useState, useEffect } from "react";
import OverviewTable from "~/components/oversikt/OverviewTable";
import HeaderComponent from "~/components/reusable/HeaderComponent";
import { api } from "~/utils/api";
import { signIn, signOut, useSession } from "next-auth/react";

const Oversikt = ({ theme }: { theme: string }) => {
  const { data: sessionData } = useSession();

  const [customerInit, setCustomerInit] = useState("");

  useEffect(() => {
    if (sessionData?.user.role === "MV_ADMIN") {
      setCustomerInit("MV-");
    } else if (sessionData?.user.role === "MT_ADMIN") {
      setCustomerInit("MT-");
    }
  }, [sessionData]);
  const { data: count } = api.sawblades.countSawblades.useQuery();
  const { data: countCustomer } = api.sawblades.countSawbladesCustomer.useQuery(
    {
      init: customerInit,
    },
  );
  return (
    <div className="min-h-screen" data-theme={theme}>
      <HeaderComponent />
      <div className=" px-48 max-2xl:w-screen max-xl:m-0">
        {sessionData?.user.role === "ADMIN" && <OverviewTable count={count} />}
        {sessionData?.user.role === "MT_ADMIN" && (
          <OverviewTable count={countCustomer} />
        )}
        {sessionData?.user.role === "MV_ADMIN" && (
          <OverviewTable count={countCustomer} />
        )}
      </div>
    </div>
  );
};

export default Oversikt;
