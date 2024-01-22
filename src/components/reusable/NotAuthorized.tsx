// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const NotAuthorized = () => {
  return (
    <div
      data-theme="darkmode"
      className="flex h-screen flex-col items-center justify-center"
    >
      <h1>Bruker ikke autorisert.</h1>
      <button className="btn btn-xs mt-5 bg-secondary" onClick={signIn}>
        Logg inn
      </button>
    </div>
  );
};

export default NotAuthorized;
