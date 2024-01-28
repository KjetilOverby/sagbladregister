/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @next/next/no-img-element */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState, useEffect } from "react";
import dateFormat from "dateformat";
// import { DeleteComponent } from "./DeleteComponent";
import { RestoreComponent } from "./RestoreComponent";
import BandDetails from "./BandDetails";
// import DatepickerComponent from "../reusable/Datepicker";
import { api } from "~/utils/api";
import ActivateBlade from "./ActivateBlade";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsClipboardData } from "react-icons/bs";
import { DeleteComponent } from "./DeleteComponent";
import { signIn, signOut, useSession } from "next-auth/react";

interface Blade {
  creatorImg: string | undefined;
  deleterImg: string | undefined;
  deleter: ReactNode;
  type: string;
  IdNummer: string;
  deleted: boolean;
  creator: string;
  updatedAt: Date;
  createdAt: Date;
  id: string;
  kunde: string;
  side: string;
  active: boolean;
  deleteReason: string;
  note: string;
  _count: {
    bandhistorikk: number;
  };

  bandhistorikk: {
    creator: string;

    feilkode: string;
    handling: string;
    historikkId: string;
    id: string;
    datoInn: Date;
    klInn: Date;
    datoUt: Date;
    klUt: Date;
    service: string;
    sagtid: number;
    sideklaring: number;
    anmSag: string;
    updatedAt: Date;
    anmKS: string;
    temperatur: number;
    sgSag: string;
    sgKS: string;
    datoSrv: Date;
    activePost: boolean;
  }[];
}

interface BladeProps {
  sawblades: Blade[];
  deletedSawblades: Blade[];
}

