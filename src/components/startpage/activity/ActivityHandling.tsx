/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import dateFormat from "dateformat";

const ActivityHandling = ({ servicepostKS }) => {
  const countService = servicepostKS?.filter((item) => item.handling).length;
  return (
    <div>
      <h1 className="my-3 text-xs font-bold text-gray-500 md:text-lg">
        Handling Kvarnstrands & Stridsbergs: ({countService})
      </h1>
      {servicepostKS && servicepostKS.length >= 0 ? (
        servicepostKS.map((blade) => {
          return (
            <>
              {blade.handling !== "" && (
                <div key={blade.id}>
                  <ul>
                    <div className="mb-2 flex items-center">
                      {blade.creator3 && (
                        <>
                          <img
                            className="mr-3 w-5 rounded-full"
                            src={blade.creatorImg3}
                            alt=""
                          />
                          <li className="mb-3 text-[0.55rem] text-gray-500 md:mb-0 md:text-xs">
                            {dateFormat(blade.datoSrv, "dd.mm.yyyy, HH:MM")} -{" "}
                            <span className="text-blue-500">
                              {blade.sgKS ? blade.sgKS : blade.creator3}
                            </span>{" "}
                            har lagt til handling for{" "}
                            <span className="text-red-500">
                              {blade.bladType} {blade.side}
                            </span>
                            , kode:{" "}
                            <span className="text-orange-600">
                              {blade.handling}
                            </span>
                            ,{" "}
                            {blade.anmKS && (
                              <>
                                Kommentar:{" "}
                                <span className="text-blue-600">
                                  {" "}
                                  ({blade.anmKS})
                                </span>
                                ,{" "}
                              </>
                            )}{" "}
                            id nummer:{" "}
                            <span className="text-green-500">
                              {blade.bladeRelationId}
                            </span>
                          </li>
                        </>
                      )}
                    </div>
                  </ul>
                </div>
              )}
            </>
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

export default ActivityHandling;
