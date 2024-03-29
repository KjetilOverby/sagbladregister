/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import dateFormat from "dateformat";

const SawbladeServiceTable = ({ sawbladesService }) => {
  return (
    <div>
      <table className="table table-xs whitespace-nowrap ">
        <thead>
          <tr>
            <th className="text-sm text-neutral">ID</th>
            <th className="text-sm text-neutral">Type</th>
            <th className="text-sm text-neutral">Til service</th>
            <th className="text-sm text-neutral">Servicetype</th>

            {/* <th className="text-sm text-accent">Opprettet av</th> */}
          </tr>
        </thead>
        <tbody>
          {sawbladesService?.map((blade) => {
            console.log(blade.bandhistorikk);

            return (
              <>
                {blade && (
                  <tr className="hover:cursor-pointer hover:bg-primary">
                    <td className="font-bold text-neutral">
                      {blade.IdNummer}{" "}
                      {blade.note && (
                        <span className="text-xs font-normal text-gray-400">
                          {blade.note}
                        </span>
                      )}
                    </td>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="text-xs text-neutral">
                            {blade.type} {blade.side}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="text-xs text-neutral">
                            {dateFormat(blade.updatedAt, "dd.mm.yyyy")}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="text-xs text-neutral">
                            {
                              blade.bandhistorikk &&
                              blade.bandhistorikk.length > 0
                                ? blade.bandhistorikk[
                                    blade.bandhistorikk.length - 1
                                  ].service
                                : "Default Value" // Replace with a suitable default value
                            }
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SawbladeServiceTable;
