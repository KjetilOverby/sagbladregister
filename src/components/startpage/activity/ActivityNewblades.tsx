/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import dateFormat from "dateformat";

const AvtivityNewblades = ({ newblades }) => {
  return (
    <div>
      <h1 className="my-3 font-bold text-gray-500">
        Blad lagt til: ({newblades?.length})
      </h1>
      {newblades && newblades.length > 0 ? (
        newblades.map((blade) => {
          return (
            <div key={blade.id}>
              <ul>
                <div className="mb-2 flex items-center">
                  <img
                    className="mr-3 w-5 rounded-full"
                    src={blade.creatorImg}
                    alt=""
                  />
                  <li className="text-xs text-gray-500">
                    {dateFormat(blade.createdAt, "dd.mm.yyyy, HH:MM")} -{" "}
                    <span className="text-blue-500">{blade.creator}</span> har
                    lagt til{" "}
                    <span className="text-red-500">
                      {blade.type} {blade.side}
                    </span>{" "}
                    , produsent:{" "}
                    <span className="text-blue-600">{blade.produsent}</span> for{" "}
                    <span className="text-purple-500">{blade.kunde}</span>, id
                    nr: <span className="text-green-600">{blade.IdNummer}</span>
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

export default AvtivityNewblades;
