/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @next/next/no-img-element */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import dateFormat from "dateformat";
import { useEffect, useState } from "react";
// import { DeleteComponent } from "./DeleteComponent";
import { RestoreComponent } from "./RestoreComponent";
// import DatepickerComponent from "../reusable/Datepicker";
import { useSession } from "next-auth/react";
import { RiDeleteBinLine } from "react-icons/ri";
import { api } from "~/utils/api";
import ActivateBlade from "./ActivateBlade";
import { DeleteComponent } from "./DeleteComponent";
import { FiRefreshCw } from "react-icons/fi";
import { GiProgression } from "react-icons/gi";
import HistorikkComponent from "./HistorikkComponent";
import DeletedBladesComponent from "./DeletedBladesComponent";
import SawbladeServiceTable from "./SawbladeServiceTable";

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
  dateValue,
  setDateValue,
  sawbladesService,
}: BladeProps) => {
  console.log(sawbladesService);

  const { data: sessionData } = useSession();

  const [showDeletedBlades, setShowDeletedBlades] = useState(false);

  const [openBandhistorikkData, setOpenBandhistorikkData] = useState(false);

  const [searchSerial, setSearchSerial] = useState<string>("");

  const [openStatus, setOpenStatus] = useState<string | null>(null);
  const [openHistorikk, setopenHistorikk] = useState<string | null>(null);
  const [wasteReasonInput, setWasteReasonInput] = useState("");
  const [openDeleteID, setOpenDeleteID] = useState<string | null>(null);
  const [openGjenopprettID, setOpenGjenopprettID] = useState<string | null>(
    null,
  );

  const [countBlades, setCountBlades] = useState();
  const [showService, setShowService] = useState(false);

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

  const gjenopprettHandler = (postID: string) => {
    setOpenGjenopprettID(postID);
  };

  const updateStatus = api.sawblades.updateStatus.useMutation({
    onSuccess: () => {
      void ctx.sawblades.getAll.invalidate();
      void ctx.sawblades.getCustomer.invalidate();
    },
  });

  const handleCloseModal = () => {
    setOpenStatus(null);
  };

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
    <div className="max-lg:overflow-scroll">
      <div>
        {!closeSearchComponent ? <div></div> : ""}
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
              <th className="text-sm text-neutral"></th>
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
              const updateStatusHandler = () => {
                void updateStatus.mutate({
                  id: blade.id,
                  active: true,
                });
              };

              return (
                <>
                  {
                    <tr
                      key={blade.id}
                      className="cursor-pointer border border-base-100 bg-base-100 hover:bg-primary"
                    >
                      <td className="font-by-5  px-5 font-bold ">
                        {blade.IdNummer}
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
                            <div>
                              <FiRefreshCw
                                onClick={() => statusHandler(blade.id)}
                                className={`text-lg ${
                                  blade.active
                                    ? "text-orange-600"
                                    : "text-accent"
                                }`}
                              />

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
                        <p className="w-5">{blade._count.bandhistorikk}</p>
                      </td>

                      <td className="relative">
                        {!blade.deleted && (
                          <RiDeleteBinLine
                            style={{
                              color: "indianred",
                              fontSize: "1rem",
                            }}
                            onClick={() => deleteHandler(blade.id)}
                          />
                        )}
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
                                <option value="Havari">Havari</option>
                                <option value="Dårlig stamme">
                                  Dårlig stamme
                                </option>
                                <option value="Varmekjørt">Varmekjørt</option>
                                <option value="Store tannskader">
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
                                      closeDeleteModal={closeDeleteHandler}
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

                        {blade.deleted && (
                          <button
                            onClick={() => gjenopprettHandler(blade.id)}
                            className="btn btn-sm bg-green-500 text-white hover:bg-green-600"
                          >
                            Gjenopprett
                          </button>
                        )}

                        {openGjenopprettID === blade.id && (
                          <div className="card absolute right-24 z-[100] grid w-96 items-center text-wrap bg-gray-500 p-5 text-white">
                            <h1 className="mb-5 text-xl">Gjenopprett</h1>
                            <div className="h-auto w-full overflow-auto whitespace-normal ">
                              <p className="">
                                Ved å angre sletting av dette bladet så
                                gjenopprettes statistikk tilbake til det som var
                                før sletting og sletteårsak vil bli fjernet.
                              </p>
                              <br />
                              <p className="text-yellow-200">
                                NB: Husk fjerne vrak i BFS koder på historikk
                              </p>
                            </div>

                            <div className="mt-5">
                              <button className="btn btn-sm mr-2 bg-green-300 hover:bg-green-500">
                                {" "}
                                <RestoreComponent
                                  setOpenGjenopprettID={setOpenGjenopprettID}
                                  id={blade.id}
                                />
                              </button>
                              <button
                                onClick={() => setOpenGjenopprettID(null)}
                                className="btn btn-sm "
                              >
                                Avbryt
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  }
                </>
              );
            })}
          </tbody>
        </table>
        {sawblades?.map((blade) => {
          const updateStatusHandler = () => {
            void updateStatus.mutate({
              id: blade.id,
              active: true,
            });
          };
          return (
            <HistorikkComponent
              key={blade.id}
              bandhistorikkData={blade}
              setOpenBandhistorikkData={setOpenBandhistorikkData}
              blade={blade}
              updatePost={updatePost}
              updateStatusHandler={updateStatusHandler}
              handleCloseModal={handleCloseModal}
            />
          );
        })}
      </div>
      <button
        className="btn btn-xs my-5 bg-green-500 text-white"
        onClick={() => setShowDeletedBlades(!showDeletedBlades)}
      >
        {showDeletedBlades ? "Skjul slettede blad" : "Vis slettede blad"}
      </button>

      <div>
        {showDeletedBlades && (
          <DeletedBladesComponent
            dateValue={dateValue}
            setDateValue={setDateValue}
            deletedSawblades={deletedSawblades}
          />
        )}
      </div>

      <button className="btn btn-xs bg-blue-500 text-white">
        Vis blad på service
      </button>
      {showService && (
        <div className="rounded-xl border bg-blue-500 p-2">
          <h1>Blad service</h1>
          <SawbladeServiceTable sawbladesService={sawbladesService} />
        </div>
      )}
    </div>
  );
};

export default SearchMain;
