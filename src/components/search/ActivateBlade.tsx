// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState } from "react";

interface Blade {
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
    bladedata: string;
    ampere: number;
    alt: string;
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
  updateStatusHandler: () => void;
  handleCloseModal: () => void;
  createPost: (bandhistorikk: {
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
    ampere: number;
    alt: string;
  }) => void;
}

const ActivateBlade = ({
  createPost,
  blade,
  updateStatusHandler,
  handleCloseModal,
}: BladeProps) => {
  const [serviceInput, setserviceInput] = useState("");

  return (
    <div>
      <div className="card z-40 w-96 bg-neutral text-neutral-content">
        <div className="flex flex-col">
          <form
            className="flex flex-col items-center"
            onSubmit={(e) => {
              e.preventDefault();

              if (serviceInput === "") {
                alert("Servicetype er påkrevd");
              } else {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                createPost.mutate({
                  service: serviceInput,
                  activePost: true,
                  bladeRelationId: blade.IdNummer,
                  bladType: blade.type,
                  side: blade.side,
                  creatorImg: "",
                  sgKS: "",
                  sagtid: 0,
                  createdBy: "",
                  anmKS: "",
                  createdById: "",
                  datoSrv: new Date(),
                  sgSag: "",
                  sideklaring: 0,
                  handling: "",
                  userId: "",
                  temperatur: 0,
                  anmSag: "",
                  feilkode: "Aktivt blad",
                  ampere: 0,
                  datoUt: new Date(),
                  datoInn: new Date(),
                  klUt: new Date(),
                  klInn: new Date(),
                  bladedata: blade.id,
                  alt: "",
                  creator: "",
                  creator2: "",
                  creatorImg2: "",
                  creator3: "",
                  creatorImg3: "",
                });
                updateStatusHandler();
              }
            }}
          >
            <div className="card-body items-center text-center">
              <h2 className="card-title">
                <span className="text-accent">{blade.IdNummer}</span>
              </h2>
              <p className="text-accent">Aktiver service</p>

              <select
                onChange={(e) => setserviceInput(e.currentTarget.value)}
                className="rounded-xl bg-white p-1"
                name=""
                id=""
              >
                <option value="">Velg service</option>
                <option value="Omlodding">Omlodding</option>
                <option value="Rep tannskader">Rep tannskader</option>
                <option value="Reklamasjon tannslipp">
                  Reklamasjon tannslipp
                </option>
                <option value="Reklamasjon dårlig lodd">
                  Reklamasjon dårlig lodd
                </option>
                <option value="Reklamasjon feil">Reklamasjon feil</option>
              </select>
            </div>
            <button className="btn btn-primary btn-xs w-1/4 bg-accent">
              Aktiver
            </button>
          </form>
        </div>
        <div className="card-actions my-5 justify-center">
          <button
            onClick={() => {
              setTimeout(() => {
                handleCloseModal();
              }, 100);
            }}
            className="btn btn-xs"
          >
            Avbryt
          </button>
          {createPost.isLoading ? (
            <span className="loading loading-dots loading-lg"></span>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivateBlade;
