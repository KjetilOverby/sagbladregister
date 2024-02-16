import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const RoleAdmin = ({ children }) => {
  const { data: sessionData } = useSession();
  return <div>{sessionData?.user.role === "ADMIN" && children}</div>;
};

export default RoleAdmin;
