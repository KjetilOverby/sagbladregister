/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import dateFormat from "dateformat";

const ActivityServiceCreate = ({ servicepost }) => {
  return (
    <div>
      <h1 className="mb-3 mt-10 font-bold text-gray-500">
        Serviceposter: ({servicepost?.length})
      </h1>
      {servicepost && servicepost.length > 0 ? (
        servicepost.map((blade) => {
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
                    <span className="text-blue-500"> {blade.creator}</span> har
                    lagt til servicepost for{" "}
                    <span className="text-red-500">
                      {blade.bladType} {blade.side}
                    </span>{" "}
                    med service: ,{" "}
                    <span className="text-orange-600">{blade.service}</span>{" "}
                    {blade.anmSag && (
                      <>
                        Kommentar:{" "}
                        <span className="text-blue-600"> ({blade.anmSag})</span>
                      </>
                    )}
                    , og id nummer:{" "}
                    <span className="text-green-600">
                      {blade.bladeRelationId}
                    </span>
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

export default ActivityServiceCreate;
