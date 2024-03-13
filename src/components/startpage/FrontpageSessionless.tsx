import Link from "next/link";
import React from "react";

interface userProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  session: any;
}

const FrontpageSessionless = ({ session }: userProps) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <div className="flex flex-col rounded-full p-20 text-center">
        <img
          className="w-full"
          src="https://lh3.googleusercontent.com/pw/AP1GczO19apGy2A8BpjpXfSxH9QqnIHayFE3D79I2fFrdmwJNHOHpn6q7T6w9AWxC6w5xkY-_CYbwYSuasGM8ppssCBtuLEz1m_mRsT8ttP5rHf_cHK153cz89ehUYEUpXKfetsUMRKUuYy0hMhZ2xLoPyR0=w1920-h193-s-no?authuser=0"
          alt=""
        />

        <p className="py-5">
          Du er inlogget i KS TOOLTRACKER men har ikke tilgang til appen enda.
        </p>
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
