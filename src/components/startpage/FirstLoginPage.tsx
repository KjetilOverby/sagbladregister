// import { getServerAuthSession } from "~/server/auth";

import Link from "next/link";

interface sessionProps {
  session: object;
}

const FirstLoginPage = ({ session }: sessionProps) => {
  // const session = await getServerAuthSession();
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-400">
      <div className="flex flex-col justify-center">
        <h1>KS TOOLS</h1>
        {/* <h1 className="mb-5 text-5xl text-slate-600">
          VELKOMMEN {session?.user.name}
        </h1> */}
        <div className="w-96 ">
          <p className="text-xs text-slate-600">
            Dette er en privat nettside og din konto har ikke tilgang til denne
            siden. Dersom du skal ha tilgang på denne nettsiden så må du
            kontakte:
          </p>
          <p className="mt-5 text-sm text-slate-800">Kjetil Øverby</p>
          <p className="mb-5 text-sm text-slate-800">ktldesign80@gmail.com</p>
          <p className="text-xs text-slate-600">
            Etter at du har fått tilgang så får du en mail. Da må du ta en
            reload på nettsiden eller logge inn på nytt.
          </p>
        </div>
        <div className="mt-10 flex flex-col items-center justify-center gap-4">
          <Link
            href={session ? "/api/auth/signout" : "/api/auth/signin"}
            className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
          >
            {session ? "Sign out" : "Sign in"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FirstLoginPage;
