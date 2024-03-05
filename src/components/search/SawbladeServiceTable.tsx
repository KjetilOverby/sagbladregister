import React from "react";

const SawbladeServiceTable = ({ sawbladesService }) => {
  return (
    <div>
      <table className="table table-xs whitespace-nowrap ">
        <thead>
          <tr>
            <th className="text-sm text-accent">ID</th>
            <th className="text-sm text-accent">Type</th>

            {/* <th className="text-sm text-accent">Opprettet av</th> */}
          </tr>
        </thead>
        <tbody>
          {sawbladesService?.map((blade) => {
            return (
              <>
                {blade && (
                  <tr className="">
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
                        <div>
                          <div className="text-xs text-neutral">
                            {blade.type} {blade.side}
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
