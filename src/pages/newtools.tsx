/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState, useEffect } from "react";
import { api } from "~/utils/api";
import dateFormat from "dateformat";
import CreatePost from "~/components/newtools/CreatePost";
import HeaderComponent from "~/components/reusable/HeaderComponent";
import DatepickerComponent from "~/components/reusable/Datepicker";
import Deleteblades from "~/components/newtools/deleteblades";
import { signIn, signOut, useSession } from "next-auth/react";
import NotAuthorized from "~/components/reusable/NotAuthorized";
const Newtools = ({ theme, setTheme }) => {
  const { data: sessionData } = useSession();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const date = new Date().getDate();

  // endDate: `${year}-${month}-${date}`,
  // startDate: `${year}-${month}-${date}`,

  // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
  const [dateValue, setDateValue] = useState({
    endDate: `2040-01-15`,
    startDate: `2024-01-15`,
  });

  const [idValue, setIdValue] = useState("");

  const { data } = api.sawblades.getAll.useQuery({
    date: `${dateValue.endDate}T23:59:59.000Z`,
    date2: `${dateValue.startDate}T00:00:00.000Z`,
    IdNummer: idValue,
  });
  return (
    <div data-theme={theme}>
      {sessionData?.user.role === "ADMIN" ? (
        <>
          <HeaderComponent setTheme={setTheme} />

          <div className="h-screen bg-base-100 p-5 max-lg:p-0">
            <div className="overflow-x-auto px-5 pt-5">
              <div className="flex h-96 flex-row py-5 max-lg:grid max-lg:h-5/6">
                <CreatePost />
                <div className="ml-5 rounded-xl bg-accent p-5 max-lg:ml-0">
                  <DatepickerComponent
                    setDateValue={setDateValue}
                    dateValue={dateValue}
                  />
                  <div className="flex flex-col">
                    <label>ID nummer</label>
                    <input
                      onChange={(e) => setIdValue(e.currentTarget.value)}
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered input-xs w-full max-w-xs bg-primary"
                    />
                  </div>
                </div>
              </div>
              <h1 className="mb-3 text-neutral">
                Registrerte blad i perioden: {data?.length}
              </h1>
              <table className="table table-xs whitespace-nowrap bg-primary">
                <thead>
                  <tr>
                    <th className="text-sm text-neutral">Serienummer</th>
                    <th className="text-sm text-neutral">Produsent</th>
                    <th className="text-sm text-neutral">Type</th>
                    <th className="text-sm text-neutral">Dato</th>

                    <th className="text-sm text-neutral">Opprettet av</th>
                    <th className="text-sm text-neutral"></th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((blade) => {
                    return (
                      <>
                        <tr className="border border-primary bg-accent">
                          <td className="font-bold text-neutral">
                            {blade.IdNummer}{" "}
                            {blade.note !== "-" && (
                              <span className="text-xs font-normal text-orange-200">
                                ({blade.note})
                              </span>
                            )}
                          </td>
                          <td>
                            <div className="flex items-center space-x-3">
                              <div className="avatar"></div>
                              <div>
                                <div className="text-xs text-neutral">
                                  {blade.produsent}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="flex items-center space-x-3">
                              <div className="avatar"></div>
                              <div>
                                <div className="text-xs text-neutral">
                                  {blade.type} {blade.side}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td>
                            <div className="flex items-center space-x-3">
                              <div className="avatar"></div>
                              <div>
                                <div className="text-xs text-neutral">
                                  {dateFormat(
                                    blade.updatedAt,
                                    "dd.mm.yyyy , HH:MM",
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="text-neutral">
                            <td className="flex items-center">
                              <div className="mr-2 h-5 w-5">
                                <img
                                  className="rounded-full"
                                  src={blade.creatorImg}
                                  alt=""
                                />
                              </div>
                              {blade.creator}
                            </td>
                          </td>

                          <td>
                            <th className="text-red-600">
                              <Deleteblades blade={blade.id} />
                            </th>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <NotAuthorized />
      )}
    </div>
  );
};

export default Newtools;
