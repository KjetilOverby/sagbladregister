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
          className="btn btn-xs mr-5 mt-5 bg-orange-400 text-gray-700 hover:bg-orange-500"
          onClick={() => setShowDeletedBlades(!showDeletedBlades)}
        >
          {showDeletedBlades ? "Skjul slettede blad" : "Vis slettede blad"}
        </button>
        <button
          onClick={() => setShowService(!showService)}
          className="btn btn-xs bg-blue-500 text-white hover:bg-blue-600"
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
                      <div
                        className={`mr-5 grid h-10 w-10 cursor-pointer place-content-center rounded-full ${
                          blade.active
                            ? "bg-orange-400 transition hover:bg-orange-500"
                            : "bg-gray-200 transition hover:bg-gray-300"
                        }`}
                      >
                        <FiRefreshCw
                          onClick={() => statusHandler(blade.id)}
                          className={`text-lg ${
                            blade.active ? "text-white" : "text-gray-500"
                          }`}
                        />
                      </div>

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
                      <div className="grid h-10 w-10 cursor-pointer place-content-center rounded-full bg-red-200 transition hover:bg-red-300">
                        <RiDeleteBinLine
                          style={{
                            color: "indianred",
                            fontSize: "1rem",
                          }}
                          onClick={() => deleteHandler(blade.id)}
                        />
                      </div>
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
                        className="btn btn-sm bg-green-500 text-white hover:bg-green-600"
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
                          <button className="btn btn-sm mr-2 bg-green-300 hover:bg-green-500">
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
                    <div className="ml-5 grid h-10 w-10 cursor-pointer place-content-center rounded-full bg-green-200 transition hover:bg-green-300">
                      <CiEdit
                        className="text-green-600"
                        onClick={() => setOpenEdit(true)}
                      />
                    </div>
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
            />
          );
        })}
      </div>

      <div>
        {showService && (
          <div className="overflow-scroll p-2">
            <hr className="my-10 border-gray-400" />
            <h1 className="text-xl text-gray-500">
              Blad service ({sawbladesService?.length})
            </h1>
            <SawbladeServiceTable
              sawbladesService={sawbladesService}
              setIdValue={setIdValue}
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
