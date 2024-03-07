/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import dateFormat from "dateformat";
import DatepickerComponent from "../reusable/Datepicker";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DeletedBladesComponent = ({
  deletedSawblades,
  dateValue,
  setDateValue,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deletedSawblades: any[];
}) => {
  return (
    <div>
      <div>
        <div className="shadow-xl">
          <DatepickerComponent
            setDateValue={setDateValue}
            dateValue={dateValue}
          />
        </div>
        <h1 className="text-xl text-neutral">
          Slettede blad ({deletedSawblades?.length})
        </h1>
        <table className="table table-xs whitespace-nowrap ">
          <thead>
            <tr>
              <th className="text-sm text-accent">ID</th>
              <th className="text-sm text-accent">Type</th>

              {/* <th className="text-sm text-accent">Opprettet av</th> */}
              <th className="text-sm text-accent">Slettet av</th>
              <th className="text-sm text-accent">Dato slettet</th>
              <th className="text-sm text-accent">Årsak</th>
            </tr>
          </thead>
          <tbody>
            {deletedSawblades?.map((blade) => {
              return (
                <>
                  {blade.deleted && (
                    <tr className="">
                      <td className="font-bold text-neutral">
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
                            <div className="text-xs text-neutral">
                              {blade.type} {blade.side}
                            </div>
                          </div>
                        </div>
                      </td>
                      {/*   <td className="flex items-center">
                          <div className="mr-2 h-5 w-5">
                            <img
                              className="rounded-full"
                              src={blade.creatorImg}
                              alt=""
                            />
                          </div>
                          {blade.creator}
                        </td> */}

                      <td className="flex items-center">
                        <div className="mr-2 h-5 w-5">
                          <img
                            className="rounded-full"
                            src={blade.deleterImg}
                            alt=""
                          />
                        </div>
                        {blade.deleter}
                      </td>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="text-xs text-neutral">
                            {dateFormat(
                              blade.updatedAt as Date,
                              "dd.mm.yyyy , HH:MM",
                            )}
                          </div>
                        </div>
                      </td>
                      <td>{blade.deleteReason}</td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeletedBladesComponent;
