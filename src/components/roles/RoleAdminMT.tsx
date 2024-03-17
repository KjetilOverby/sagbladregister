import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const RoleAdminMT = ({ children }: { children: React.ReactNode }) => {
  const { data: sessionData } = useSession();
  if (sessionData?.user.role === "MT_ADMIN") {
    return <>{children}</>;
  }
  return null;
};

export default RoleAdminMT;
