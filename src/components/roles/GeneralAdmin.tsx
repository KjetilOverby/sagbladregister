/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import React from "react";
import { useSession } from "next-auth/react";
import { roleToKundeID } from "~/utils/roleMapping"; // Henter roller dynamisk

interface RoleAccessProps {
  allowedRoles?: string[]; // Valgfri for tilpassede roller
  children: React.ReactNode;
}

// Roller som skal ekskluderes
const excludedRoles = ["USER", "LOGIN", "ADMIN"];

const RoleAccess = ({
  allowedRoles = Object.keys(roleToKundeID).filter(
    (role) => !excludedRoles.includes(role),
  ),
  children,
}: RoleAccessProps) => {
  const { data: sessionData } = useSession();
  const userRole = sessionData?.user?.role;

  console.log("🔍 Brukerrolle:", userRole);
  console.log("✅ Tillatte roller:", allowedRoles);

  if (!userRole || !allowedRoles.includes(userRole)) {
    console.log("❌ Tilgang nektet!");
    return null;
  }

  console.log("✅ Tilgang gitt!");
  return <>{children}</>;
};

export default RoleAccess;
