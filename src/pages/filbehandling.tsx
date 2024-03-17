/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react-hooks/rules-of-hooks */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState } from "react";
import { api } from "~/utils/api";
import { signIn, signOut, useSession } from "next-auth/react";
import FilbehandlingMain from "~/filbehandling/FilbehandlingMain";

const filbehandling = ({ theme }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: sessionData } = useSession();
  const [dateValue, setDateValue] = useState({
    endDate: "2040-01-14",
    startDate: "2023-12-01",
  });
  const [idValue, setIdValue] = useState("");

  const { data: sawblades } = api.sawblades.getAll.useQuery({
    date: `${dateValue.endDate}T23:59:59.000Z`,
    date2: `${dateValue.startDate}T00:00:00.000Z`,
    IdNummer: idValue,
  });

  return (
    <div>
      <FilbehandlingMain sawblades={sawblades} theme={theme} />
    </div>
  );
};

export default filbehandling;
