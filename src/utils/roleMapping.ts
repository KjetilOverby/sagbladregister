// roleMapping.ts
export const roleToKundeID: Record<string, string> = {
  USER: "USER",
  LOGIN: "LOGIN",
  ADMIN: "ADMIN",
  MV_ADMIN: "MV",
  MT_ADMIN: "MT",
};

// Funksjon for å hente kundeID basert på rolle
export const getKundeID = (role: string | undefined): string | null => {
  return role ? roleToKundeID[role] ?? null : null;
};
