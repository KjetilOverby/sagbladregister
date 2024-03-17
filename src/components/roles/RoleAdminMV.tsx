import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const RoleAdminMV = ({ children }: { children: React.ReactNode }) => {
  const { data: sessionData } = useSession();
  if (sessionData?.user.role === "MV_ADMIN") {
    return <>{children}</>;
  }
  return null;
};

export default RoleAdminMV;
