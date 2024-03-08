import React from "react";
import OverviewTable from "~/components/oversikt/OverviewTable";
import HeaderComponent from "~/components/reusable/HeaderComponent";
import { api } from "~/utils/api";
import { signIn, signOut, useSession } from "next-auth/react";

const Oversikt = ({ theme }: { theme: string }) => {
  const { data: sessionData } = useSession();
  const { data: count } = api.sawblades.countSawblades.useQuery();
  return (
    <div className="min-h-screen" data-theme={theme}>
      <HeaderComponent />
      <div className=" px-48 max-2xl:w-screen max-xl:m-0">
        {sessionData?.user.role === "ADMIN" && <OverviewTable count={count} />}
      </div>
    </div>
  );
};

export default Oversikt;
