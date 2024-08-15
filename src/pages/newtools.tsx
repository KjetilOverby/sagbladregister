/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState, useEffect } from "react";
import { api } from "~/utils/api";
import dateFormat from "dateformat";
import CreatePost from "~/components/newtools/CreatePost";
import HeaderComponent from "~/components/reusable/HeaderComponent";
import DatepickerComponent from "~/components/reusable/Datepicker";
import Deleteblades from "~/components/newtools/deleteblades";
import { signIn, signOut, useSession } from "next-auth/react";
import NotAuthorized from "~/components/reusable/NotAuthorized";
import TypesArticle from "~/components/reusable/TypesArticle";
import mtArticleTypes from "~/appdata/mtArticleTypes";
import mvArticleTypes from "~/appdata/mvArticleTypes";
import RoleAdmin from "~/components/roles/RoleAdmin";
import RoleAdminMV from "~/components/roles/RoleAdminMV";
import CustomerCreate from "~/components/newtools/CustomerCreate";
import RoleAdminMT from "~/components/roles/RoleAdminMT";
import EditInputComponent from "~/components/newtools/EditInputComponent";
const Newtools = ({ theme, setTheme }) => {
  const { data: sessionData } = useSession();
  // eslint-disable-next-line @typescript-eslint/unbound-method

  // endDate: `${year}-${month}-${date}`,
  // startDate: `${year}-${month}-${date}`,

  // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
  const [dateValue, setDateValue] = useState({
    endDate: dateFormat(new Date(), "yyyy-mm-dd"),
    startDate: dateFormat(new Date(), "yyyy-mm-dd"),
  });

  const [customerInit, setCustomerInit] = useState("");

  useEffect(() => {
    if (sessionData?.user.role === "MV_ADMIN") {
      setCustomerInit("MV-");
    } else if (sessionData?.user.role === "MT_ADMIN") {
      setCustomerInit("MT-");
    }
  }, [sessionData]);

  const [idValue, setIdValue] = useState("");
  const [openDeleteID, setOpenDeleteID] = useState<string | null>(null);
  const [openEditID, setOpenEditID] = useState<string | null>(null);

  const openEditHandler = (postID: string) => {
    setOpenEditID(postID);
  };

  const deleteHandler = (postID: string) => {
    setOpenDeleteID(postID);
  };

  const { data } = api.sawblades.getAllCreate.useQuery({
    date: `${dateValue.endDate}T23:59:59.000Z`,
    date2: `${dateValue.startDate}T00:00:00.000Z`,
    IdNummer: idValue,
  });

  const { data: createCustomer } = api.sawblades.getAllCreateCustomer.useQuery({
    date: `${dateValue.endDate}T23:59:59.000Z`,
    date2: `${dateValue.startDate}T00:00:00.000Z`,
    IdNummer: idValue,
    init: customerInit,
  });
  const ctx = api.useContext();

  const editSawblade = api.sawblades.editSawblade.useMutation({
    onSuccess: () => {
      void ctx.sawblades.getAll.invalidate();
      void ctx.sawblades.getCustomer.invalidate();
      void ctx.sawblades.getAllCreate.invalidate();
    },
  });

  return (
    <div data-theme={theme}>
      <>
        <RoleAdmin>
          <HeaderComponent setTheme={setTheme} />
          <div className="min-h-screen bg-base-100 p-5 max-lg:p-0 md:mx-48 ">
            <div className="min-h-screen overflow-x-auto px-5 pt-5">
              <div className="flex h-96 flex-row py-5 max-lg:grid max-lg:h-5/6">
                <CreatePost />
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
                <table className="table table-xs whitespace-nowrap border border-b-accent border-l-base-100 border-r-base-100 border-t-accent bg-base-100 ">
                  <thead>
                    <tr className="border border-b-accent border-l-base-100 border-r-base-100 border-t-accent">
                      <th className="text-sm text-neutral">Serienummer</th>
                      <th className="text-sm text-neutral">Art.nummer</th>
                      <th className="text-sm text-neutral">Produsent</th>
                      <th className="text-sm text-neutral">Type</th>
                      <th className="text-sm text-neutral">Dato</th>

                      <th className="text-sm text-neutral">Opprettet av</th>
                      <th className="text-sm text-neutral"></th>
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
                                onClick={() => openEditHandler(blade.id)}
                                className="btn btn-xs mr-5 bg-warning text-xs text-white"
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
                                  />
                                </div>
                              )}
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
                                      Slettingen er permanent og kan ikke
                                      angres.
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
        </RoleAdmin>
        <RoleAdminMV>
          <HeaderComponent setTheme={setTheme} />
          <CustomerCreate
            data={createCustomer}
            dateValue={dateValue}
            setDateValue={setDateValue}
            openDeleteID={openDeleteID}
            deleteHandler={deleteHandler}
            customerInit={customerInit}
            idValue={idValue}
            setIdValue={setIdValue}
            setOpenDeleteID={setOpenDeleteID}
          />
        </RoleAdminMV>
        <RoleAdminMT>
          <HeaderComponent setTheme={setTheme} />
          <CustomerCreate
            data={createCustomer}
            dateValue={dateValue}
            setDateValue={setDateValue}
            openDeleteID={openDeleteID}
            deleteHandler={deleteHandler}
            customerInit={customerInit}
            idValue={idValue}
            setIdValue={setIdValue}
            setOpenDeleteID={setOpenDeleteID}
          />
        </RoleAdminMT>
      </>
    </div>
  );
};

export default Newtools;
