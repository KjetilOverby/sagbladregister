import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

interface RoleAdminProps {
  children: React.ReactNode;
}

const RoleAdmin = ({ children }: RoleAdminProps) => {
  const { data: sessionData } = useSession();
  if (sessionData?.user.role === "ADMIN") {
    return <>{children}</>;
  }
  return null;
};

export default RoleAdmin;
