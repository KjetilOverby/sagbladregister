// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { useEffect, useState, useRef } from "react";
import { AppDataContext } from "~/context";
import { set } from "zod";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [theme, setTheme] = useState("lightmode");
  const [themeUse, setThemeUse] = useState<string>("darkmode");
  const [datetheme, setDatetheme] = useState("dark");
  const [darkMode, setDarkMode] = useState("");
  const [dateThemeUse, setDateThemeUse] = useState("");

  const UseComponentDidMount = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ref = useRef<any>();
    useEffect(() => {
      ref.current = true;
    }, []);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return ref.current;
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const isComponentMounted = UseComponentDidMount();

  // useEffect(() => {
  //   if (theme && isComponentMounted) {
  //     localStorage.setItem("darkMode", "true");
  //   } else if (!theme && isComponentMounted) {
  //     localStorage.setItem("darkMode", "false");
  //   }
  // }, [theme]);

  useEffect(() => {
    if (isComponentMounted) {
      localStorage.setItem("theme", theme);
      localStorage.setItem("datetheme", darkMode);
    }
  }, [theme]);

  useEffect(() => {
    setThemeUse(localStorage.getItem("theme"));
    setDateThemeUse(localStorage.getItem("datetheme"));
  }, [theme]);

  return (
    <SessionProvider session={session}>
      <AppDataContext.Provider
        value={{ setTheme, theme, darkMode, setDarkMode, dateThemeUse }}
      >
        <Component
          {...pageProps}
          theme={themeUse}
          darkMode={datetheme}
          setTheme={setTheme}
        />
      </AppDataContext.Provider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
