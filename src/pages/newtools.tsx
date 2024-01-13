/* eslint-disable @typescript-eslint/no-unsafe-call */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import { api } from "~/utils/api";
import dateFormat from "dateformat";
import CreatePost from "~/components/newtools/CreatePost";
import HeaderComponent from "~/components/reusable/HeaderComponent";
const newtools = () => {
  const { data } = api.sawblades.getAll.useQuery({});

  // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
  return (
    <div data-theme="darkmode">
      <HeaderComponent />
      <div className="bg-base-100 h-screen p-5">
        <div className="overflow-x-auto px-5 pt-5">
          <div className="flex h-96 flex-row py-5">
            <CreatePost />
            {/*
                <SearchByDate /> */}
          </div>
          <h1 className="mb-3 text-orange-400">
            Registrerte blad i perioden: {data?.length}
          </h1>
          <table className="table-xs bg-primary table">
            <thead>
              <tr>
                <th className="text-accent text-sm">Serienummer</th>
                <th className="text-accent text-sm">Type</th>
                <th className="text-accent text-sm">Dato</th>

                <th className="text-accent text-sm">Opprettet av</th>
                <th className="text-accent text-sm"></th>
              </tr>
            </thead>
            <tbody>
              {data?.map((blade) => {
                return (
                  <>
                    <tr className="bg-accent">
                      <td className="text-neutral font-bold">
                        {blade.IdNummer}{" "}
                        {blade.note && (
                          <span className="text-xs font-normal text-orange-200">
                            ({blade.note})
                          </span>
                        )}
                      </td>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar"></div>
                          <div>
                            <div className="text-neutral text-xs">
                              {blade.type} {blade.side}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar"></div>
                          <div>
                            <div className="text-neutral text-xs">
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
                        <th className="text-red-400">
                          {/* <Deleteblades blade={blade.id} /> */}
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
    </div>
  );
};

export default newtools;
