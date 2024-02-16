import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const RoleAdminMV = ({ children }) => {
  const { data: sessionData } = useSession();
  return <div>{sessionData?.user.role === "MV_ADMIN" && children}</div>;
};

export default RoleAdminMV;
