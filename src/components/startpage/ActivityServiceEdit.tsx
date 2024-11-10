/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import dateFormat from "dateformat";

const ActivityServiceEdit = ({ servicepostUpdate }) => {
  return (
    <div>
      <h1 className="my-3 text-xs text-neutral md:text-lg">
        Serviceposter endret: ({servicepostUpdate?.length})
      </h1>
      {servicepostUpdate && servicepostUpdate.length > 0 ? (
        servicepostUpdate.map((blade) => {
          return (
            <div key={blade.id}>
              <ul>
                <div className="mb-2 flex items-center">
                  <img
                    className="mr-3 w-5 rounded-full"
                    src={blade.creatorImg2}
                    alt=""
                  />
                  <li className="mb-3 text-[0.55rem] text-neutral md:mb-0 md:text-xs">
                    {dateFormat(blade.updatedAt, "dd.mm.yyyy, HH:MM")} -{" "}
                    <span className="text-blue-500">
                      {" "}
                      {blade.sgSag ? blade.sgSag : blade.creator2}
                    </span>{" "}
                    har endret servicepost for{" "}
                    <span className="text-red-500">
                      {blade.bladType} {blade.side}
                    </span>{" "}
                    med service:{" "}
                    <span className="text-orange-600">{blade.service}</span> ,{" "}
                    {blade.anmSag && (
                      <>
                        Kommentar:{" "}
                        <span className="text-blue-600"> ({blade.anmSag})</span>
                        ,{" "}
                      </>
                    )}
                    id nummer:{" "}
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

export default ActivityServiceEdit;
