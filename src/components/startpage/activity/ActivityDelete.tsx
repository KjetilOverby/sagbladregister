/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import dateFormat from "dateformat";

const ActivityDelete = ({ deletedblades }) => {
  return (
    <div>
      <h1 className="my-3 text-xs  text-neutral md:text-lg">
        Blad slettet: ({deletedblades?.length})
      </h1>
      {deletedblades && deletedblades.length > 0 ? (
        deletedblades.map((blade) => {
          return (
            <div key={blade.id}>
              <ul>
                <div className="mb-2 flex items-center">
                  <img
                    className="mr-3 w-5 rounded-full"
                    src={blade.deleterImg}
                    alt=""
                  />
                  <li className="mb-3 text-[0.55rem] text-neutral md:mb-0 md:text-xs">
                    {dateFormat(blade.updatedAt, "dd.mm.yyyy, HH:MM")} -{" "}
                    <span className="text-blue-500">{blade.deleter}</span> har
                    slettet{" "}
                    <span className="text-red-500">
                      {blade.type} {blade.side}
                    </span>
                    . Sletteårsak:
                    <span className="text-orange-500">
                      {" "}
                      {blade.deleteReason},{" "}
                    </span>
                    for <span className="text-purple-500">{blade.kunde}</span>,
                    id nr:{" "}
                    <span className="text-green-600">{blade.IdNummer}</span>
                  </li>
                </div>
              </ul>
            </div>
          );
        })
      ) : (
        <p className="text-xs italic text-gray-500">
          Ingen aktivitet i perioden.
        </p>
      )}
    </div>
  );
};

export default ActivityDelete;
