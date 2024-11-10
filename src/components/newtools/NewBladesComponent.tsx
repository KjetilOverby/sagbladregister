/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import DatepickerComponent from "../reusable/Datepicker";
import CreatePost from "./CreatePost";
import TypesArticle from "../reusable/TypesArticle";
import mvArticleTypes from "~/appdata/mvArticleTypes";
import mtArticleTypes from "~/appdata/mtArticleTypes";
import dateFormat from "dateformat";
import EditInputComponent from "./EditInputComponent";
import Deleteblades from "./deleteblades";

interface NewBladesComponentProps {
  setIdValue: (value: string) => void;
  setDateValue: (date: Date) => void;
  dateValue: Date;
  data: Array<Blade>;
  theme: string;
  openEditID: number | null;
  openDeleteID: number | null;
  openEditHandler: (id: number) => void;
  editSawblade: (id: number, updatedBlade: Blade) => void;
  deleteHandler: (id: number) => void;
}

interface Blade {
  IdNummer: string;
  note: string;
  produsent: string;
  type: string;
  side: string;
  createdAt: string;
  creatorImg: string;
  creator: string;
  id: number;
}

const NewBladesComponent: React.FC<NewBladesComponentProps> = ({
  setIdValue,
  setDateValue,
  dateValue,
  data,
  theme,
  openEditID,
  openDeleteID,
  openEditHandler,
  editSawblade,
  deleteHandler,
}) => {
  return (
    <div className="min-h-screen bg-base-100 p-5 max-lg:p-0 xl:mx-48 ">
      <div className="min-h-screen overflow-x-auto px-5 pt-5">
        <div className="flex h-96 flex-row py-4 max-lg:grid max-lg:h-5/6">
          <CreatePost />
          <div className="ml-5 w-96 rounded-xl border  border-primary bg-base-100 p-5 max-lg:ml-0">
            <DatepickerComponent
              setDateValue={setDateValue}
              dateValue={dateValue}
            />
            <div className="flex flex-col">
              <label className="text-neutral">ID nummer</label>
              <input
                onChange={(e) => setIdValue(e.currentTarget.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered input-sm w-full max-w-xs bg-base-100 text-neutral outline-none"
              />
            </div>
          </div>
        </div>
        <h1 className="mb-3 mt-5 text-neutral">
          Registrerte blad i perioden: {data?.length}
        </h1>
        <div className="min-h-screen overflow-scroll">
          <table className="table table-xs whitespace-nowrap border border-b-accent border-l-base-100 border-r-base-100 border-t-accent bg-base-100 ">
            <thead>
              <tr
                className={`border border-b-accent border-l-base-100 border-r-base-100 border-t-accent ${theme === "darkmode" ? "bg-primary" : "bg-neutral"}`}
              >
                <th className="text-sm text-gray-200">Serienummer</th>
                <th className="text-sm text-gray-200">Art.nummer</th>
                <th className="text-sm text-gray-200">Produsent</th>
                <th className="text-sm text-gray-200">Type</th>
                <th className="text-sm text-gray-200">Dato</th>

                <th className="text-sm text-gray-200">Opprettet av</th>
                <th className="text-sm text-gray-200"></th>
                <th className="text-sm text-gray-200"></th>
              </tr>
            </thead>
            <tbody>
              {data?.map((blade) => {
                return (
                  <>
                    <tr
                      className={`border border-base-100 bg-base-100 hover:cursor-pointer ${theme === "darkmode" ? "hover:bg-gray-700" : "hover:bg-accent"}`}
                    >
                      <td className="py-5 font-bold text-neutral">
                        {blade.IdNummer}

                        <span className="ml-1 text-xs font-normal text-neutral">
                          ({blade.note})
                        </span>
                      </td>
                      <td>
                        <div>
                          <div>
                            <TypesArticle
                              blade={blade}
                              articleTypes={mtArticleTypes}
                            />
                          </div>
                          <TypesArticle
                            blade={blade}
                            articleTypes={mvArticleTypes}
                          />
                          <div></div>
                        </div>
                      </td>
                      <td className="py-5">
                        <div className="flex items-center space-x-3">
                          <div className="avatar"></div>
                          <div>
                            <div className="text-xs text-neutral">
                              {blade.produsent}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-5">
                        <div className="flex items-center space-x-3">
                          <div className="avatar"></div>
                          <div>
                            <div className="text-xs text-neutral">
                              {blade.type} {blade.side}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-5">
                        <div className="flex items-center space-x-3">
                          <div className="avatar"></div>
                          <div>
                            <div className="text-xs text-neutral">
                              {dateFormat(
                                blade.createdAt,
                                "dd.mm.yyyy , HH:MM",
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="text-neutral">
                        <td className="flex items-center">
                          <div className="mr-2 h-5 w-5">
                            <img
                              className="rounded-full"
                              src={blade.creatorImg}
                              alt=""
                            />
                          </div>
                          {blade.creator}
                        </td>
                      </td>

                      <td>
                        <button
                          onClick={() => openEditHandler(blade.id)}
                          className={`btn btn-sm mr-5 ${theme === "darkmode" ? "bg-primary" : "bg-neutral"} text-xs text-gray-200 hover:bg-primary`}
                        >
                          Rediger
                        </button>
                        {openEditID === blade.id && (
                          <div className="z-50 rounded-xl  shadow-xl">
                            <EditInputComponent
                              editSawblade={editSawblade}
                              blade={blade}
                              openEditHandler={openEditHandler}
                              title={blade.IdNummer}
                              theme={theme}
                            />
                          </div>
                        )}
                      </td>

                      <td>
                        <button
                          className="btn btn-sm bg-red-500 text-xs text-white hover:bg-red-600"
                          onClick={() => deleteHandler(blade.id)}
                        >
                          SLETT
                        </button>
                        {openDeleteID === blade.id && (
                          <th className="">
                            <div className="card absolute  right-28 z-50 flex bg-red-500 p-5 text-white">
                              <h1 className="mb-5 text-lg">
                                Slett {blade.IdNummer}?
                              </h1>
                              <p className="mb-3">
                                Slettingen er permanent og kan ikke angres.
                              </p>
                              <p className="mb-5">
                                Bladet vil ikke legge seg i statistikk for
                                slettede blad.
                              </p>

                              <div className="flex">
                                <button
                                  onClick={() => setOpenDeleteID(null)}
                                  className="btn btn-sm mr-5"
                                >
                                  Avbryt
                                </button>
                                <Deleteblades blade={blade.id} />
                              </div>
                            </div>
                          </th>
                        )}
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NewBladesComponent;
