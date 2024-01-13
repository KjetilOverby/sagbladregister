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
import { useRouter } from "next/navigation";
import { api } from "~/utils/api";
import ActivateBlade from "./ActivateBlade";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsClipboardData } from "react-icons/bs";

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
    sagNr: string;
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

const SearchMain = ({ sawblades, deletedSawblades }: BladeProps) => {
  const router = useRouter();
  // const page = params["page"] ?? "1";
  // const per_page = params["per_page"] ?? "10";
  // const start = (Number(page) - 1) * Number(per_page);
  // const end = start + Number(per_page);
  // const entries = sawblades.slice(start, end);

  const [showDeletedBlades, setShowDeletedBlades] = useState(false);

  const [openBandhistorikkData, setOpenBandhistorikkData] = useState(false);

  const [searchSerial, setSearchSerial] = useState<string>("");

  const [openStatus, setOpenStatus] = useState<string | null>(null);
  const [openHistorikk, setopenHistorikk] = useState<string | null>(null);
  const [wasteReasonInput, setWasteReasonInput] = useState("");
  const [openDeleteID, setOpenDeleteID] = useState<string | null>(null);
  const [closeSearchComponent, setCloseSearchComponent] = useState(false);

  const [countBlades, setCountBlades] = useState();

  const [newBladesCount, setNewBladesCount] = useState();

  const deleteHandler = (postID: string) => {
    setOpenDeleteID(postID);
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const createPost = api.bandhistorikk.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setOpenStatus(null);
    },
  });

  //   const updateStatus = api.sawblades.updateStatus.useMutation({
  //     onSuccess: () => {
  //       router.refresh();
  //     },
  //   });

  //   const updatePost = api.bandhistorikk.update.useMutation({
  //     onSuccess: () => {
  //       router.refresh();
  //     },
  //   });

  useEffect(() => {
    setCountBlades(sawblades?.filter((item) => item.deleted === false).length);

    setNewBladesCount(sawblades?.length);
  }, [sawblades]);

  return (
    <div className="m-5">
      <div>
        {!closeSearchComponent ? (
          <div>
            {/* <div className=" rounded-xl py-5">
              <div className="flex ">
                <DatepickerComponent
                  idSearch={true}
                  searchSerial={searchSerial}
                  link="/search"
                  setSearchSerial={setSearchSerial}
                />
              </div>
            </div> */}
            <h1 className="text-xl text-orange-300">
              Blad i bruk ({countBlades})
            </h1>
            <p>Nye registrerte blad denne perioden: {newBladesCount}</p>
          </div>
        ) : (
          ""
        )}
        <table className="table-xs bg-neutral table">
          <thead>
            <tr>
              <th className="text-accent text-sm">ID</th>
              <th className="text-accent text-sm">Type</th>
              <th className="text-accent text-sm">Dato opprettet</th>
              <th className="text-accent text-sm">Opprettet av</th>
              <th className="text-accent text-sm">Aktiv</th>

              <th className="text-accent text-sm">Historikk</th>
              <th className="text-accent text-sm">Slett</th>
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
                    <tr key={blade.id} className="bg-accent even:bg-secondary">
                      <td className="text-neutral font-bold">
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
                            <div className="text-neutral text-xs">
                              {blade.type} {blade.side}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar"></div>

                          <div>
                            <div className="text-neutral text-xs">
                              {dateFormat(
                                blade.createdAt,
                                "dd.mm.yyyy , HH:MM",
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="flex items-center">
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
                      <th>
                        <div>
                          <div
                            onClick={() => statusHandler(blade.id)}
                            className={`h-3 w-3 rounded-full ${
                              blade.active ? "bg-emerald-400" : "bg-primary"
                            }`}
                          >
                            {/* {openStatus === blade.id && !blade.active && (
                              <ActivateBlade
                                blade={blade}
                                createPost={createPost}
                                updateStatusHandler={updateStatusHandler}
                                handleCloseModal={handleCloseModal}
                              />
                            )} */}
                          </div>
                        </div>
                      </th>

                      <td>
                        <div className="flex items-center">
                          {/* <p className="w-5">{blade._count.bandhistorikk}</p> */}
                          <BsClipboardData
                            style={{
                              marginLeft: ".5rem",
                              color: "orange",
                              fontSize: ".9rem",
                            }}
                            onClick={openHistorikkDataHandler}
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
                          <div className="card bg-primary text-primary-content absolute right-24 z-40 flex w-96 flex-col items-center">
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
                                <option className="Røk av">Røk av</option>
                                <option className="Sprekk">Sprekk</option>
                                <option className="Dårlig stamme">
                                  Dårlig stamme
                                </option>
                                <option className="Varmekjørt">
                                  Varmekjørt
                                </option>
                                <option className="Store tannskader">
                                  Store tannskader
                                </option>
                                <option className="Oppspenningsfeil i sag">
                                  Oppspenningsfeil i sag
                                </option>
                              </select>

                              {/* {wasteReasonInput && (
                                <th>
                                  <button className="btn btn-xs bg-red-600">
                                    <DeleteComponent
                                      wasteReasonInput={wasteReasonInput}
                                      id={blade.id}
                                    />
                                  </button>
                                </th>
                              )} */}
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
                    <div className="border-primary from-base-100 via-accent to-base-100 absolute top-0  z-50 h-screen w-full rounded-2xl border bg-gradient-to-r p-5">
                      <div className="mr-5 flex justify-between">
                        <div>
                          <h1 className=" text-lg text-orange-400">
                            Historikk
                          </h1>
                          <h1 className="text-2xl font-semibold text-orange-600">
                            ID: {blade.IdNummer}
                          </h1>
                          <p className="text-xl">
                            Type: {blade.type} {blade.side}
                          </p>
                          <p className="italic">
                            Registrert:
                            {dateFormat(blade.createdAt, "dd.mm.yyyy")}
                          </p>
                          <p className="italic">
                            Registrert av: {blade.creator}
                          </p>
                        </div>
                        <div>
                          <table className="table-xs bg-accent ml-5 table w-full">
                            <thead>
                              <tr>
                                <th>Kode</th>
                                <th>Beskrivelse</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th>BFS423</th>
                                <th>EKSTRA RETTING BÅND</th>
                              </tr>
                              <tr>
                                <th>BFS426</th>
                                <th>BUNNSTUK BÅND</th>
                              </tr>
                              <tr>
                                <th>BFS427</th>
                                <th>RETTING-STREKKING-SLIPING METER</th>
                              </tr>
                              <tr>
                                <th>BFS429</th>
                                <th>
                                  STELL.FERDIG SLIP OG RETT f.o.m 100mm bredde
                                  TANN
                                </th>
                              </tr>
                              <tr>
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
                      {/* <BandDetails
                        bandhistorikkData={blade}
                        setOpenBandhistorikkData={setOpenBandhistorikkData}
                        blade={blade}
                        updatePost={updatePost}
                        updateStatusHandler={updateStatusHandler}
                        handleCloseModal={handleCloseModal}
                      /> */}

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
        {/* <div className="flex">
          <BiSolidLeftArrowSquare
            className="text-2xl"
            onClick={() => {
              router.push(
                `/search/?date=${date}&date2=${date2}&serial=&page=${
                  Number(page) - 1
                }&per_page=${per_page}`,
              );
            }}
          />

          <div>
            {page} / {Math.ceil(sawblades.length / Number(per_page))}
          </div>

          <BiSolidRightArrowSquare
            className="text-2xl"
            onClick={() => {
              router.push(
                `/search/?date=${date}&date2=${date2}&serial=&page=${
                  Number(page) + 1
                }&per_page=${per_page}`,
              );
            }}
          />
        </div> */}
      </div>
      <button
        className="btn btn-xs my-5"
        onClick={() => setShowDeletedBlades(!showDeletedBlades)}
      >
        {showDeletedBlades ? "Skjul slettede blad" : "Vis slettede blad"}
      </button>
      {showDeletedBlades && (
        <div>
          <h1 className="text-xl text-orange-300">
            Slettede blad ({deletedSawblades.length})
          </h1>
          <table className="table-xs bg-neutral table">
            <thead>
              <tr>
                <th className="text-accent text-sm">ID</th>
                <th className="text-accent text-sm">Type</th>

                {/* <th className="text-sm text-accent">Opprettet av</th> */}
                <th className="text-accent text-sm">Slettet av</th>
                <th className="text-accent text-sm">Dato slettet</th>
                <th className="text-accent text-sm">Årsak</th>
                <th className="text-accent text-sm"></th>
              </tr>
            </thead>
            <tbody>
              {deletedSawblades.map((blade) => {
                return (
                  <>
                    {blade.deleted && (
                      <tr className="bg-primary">
                        <td className="text-neutral font-bold">
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
                              <div className="text-neutral text-xs">
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
                            <div className="text-neutral text-xs">
                              {dateFormat(
                                blade.updatedAt,
                                "dd.mm.yyyy , HH:MM",
                              )}
                            </div>
                          </div>
                        </td>
                        <td>{blade.deleteReason}</td>
                        {/* <td>
                          <th className="text-neutral">
                            <RestoreComponent id={blade.id} />
                          </th>
                        </td> */}
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
