/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import dateFormat from "dateformat";

const SawbladeServiceTable = ({ sawbladesService, setIdValue, theme }) => {
  return (
    <div>
      <table className="table table-xs whitespace-nowrap ">
        <thead>
          <tr className="bg-primary">
            <th className="py-3 text-gray-200 md:text-sm">ID</th>
            <th className="py-3 text-gray-200 md:text-sm ">Type</th>
            <th className="py-3 text-gray-200 md:text-sm ">Til service</th>
            <th className="py-3 text-gray-200 md:text-sm ">Servicetype</th>
            <th className="py-3 text-gray-200 md:text-sm ">Reklamasjon</th>
          </tr>
        </thead>
        <tbody>
          {sawbladesService?.map((blade) => {
            return (
              <>
                {blade && (
                  <tr
                    onClick={() => setIdValue(blade.IdNummer)}
                    className={`hover:cursor-pointer ${theme === "darkmode" ? "hover:bg-gray-600" : "hover:bg-gray-300"} ${
                      theme === "darkmode"
                        ? "odd:bg-gray-700"
                        : "odd:bg-gray-200"
                    }`}
                  >
                    <td className="p-2 text-[0.6rem] font-bold text-neutral md:text-xs">
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
                                : "Deaktiver Service" // Replace with a suitable default value
                            }
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="text-[0.6rem] text-neutral md:text-xs">
                            {(() => {
                              // Sjekk om `bandhistorikk` finnes og har elementer
                              if (
                                !blade?.bandhistorikk ||
                                blade.bandhistorikk.length === 0
                              ) {
                                return ""; // Hvis ingen data finnes, vis tom streng
                              }

                              // Hent siste post i bandhistorikk
                              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                              const lastPost =
                                blade.bandhistorikk[
                                  blade.bandhistorikk.length - 1
                                ];

                              // Hvis siste post har service "Reklamasjon", vis feilkode
                              if (lastPost.service === "Reklamasjon") {
                                return lastPost.feilkode || ""; // Vis feilkode, eller tom streng hvis feilkode ikke finnes
                              }

                              return ""; // Hvis service ikke er "Reklamasjon", vis ingenting
                            })()}
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
