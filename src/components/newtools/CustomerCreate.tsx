/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import DatepickerComponent from "../reusable/Datepicker";
import mtArticleTypes from "~/appdata/mtArticleTypes";
import mvArticleTypes from "~/appdata/mvArticleTypes";
import TypesArticle from "../reusable/TypesArticle";
import dateFormat from "dateformat";
import CreatePostCustomer from "./CreatePostCustomer";
import Deleteblades from "./deleteblades";

const CustomerCreate = ({
  data,
  dateValue,
  setDateValue,
  openDeleteID,
  deleteHandler,
  customerInit,
  setIdValue,
  setOpenDeleteID,
}) => {
  return (
    <div className="min-h-screen bg-base-100 p-5 max-lg:p-0 md:mx-48 ">
      <div className="overflow-x-auto px-5 pt-5">
        <div className="flex h-96 flex-row py-5 max-lg:grid max-lg:h-5/6">
          <CreatePostCustomer customerInit={customerInit} />
          <div className="ml-5 rounded-xl bg-base-100 p-5 shadow-xl shadow-primary max-lg:ml-0">
            <DatepickerComponent
              setDateValue={setDateValue}
              dateValue={dateValue}
            />
            <div className="flex flex-col">
              <label>ID nummer</label>
              <input
                onChange={(e) => setIdValue(e.currentTarget.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered input-xs w-full max-w-xs bg-primary"
              />
            </div>
          </div>
        </div>
        <h1 className="mb-3 mt-5 text-neutral">
          Registrerte blad i perioden: {data?.length}
        </h1>
        <div className="overflow-scroll">
          <table className="table table-xs whitespace-nowrap border border-b-accent border-l-base-100 border-r-base-100 border-t-accent bg-base-100">
            <thead>
              <tr className="border border-b-accent border-l-base-100 border-r-base-100 border-t-accent">
                <th className="text-sm text-neutral">Serienummer</th>
                <th className="text-sm text-neutral">Art.nummer</th>
                <th className="text-sm text-neutral">Produsent</th>
                <th className="text-sm text-neutral">Type</th>
                <th className="text-sm text-neutral">Dato</th>

                <th className="text-sm text-neutral">Opprettet av</th>
                <th className="text-sm text-neutral"></th>
              </tr>
            </thead>
            <tbody>
              {data?.map((blade) => {
                return (
                  <>
                    <tr className="border border-base-100 bg-base-100 hover:bg-primary">
                      <td className="py-5 font-bold text-neutral">
                        {blade.IdNummer}

                        <span className="text-xs font-normal text-orange-500">
                          {blade.note}
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
                                blade.updatedAt,
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
                          className="btn btn-xs bg-red-500 text-xs text-white hover:bg-red-600"
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

export default CustomerCreate;
