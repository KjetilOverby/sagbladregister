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
import { GiPauseButton, GiProgression } from "react-icons/gi";
import HistorikkComponent from "./HistorikkComponent";
import DeletedBladesComponent from "./DeletedBladesComponent";
import SawbladeServiceTable from "./SawbladeServiceTable";
import { CiEdit } from "react-icons/ci";
import EditInputComponent from "../newtools/EditInputComponent";

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
  setIdValue,
  showFlaws,
  theme,
}: BladeProps) => {
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
  const [openEdit, setOpenEdit] = useState();

  const deleteHandler = (postID: string) => {
    setOpenDeleteID(postID);
  };

  const ctx = api.useContext();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const createPost = api.bandhistorikk.create.useMutation({
    onSuccess: () => {
      void ctx.sawblades.getAll.invalidate();
      void ctx.sawblades.getCustomer.invalidate();
      void ctx.sawblades.getAllService.invalidate();

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
      void ctx.sawblades.getAllService.invalidate();
      void ctx.sawblades.getCustomerActive.invalidate();
    },
  });

  const editSawblade = api.sawblades.editSawblade.useMutation({
    onSuccess: () => {
      void ctx.sawblades.getAll.invalidate();
      void ctx.sawblades.getCustomer.invalidate();
      void ctx.sawblades.getAllCreate.invalidate();
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
  const updatePostKS = api.bandhistorikk.updateKS.useMutation({
    onSuccess: () => {
      void ctx.sawblades.getAll.invalidate();
      void ctx.sawblades.getCustomer.invalidate();
    },
  });

  useEffect(() => {
    setCountBlades(sawblades?.filter((item) => item.deleted === false).length);

    setNewBladesCount(sawblades?.length);
  }, [sawblades]);

  const countTypes = (data: Blade[]): Record<string, number> => {
    return data?.reduce(
      (acc, item) => {
        const key = `${item.type} ${item.side || ""}`;
        acc[key] = (acc[key] ?? 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );
  };

  const countTypesList = countTypes(sawbladesService as Blade[]);

  return (
    <div className="max-lg:overflow-scroll">
      {/* {showFlaws?.map((flaw) => {
        return (
          <div key={flaw.IdNummer}>
            <div className="">
              <h1 className="text-xs">Id: {flaw.bladeRelationId}</h1>
            </div>
          </div>
        );
      })} */}
      <div className="mb-10">
        {" "}
        <button
          className={`btn btn-sm mr-5 mt-5 bg-neutral text-gray-200 ${theme === "darkmode" ? "bg-primary" : "bg-neutral"} hover:bg-primary`}
          onClick={() => setShowDeletedBlades(!showDeletedBlades)}
        >
          {showDeletedBlades ? "Skjul slettede blad" : "Vis slettede blad"}
        </button>
        <button
          onClick={() => setShowService(!showService)}
          className={`btn btn-sm ${theme === "darkmode" ? "bg-primary" : "bg-neutral"} text-gray-200 hover:bg-primary`}
        >
          {showService ? "Skjul service blad" : "Vis service blad"}
        </button>
      </div>

      <div>
        {!closeSearchComponent ? <div></div> : ""}

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
          const updateStatusAfterDeleteHandler = () => {
            void updateStatus.mutate({
              id: blade.id,
              active: false,
            });
          };

          return (
            <>
              {
                <div key={blade.id} className="flex pb-10">
                  <div>
                    <div>
                      <button
                        disabled={blade.active}
                        onClick={() => statusHandler(blade.id)}
                        className={`btn btn-sm  mr-5 grid cursor-pointer bg-neutral text-gray-200 ${theme === "darkmode" ? "bg-primary" : "bg-neutral"} hover:bg-primary`}
                      >
                        Legg til post
                      </button>

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
                  <div className="relative">
                    {!blade.deleted && (
                      <button
                        onClick={() => deleteHandler(blade.id)}
                        className="btn  btn-sm flex  cursor-pointer place-content-center bg-red-200 text-red-600 transition hover:bg-red-300"
                      >
                        <RiDeleteBinLine
                          style={{
                            color: "indianred",
                            fontSize: "1rem",
                          }}
                        />
                        SLETT
                      </button>
                    )}
                    {openDeleteID === blade.id && (
                      <div className="card absolute z-40 flex w-96 flex-col items-center bg-neutral text-base-100">
                        <div className="card-body">
                          <h2 className="card-title">
                            Slett blad: {blade.IdNummer}
                          </h2>
                          <p>Velg årsaken til vrak?</p>

                          <select
                            onChange={(e) =>
                              setWasteReasonInput(e.currentTarget.value)
                            }
                            className="select select-bordered select-xs w-full max-w-xs text-neutral"
                          >
                            <option disabled selected>
                              Velg
                            </option>
                            <option value="Normal slitasje">
                              Normal slitasje
                            </option>
                            <option value="Ikjøring">Ikjøring</option>
                            <option value="Havari">Havari</option>
                            <option value="Dårlig stamme">Dårlig stamme</option>
                            <option value="Varmekjørt">Varmekjørt</option>
                            <option value="Store tannskader">
                              Store tannskader
                            </option>
                          </select>
                          <p className="text-xs">
                            Bladet blir ikke permanent slettet og kan
                            gjenopprettes senere hvis behov.
                          </p>

                          {wasteReasonInput && (
                            <th>
                              <button className="btn btn-xs bg-red-600">
                                <DeleteComponent
                                  wasteReasonInput={wasteReasonInput}
                                  setWasteReasonInput={setWasteReasonInput}
                                  id={blade.id}
                                  closeDeleteModal={closeDeleteHandler}
                                  blade={blade}
                                  updateStatusAfterDeleteHandler={
                                    updateStatusAfterDeleteHandler
                                  }
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
                        className={`btn btn-sm ${theme === "darkmode" ? "bg-primary" : "bg-neutral"} text-white hover:bg-primary`}
                      >
                        Gjenopprett
                      </button>
                    )}

                    {openGjenopprettID === blade.id && (
                      <div className="card absolute  z-[100] grid w-96 items-center text-wrap bg-gray-500 p-5 text-white">
                        <h1 className="mb-5 text-xl">Gjenopprett</h1>
                        <div className="h-auto w-full overflow-auto whitespace-normal ">
                          <p className="text-sm">
                            Ved å angre sletting av dette bladet så
                            gjenopprettes statistikk tilbake til det som var før
                            sletting og sletteårsak vil bli fjernet.
                          </p>
                          <br />
                        </div>

                        <div className="mt-5">
                          <button className="btn btn-sm mr-2 bg-neutral hover:bg-primary">
                            {" "}
                            <RestoreComponent
                              setOpenGjenopprettID={setOpenGjenopprettID}
                              id={blade.id}
                              updateStatusHandler={updateStatusHandler}
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
                  </div>
                  <div>
                    <button
                      onClick={() => setOpenEdit(true)}
                      className={`btn  btn-sm ml-5 flex  cursor-pointer place-content-center ${theme === "darkmode" ? "bg-primary" : "bg-neutral"} text-white transition `}
                    >
                      <CiEdit className="text-white" />
                      Rediger
                    </button>
                    {openEdit && (
                      <EditInputComponent
                        blade={blade}
                        openEditHandler={setOpenEdit}
                        editSawblade={editSawblade}
                        title={blade.IdNummer}
                      />
                    )}
                  </div>
                </div>
              }
            </>
          );
        })}

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
              updatePostKS={updatePostKS}
              theme={theme}
            />
          );
        })}
      </div>

      <div>
        {showService && (
          <div className="overflow-scroll p-2">
            <hr className="my-10 border-primary" />
            <h1 className="text-xl text-neutral">
              Blad service ({sawbladesService?.length})
            </h1>
            <div className="mb-5">
              <table className="table table-xs whitespace-nowrap">
                <thead>
                  <tr className="bg-primary">
                    <th className="text-gray-200 md:text-sm">Type</th>
                    <th className="text-gray-200 md:text-sm">Antall</th>
                  </tr>
                </thead>
                <tbody>
                  {countTypesList &&
                  Object.entries(countTypesList).length > 0 ? (
                    Object.entries(countTypesList).map(([type, count]) => (
                      <tr
                        key={type}
                        className={`hover:cursor-pointer ${theme === "darkmode" ? "hover:bg-gray-600" : "hover:bg-gray-300"} ${
                          theme === "darkmode"
                            ? "odd:bg-gray-700"
                            : "odd:bg-gray-200"
                        }`}
                      >
                        <td className="py-2 text-[0.6rem] font-bold text-neutral md:text-xs">
                          {type}
                        </td>
                        <td className="py-2 text-[0.6rem] font-bold text-neutral md:text-xs">
                          {count}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={2}
                        className="py-2 text-center text-[0.6rem] text-gray-500 md:text-xs"
                      >
                        Ingen data tilgjengelig
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <SawbladeServiceTable
              sawbladesService={sawbladesService}
              setIdValue={setIdValue}
              theme={theme}
              sessionData={sessionData}
            />
          </div>
        )}
      </div>
      <div>
        <div className="p-2">
          {showDeletedBlades && (
            <>
              <hr className="my-10 border-gray-400" />
              <DeletedBladesComponent
                dateValue={dateValue}
                setDateValue={setDateValue}
                deletedSawblades={deletedSawblades}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchMain;
