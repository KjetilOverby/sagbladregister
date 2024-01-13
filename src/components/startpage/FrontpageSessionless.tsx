import Link from "next/link";
import React from "react";

interface userProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  session: any;
}

const FrontpageSessionless = ({ session }: userProps) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[url('https://static.albertafarmexpress.ca/wp-content/uploads/2016/11/WoodLogs_ThinkstockPhotos-8.jpg')] bg-cover bg-no-repeat text-white">
      <div className="flex flex-col rounded-full   p-20 text-center">
        <h1 className="mb-5 text-8xl font-bold text-yellow-400">KS TOOLS</h1>

        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-center text-2xl text-white"></p>
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="w-96 rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            >
              {session ? "Sign out" : "Sign in"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontpageSessionless;
