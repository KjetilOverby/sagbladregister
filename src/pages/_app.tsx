// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { useState } from "react";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [theme, setTheme] = useState("darkmode");
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} theme={theme} setTheme={setTheme} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
