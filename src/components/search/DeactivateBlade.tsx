/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState } from "react";
import { api } from "~/utils/api";
import HistorikkInputKS from "./HistorikkInputKS";

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
      void ctx.sawblades.getAllService.invalidate();
      setLoading(true);
    },
  });

  return (
    <div className="absolute">
      <div className="card z-40 flex w-96 items-center  bg-neutral text-neutral-content">
        <div>
          <form
            className="flex flex-col"
            onSubmit={(e) => {
              e.preventDefault();
              // eslint-disable-next-line @typescript-eslint/no-unsafe-call
              updatePost.mutate({
                updatedAt: new Date(),
                activePost: false,
                anmKS: "",
                handling: "",
                sgKS: "",
                sideklaring: 0,
                creator3: "",
                creatorImg3: "",
                datoSrv: new Date(),
                id: post.id,

                service: post.service,
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
              <p>Legg til servicedata</p>
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