const SearchMain = ({
  sawblades,
  deletedSawblades,
  setCloseSearchComponent,
  closeSearchComponent,
}: BladeProps) => {
  // const page = params["page"] ?? "1";
  // const per_page = params["per_page"] ?? "10";
  // const start = (Number(page) - 1) * Number(per_page);
  // const end = start + Number(per_page);
  // const entries = sawblades.slice(start, end);
  const { data: sessionData } = useSession();

  const [showDeletedBlades, setShowDeletedBlades] = useState(false);

  const [openBandhistorikkData, setOpenBandhistorikkData] = useState(false);

  const [searchSerial, setSearchSerial] = useState<string>("");

  const [openStatus, setOpenStatus] = useState<string | null>(null);
  const [openHistorikk, setopenHistorikk] = useState<string | null>(null);
  const [wasteReasonInput, setWasteReasonInput] = useState("");
  const [openDeleteID, setOpenDeleteID] = useState<string | null>(null);

  const [countBlades, setCountBlades] = useState();

  const [newBladesCount, setNewBladesCount] = useState();

  const deleteHandler = (postID: string) => {
    setOpenDeleteID(postID);
  };

  const ctx = api.useContext();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const createPost = api.bandhistorikk.create.useMutation({
    onSuccess: () => {
      void ctx.sawblades.getAll.invalidate();
      void ctx.sawblades.getCustomer.invalidate();

      setOpenStatus(null);
    },
  });

  const updateStatus = api.sawblades.updateStatus.useMutation({
    onSuccess: () => {
      void ctx.sawblades.getAll.invalidate();
      void ctx.sawblades.getCustomer.invalidate();
    },
  });

  const updatePost = api.bandhistorikk.update.useMutation({
    onSuccess: () => {
      void ctx.sawblades.getAll.invalidate();
      void ctx.sawblades.getCustomer.invalidate();
    },
  });

  useEffect(() => {
    setCountBlades(sawblades?.filter((item) => item.deleted === false).length);

    setNewBladesCount(sawblades?.length);
  }, [sawblades]);

  return (
    <div className=" max-lg:overflow-scroll">
      <div>
        {!closeSearchComponent ? (
          <div>
            <h1 className="text-xl text-neutral">
              Blad i bruk ({countBlades})
            </h1>
            <p className="text-neutral">
              Nye registrerte blad denne perioden: {newBladesCount}
            </p>
          </div>
        ) : (
          ""
        )}
        <table className="table table-xs whitespace-nowrap border border-b-accent border-l-base-100 border-r-base-100 border-t-accent bg-base-100">
          <thead>
            <tr className="">
              <th className="text-sm text-neutral">ID</th>
              <th className="text-sm text-neutral">Type</th>
              <th className="text-sm text-neutral">Dato opprettet</th>
              <th className="text-sm text-neutral">Opprettet av</th>
              {sessionData?.user.role === "ADMIN" && (
                <th className="text-sm text-neutral">Service</th>
              )}

              <th className="text-sm text-neutral">Historikk</th>
              <th className="text-sm text-neutral">Slett</th>
            </tr>
          </thead>
          <tbody>
            {sawblades?.map((blade) => {
              const statusHandler = (postId: string) => {
                setOpenStatus(postId);
              };

              const handleCloseModal = () => {
                setOpenStatus(null);
              };

              const historikkHandler = (historikkId: string | null) => {
                setopenHistorikk(historikkId);
              };

              const handleCloseHistorikk = () => {
                setTimeout(() => {
                  setopenHistorikk(null);
                  setCloseSearchComponent(false);
                }, 100);
              };

              const updateStatusHandler = () => {
                void updateStatus.mutate({
                  id: blade.id,
                  active: true,
                });
              };

              const deactivateStatusHandler = () => {
                void updateStatus.mutate({
                  id: blade.id,
                  active: false,
                });
              };

              const openHistorikkDataHandler = () => {
                setCloseSearchComponent(true);
                historikkHandler(blade.id);
              };

              const closeDeleteHandler = () => {
                setOpenDeleteID(null);
                setWasteReasonInput("");
              };

              return (
                <>
                  {!blade.deleted && (
                    <tr
                      key={blade.id}
                      className="border border-base-100 bg-base-100 hover:bg-primary"
                    >
                      <td className="font-by-5  px-5">
                        {blade.IdNummer}{" "}
                        {blade.note !== "-" && (
                          <span className="font-nory-5 px-5  text-xs">
                            ({blade.note})
                          </span>
                        )}
                      </td>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar"></div>
                          <div>
                            <div className="texty-5  px-5">
                              {blade.type} {blade.side}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar"></div>

                          <div>
                            <div className="texty-5  px-5">
                              {dateFormat(
                                blade.createdAt,
                                "dd.mm.yyyy , HH:MM",
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="flex items-center py-5">
                        <div className="mr-2 h-5 w-5">
                          <img
                            className="rounded-full"
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            src={blade.creatorImg}
                            alt=""
                          />
                        </div>
                        {blade.creator}
                      </td>

                      {sessionData?.user.role === "ADMIN" && (
                        <th>
                          <div>
                            <div
                              onClick={() => statusHandler(blade.id)}
                              className={`h-3 w-3 rounded-full ${
                                blade.active ? "bg-orange-600" : "bg-accent"
                              }`}
                            >
                              {openStatus === blade.id && !blade.active && (
                                <ActivateBlade
                                  blade={blade}
                                  createPost={createPost}
                                  updateStatusHandler={updateStatusHandler}
                                  handleCloseModal={handleCloseModal}
                                />
                              )}
                            </div>
                          </div>
                        </th>
                      )}

                      <td>
                        <div className="flex items-center">
                          <p className="w-5">{blade._count.bandhistorikk}</p>
                          <BsClipboardData
                            style={{
                              marginLeft: ".5rem",
                              fontSize: ".9rem",
                            }}
                            onClick={openHistorikkDataHandler}
                            className=" py-5"
                          />
                        </div>
                      </td>

                      <td className="relative">
                        <RiDeleteBinLine
                          style={{
                            color: "indianred",
                            fontSize: "1rem",
                          }}
                          onClick={() => deleteHandler(blade.id)}
                        />
                        {openDeleteID === blade.id && (
                          <div className="card absolute right-24 z-40 flex w-96 flex-col items-center bg-primary text-primary-content">
                            <div className="card-body">
                              <h2 className="card-title">
                                Slett blad: {blade.IdNummer}
                              </h2>
                              <p>Velg årsaken til vrak?</p>
                              <select
                                onChange={(e) =>
                                  setWasteReasonInput(e.currentTarget.value)
                                }
                                className="select select-bordered select-xs w-full max-w-xs"
                              >
                                <option disabled selected>
                                  Velg
                                </option>
                                <option value="Normal slitasje">
                                  Normal slitasje
                                </option>
                                <option value="Ikjøring">Ikjøring</option>
                                <option className="Havari">Havari</option>
                                <option className="Dårlig stamme">
                                  Dårlig stamme
                                </option>
                                <option className="Varmekjørt">
                                  Varmekjørt
                                </option>
                                <option className="Store tannskader">
                                  Store tannskader
                                </option>
                              </select>

                              {wasteReasonInput && (
                                <th>
                                  <button className="btn btn-xs bg-red-600">
                                    <DeleteComponent
                                      wasteReasonInput={wasteReasonInput}
                                      setWasteReasonInput={setWasteReasonInput}
                                      id={blade.id}
                                    />
                                  </button>
                                </th>
                              )}
                            </div>
                            <div className="card-actions my-5 justify-end">
                              <button
                                onClick={closeDeleteHandler}
                                className="btn btn-xs"
                              >
                                Avbryt
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                  {openHistorikk === blade.id && (
                    <div className="absolute top-0 z-50 h-screen w-full rounded-2xl  border border-primary bg-accent p-5 max-lg:relative">
                      <div className="mr-5 flex justify-between">
                        <div>
                          <h1 className=" texty-5  px-5">Historikk</h1>
                          <h1 className="font-semiby-5 px-5  text-2xl">
                            ID: {blade.IdNummer}
                          </h1>
                          <p className="texty-5  px-5">
                            Type: {blade.type} {blade.side}
                          </p>
                          <p className="itay-5  px-5">
                            Registrert:
                            {dateFormat(blade.createdAt, "dd.mm.yyyy")}
                          </p>
                          <p className="itay-5  px-5">
                            Registrert av: {blade.creator}
                          </p>
                        </div>
                        <div>
                          <table className="table table-xs ml-5 w-full border border-primary bg-accent  py-5">
                            <thead>
                              <tr className="border border-primary">
                                <th className="itay-5 px-5  text-lg">Kode</th>
                                <th className="itay-5 px-5  text-lg">
                                  Beskrivelse
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border border-primary">
                                <th>BFS423</th>
                                <th>EKSTRA RETTING BÅND</th>
                              </tr>
                              <tr className="border border-primary">
                                <th>BFS426</th>
                                <th>BUNNSTUK BÅND</th>
                              </tr>
                              <tr className="border border-primary">
                                <th>BFS427</th>
                                <th>RETTING-STREKKING-SLIPING METER</th>
                              </tr>
                              <tr className="border border-primary">
                                <th>BFS429</th>
                                <th>
                                  STELL.FERDIG SLIP OG RETT f.o.m 100mm bredde
                                  TANN
                                </th>
                              </tr>
                              <tr className="border border-primary">
                                <th>BSF438</th>
                                <th>REP.SVEIST STELLIT TANN</th>
                              </tr>
                              <tr>
                                <th>BFS442</th>
                                <th>SLIPESERVICE AV REP.TENNER METER</th>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <BandDetails
                        bandhistorikkData={blade}
                        setOpenBandhistorikkData={setOpenBandhistorikkData}
                        blade={blade}
                        updatePost={updatePost}
                        updateStatusHandler={updateStatusHandler}
                        handleCloseModal={handleCloseModal}
                      />

                      <button
                        onClick={handleCloseHistorikk}
                        className="btn btn-primary btn-xs mt-5"
                      >
                        Lukk historikk
                      </button>
                    </div>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      <button
        className="btn btn-xs my-5"
        onClick={() => setShowDeletedBlades(!showDeletedBlades)}
      >
        {showDeletedBlades ? "Skjul slettede blad" : "Vis slettede blad"}
      </button>
      {showDeletedBlades && (
        <div>
          <h1 className="text-xl text-neutral">
            Slettede blad ({deletedSawblades?.length})
          </h1>
          <table className="table table-xs whitespace-nowrap bg-neutral">
            <thead>
              <tr>
                <th className="text-sm text-accent">ID</th>
                <th className="text-sm text-accent">Type</th>

                {/* <th className="text-sm text-accent">Opprettet av</th> */}
                <th className="text-sm text-accent">Slettet av</th>
                <th className="text-sm text-accent">Dato slettet</th>
                <th className="text-sm text-accent">Årsak</th>
                <th className="text-sm text-accent"></th>
              </tr>
            </thead>
            <tbody>
              {deletedSawblades?.map((blade) => {
                return (
                  <>
                    {blade.deleted && (
                      <tr className="bg-primary">
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
                                blade.updatedAt,
                                "dd.mm.yyyy , HH:MM",
                              )}
                            </div>
                          </div>
                        </td>
                        <td>{blade.deleteReason}</td>
                        <td>
                          <th className="text-neutral">
                            <RestoreComponent id={blade.id} />
                          </th>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SearchMain;
