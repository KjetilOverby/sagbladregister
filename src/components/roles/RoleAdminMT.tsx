import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const RoleAdminMT = ({ children }: { children: React.ReactNode }) => {
  const { data: sessionData } = useSession();
  return <div>{sessionData?.user.role === "MT_ADMIN" && children}</div>;
};

export default RoleAdminMT;
