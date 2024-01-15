// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState } from "react";
import { api } from "~/utils/api";

interface Blade {
  id: string;
  type: string;
  IdNummer: string;
  deleted: boolean;
  creator: string;
  updatedAt: Date;
  createdAt: Date;
  kunde: string;
  side: string;
  active: boolean;
  deleteReason: string;
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
  blade: {
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

    _count: {
      bandhistorikk: number;
    };
  };

  post: {
    id: string;
    type: string;
    IdNummer: string;
    deleted: boolean;
    creator: string;
    updatedAt: Date;
    createdAt: Date;
    kunde: string;
    side: string;
    active: boolean;
    deleteReason: string;
    _count: {
      bandhistorikk: number;
    };
  };
  updatePost: () => void;
  handleCloseModal: () => void;
  createPost: () => void;
}

const ActivateBlade = ({
  updatePost,
  blade,
  handleCloseModal,
  post,
  setOpenDeactivateModal,
}: BladeProps) => {
  const [loading, setLoading] = useState(false);
  const ctx = api.useContext();
  const updateBladeStatus = api.sawblades.updateStatus.useMutation({
    onSuccess: () => {
      void ctx.sawblades.getAll.invalidate();
      void ctx.sawblades.getCustomer.invalidate();
      setLoading(true);
    },
  });

  const [inputValues, setInputValues] = useState({
    sagtid: 10,
    temperatur: 20,
    anmSag: "",
    feilkode: "Ingen anmerkning",
    antTimer: 40,
    sgSag: "",
    ampere: 0,
  });

  return (
    <div>
      <div className="card z-40 flex w-96 items-center  bg-neutral text-neutral-content">
        <div>
          <form
            className="flex flex-col"
            onSubmit={(e) => {
              e.preventDefault();
              // eslint-disable-next-line @typescript-eslint/no-unsafe-call
              updatePost.mutate({
                activePost: false,
                sagtid: inputValues.sagtid,
                sgSag: inputValues.sgSag,
                temperatur: inputValues.temperatur,
                anmSag: inputValues.anmSag,
                feilkode: inputValues.feilkode,
                antTimer: inputValues.antTimer,
                ampere: inputValues.ampere,
                datoUt: new Date(),
                klUt: new Date(),
                id: post.id,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                datoInn: post.datoInn,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                klInn: post.klInn,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                sagNr: post.sagNr,
                creator2: "",
                creatorImg2: "",
              });
              //   updateStatusHandler();

              updateBladeStatus.mutate({
                id: blade.id,
                active: false,
              });
            }}
          >
            <div className="card-body items-center text-center">
              <h2 className="card-title">
                <span className="text-orange-600">{blade.IdNummer}</span>{" "}
                {loading ? (
                  <span className="loading loading-infinity loading-lg  text-orange-600"></span>
                ) : (
                  ""
                )}
              </h2>
              <p>Deaktiver blad</p>
              <div>
                <div>
                  <p>Antall timer:</p>
                  <input
                    onChange={(e) =>
                      setInputValues({
                        ...inputValues,
                        sagtid: Number(e.currentTarget.value),
                      })
                    }
                    type="number"
                    className="input input-bordered input-xs w-full max-w-xs bg-white"
                  />
                </div>
                <div>
                  <p>Temperatur:</p>
                  <input
                    onChange={(e) =>
                      setInputValues({
                        ...inputValues,
                        temperatur: Number(e.currentTarget.value),
                      })
                    }
                    type="number"
                    className="input input-bordered input-xs w-full max-w-xs bg-white"
                  />
                </div>
                <div>
                  <p>Ampere:</p>
                  <input
                    onChange={(e) =>
                      setInputValues({
                        ...inputValues,
                        ampere: Number(e.currentTarget.value),
                      })
                    }
                    type="text"
                    className="input input-bordered input-xs w-full max-w-xs bg-white"
                  />
                </div>
                <div>
                  <p>Anm sag:</p>

                  <input
                    onChange={(e) =>
                      setInputValues({
                        ...inputValues,
                        anmSag: e.currentTarget.value,
                      })
                    }
                    type="text"
                    className="input input-bordered input-xs w-full max-w-xs bg-white"
                  />
                </div>
                <div>
                  <p>Feilkode:</p>
                  <select
                    onChange={(e) =>
                      setInputValues({
                        ...inputValues,
                        feilkode: e.currentTarget.value,
                      })
                    }
                    className="select select-bordered select-xs w-full max-w-xs bg-white"
                  >
                    <option value="">Ingen anmerkning</option>
                    <option value="Bølger">Bølger</option>
                    <option value="Vandrer på hjul">Vandrer på hjul</option>
                    <option value="Sprekk">Sprekk</option>
                    <option value="Tannbrudd">Tannbrudd</option>
                    <option value="Sponpåliming">Sponpåliming</option>
                    <option value="Sløv">Sløv</option>
                    <option value="River">Riper</option>
                    <option value="Ytre faktorer">Ytre faktorer</option>
                    <option value="Reklamasjon">Reklamasjon</option>
                    <option value="Havari">Havari</option>
                    <option value="Ikjøring">Ikjøring</option>
                    <option value="Riper/bølger">Riper/bølger</option>
                    <option value="Riper/sprekk">Riper/sprekk</option>
                    <option value="Riper/vandrer">Riper/vandrer</option>
                    <option value="Bølger/sprekk">Bølger/sprekk</option>
                    <option value="Bølger/vandrer">Bølger/vandrer</option>
                    <option value="Ikjøring/riper">Ikjøring/riper</option>
                  </select>
                </div>
                <div>
                  <p>Signatur:</p>

                  <input
                    onChange={(e) =>
                      setInputValues({
                        ...inputValues,
                        sgSag: e.currentTarget.value,
                      })
                    }
                    type="text"
                    className="input input-bordered input-xs w-full max-w-xs bg-white"
                  />
                </div>
              </div>
            </div>

            <button className="btn btn-primary btn-xs bg-accent">
              Deaktiver
            </button>
          </form>
        </div>
        <div className="card-actions justify-end">
          <button
            onClick={() => {
              setTimeout(() => {
                handleCloseModal();
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                setOpenDeactivateModal(false);
              }, 100);
            }}
            className="btn btn-xs my-3"
          >
            Avbryt
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivateBlade;
