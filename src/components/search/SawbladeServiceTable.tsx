/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import dateFormat from "dateformat";

const SawbladeServiceTable = ({ sawbladesService, setIdValue }) => {
  return (
    <div>
      <table className="table table-xs whitespace-nowrap ">
        <thead>
          <tr>
            <th className="text-neutral md:text-sm">ID</th>
            <th className="text-neutral md:text-sm">Type</th>
            <th className="text-neutral md:text-sm">Til service</th>
            <th className="text-neutral md:text-sm">Servicetype</th>

            {/* <th className="text-sm text-accent">Opprettet av</th> */}
          </tr>
        </thead>
        <tbody>
          {sawbladesService?.map((blade) => {
            console.log(blade);

            return (
              <>
                {blade && (
                  <tr
                    onClick={() => setIdValue(blade.IdNummer)}
                    className="hover:cursor-pointer hover:bg-primary"
                  >
                    <td className="text-[0.6rem] font-bold text-neutral md:text-xs">
                      {blade.IdNummer}{" "}
                      {blade.note && (
                        <span className="text-[0.6rem] font-normal  text-gray-400 md:text-xs ">
                          {blade.note}
                        </span>
                      )}
                    </td>
                    <td>
                      <div className="flex items-center space-x-3 ">
                        <div>
                          <div className="text-[0.6rem] text-neutral md:text-xs">
                            {blade.type} {blade.side}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className=" text-[0.6rem] text-neutral md:text-xs">
                            {dateFormat(blade.updatedAt, "dd.mm.yyyy, HH:MM")}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="text-[0.6rem] text-neutral md:text-xs">
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
