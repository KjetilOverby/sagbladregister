/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import { api } from "~/utils/api";
import ServiceInput from "./ServiceInput";
import ReklamasjonsInput from "./ReklamasjonsInput";

interface detailProps {
  historikkData: {
    service: string;
    datoInn: Date;
    klInn: Date;
    datoUt: Date;
    klUt: Date;
    sagtid: number;
    feilkode: string;
    anmSag: string;
    temperatur: number;
    sgSag: string;
    activatePost: boolean;
    id: string;
    ampere: number;
  };
  setHistorikkData: React.Dispatch<
    React.SetStateAction<{
      datoInn: Date;
      klInn: Date;
      datoUt: Date;
      klUt: Date;
      sagtid: number;
      feilkode: string;
      bladedata: string;
      anmSag: string;
      anTimer: number;
      temperatur: number;
      sgSag: string;
      activePost: boolean;
      service: string;
      ampere: number;
    }>
  >;
  postId: string;
}

const EditBandDetails = ({
  setOpenEditBandDetails,
  postId,
  setHistorikkData,
  historikkData,
}: detailProps) => {
  const ctx = api.useContext();
  const updateBandhistorikk = api.bandhistorikk.update.useMutation({
    onSuccess: () => {
      void ctx.sawblades.getAll.invalidate();
      void ctx.sawblades.getCustomer.invalidate();
      setOpenEditBandDetails(false);
    },
  });

  return (
    <div className="absolute z-40">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateBandhistorikk.mutate({
            id: postId,
            service: historikkData.service,
            datoInn: historikkData.datoInn,
            klInn: historikkData.klInn,
            datoUt: historikkData.datoUt,
            klUt: historikkData.klUt,
            sagtid: historikkData.sagtid,
            feilkode:
              historikkData.service === "Reklamasjon"
                ? historikkData.feilkode
                : "Ingen reklamasjon",
            anmSag: historikkData.anmSag,
            temperatur: historikkData.temperatur,
            sgSag: historikkData.sgSag,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            activePost: historikkData.activePost,
            ampere: historikkData.ampere,
            creator2: "",
            creatorImg2: "",
          });
        }}
        className="card w-96  border border-neutral bg-primary text-neutral"
      >
        <div className="card-body">
          <h2 className="card-title">Rediger data</h2>
          <ServiceInput
            historikkData={historikkData}
            setHistorikkData={setHistorikkData}
          />
          {/* <div>
            <p>Dato til service:</p>
            <input
              onChange={(e) =>
                setHistorikkData({
                  ...historikkData,
                  datoInn: new Date(e.currentTarget.value),
                })
              }
              type="date"
              className="input input-bordered input-xs w-full max-w-xs bg-white"
              value={historikkData.datoInn}
            />
          </div>

          <div>
            <p>Utpostningsdato:</p>
            <input
              onChange={(e) =>
                setHistorikkData({
                  ...historikkData,
                  datoUt: new Date(e.currentTarget.value),
                })
              }
              type="date"
              className="input input-bordered input-xs w-full max-w-xs bg-white"
              value={historikkData.datoUt}
            />
          </div> */}

          <div>
            <p>Anm sag:</p>
            <input
              onChange={(e) =>
                setHistorikkData({
                  ...historikkData,
                  anmSag: e.currentTarget.value,
                })
              }
              type="text"
              className="input input-bordered input-xs w-full max-w-xs bg-white"
              value={historikkData.anmSag}
            />
          </div>
          {historikkData.service === "Reklamasjon" && (
            <div>
              <ReklamasjonsInput
                historikkData={historikkData}
                setHistorikkData={setHistorikkData}
              />
            </div>
          )}
          <div>
            <p>Signatur:</p>
            <input
              value={historikkData.sgSag}
              onChange={(e) =>
                setHistorikkData({
                  ...historikkData,
                  sgSag: e.currentTarget.value,
                })
              }
              type="text"
              className="input input-bordered input-xs w-full max-w-xs bg-white"
            />
          </div>

          <div className="card-actions">
            <button className="btn btn-primary btn-xs">Lagre</button>
            <button
              onClick={() => setOpenEditBandDetails(false)}
              className="btn btn-xs"
            >
              Avbryt
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditBandDetails;
