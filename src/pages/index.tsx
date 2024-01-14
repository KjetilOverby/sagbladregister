// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { signIn, signOut, useSession } from "next-auth/react";

import AdminStartpage from "~/components/startpage/AdminStartpage";
import FrontpageSessionless from "~/components/startpage/FrontpageSessionless";
import NotLoggedInPage from "~/components/startpage/NotLoggedInPage";

import { api } from "~/utils/api";

export default function Home() {
  const { data: sessionData } = useSession();

  return (
    <div>
      {!sessionData && <NotLoggedInPage />}
      {sessionData && sessionData.user.role === "LOGIN" && (
        <FrontpageSessionless session={sessionData} />
      )}
      {sessionData && sessionData.user.role === "ADMIN" && <AdminStartpage />}
    </div>
  );
}
