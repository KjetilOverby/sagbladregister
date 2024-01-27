/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState } from "react";
import { api } from "~/utils/api";

interface historikkInputProps {
  setOpenInput: React.Dispatch<React.SetStateAction<boolean>>;
  bandId: string;
  setOpenBandhistorikkData: React.Dispatch<React.SetStateAction<boolean>>;
  side: string;
  bladType: string;
  bladID: string;
}

const HistorikkInput = ({
  setOpenInput,
  bandId,
  side,
  bladType,
  bladID,
}: historikkInputProps) => {
  const ctx = api.useContext();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const createPost = api.bandhistorikk.create.useMutation({
    onSuccess: () => {
      void ctx.sawblades.getAll.invalidate();
      void ctx.sawblades.getCustomer.invalidate();
      setOpenInput(false);
    },
  });

  const [historikkData, setHistorikkData] = useState({
    service: "",
    datoInn: new Date(),
    klInn: new Date(),
    datoUt: new Date(),
    klUt: new Date(),
    sagtid: 0,
    feilkode: "Ingen anmerkning",
    handling: "Ingen handling",
    sideklaring: 0,
    creator: "-",
    bladedata: "-",
    anmSag: "-",
    temperatur: 0,
    sgSag: "-",
    sgKS: "-",
    alt: "-",
    bladType: "-",
    side: side,
    bladeRelationId: "-",
    ampere: 0,
  });
  return (
    <div className="absolute z-40">
      <form
        onSubmit={(e) => {
          e.preventDefault();

          try {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

            if (historikkData.service === "") {
              alert("Sagnummer påkrevd");
            } else {
              const response = createPost.mutateAsync({
                service: historikkData.service,
                datoInn: historikkData.datoInn,
                klInn: historikkData.klInn,
                datoUt: historikkData.datoUt,
                klUt: historikkData.klUt,
                sagtid: historikkData.sagtid,
                feilkode: historikkData.feilkode,
                handling: historikkData.handling,
                sideklaring: historikkData.sideklaring,
                createdById: "",
                bladedata: bandId,
                anmSag: historikkData.anmSag,
                anmKS: "-",
                datoSrv: new Date(),
                temperatur: historikkData.temperatur,
                userId: "-",
                sgSag: "-",
                sgKS: "-",
                createdBy: "-",
                side: side,
                creatorImg: "-",
                bladType: bladType,
                activePost: false,
                bladeRelationId: bladID,
                alt: "-",
                creator: "-",
                ampere: historikkData.ampere,
                creator2: "-",
                creatorImg2: "-",
                creator3: "-",
                creatorImg3: "-",
              });
              console.log(response);
            }
          } catch (error) {
            console.log(error);
          }
        }}
        className="card w-96 border border-neutral bg-primary text-neutral"
      >
        <div className="card-body">
          <h2 className="card-title">Legg til data</h2>
          <div>
            <p>service:</p>
            <select
              onChange={(e) =>
                setHistorikkData({
                  ...historikkData,
                  service: e.currentTarget.value,
                })
              }
              value={historikkData.service}
              className="select select-bordered select-xs w-full max-w-xs bg-white"
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
          {/* <div>
            <p>Innpostningsdato:</p>
            <input
              onChange={(e) =>
                setHistorikkData({
                  ...historikkData,
                  datoInn: new Date(e.currentTarget.value),
                })
              }
              type="date"
              className="input input-bordered input-xs w-full max-w-xs bg-white"
            />
          </div> */}
          {/*        
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
            />
          </div>
          <div>
            <p>Feilkode:</p>
            <select
              onChange={(e) =>
                setHistorikkData({
                  ...historikkData,
                  feilkode: e.currentTarget.value,
                })
              }
              className="select select-bordered select-xs w-full max-w-xs bg-white"
            >
              <option value="Ingen anmerkning">Ingen anmerkning</option>
              <option value="Bølger">Bølger</option>
              <option value="Vandrer på hjul">Vandrer på hjul</option>
              <option value="Sprekk">Sprekk</option>
              <option value="Tannbrudd">Tannbrudd</option>
              <option value="Sponpåliming">Sponpåliming</option>
              <option value="Sløv">Sløv</option>
              <option value="Riper">Riper</option>
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

          <div className="card-actions">
            <button className="btn btn-primary btn-xs">Lagre</button>
            <button onClick={() => setOpenInput(false)} className="btn btn-xs">
              Avbryt
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HistorikkInput;
