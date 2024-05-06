/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState } from "react";
import { api } from "~/utils/api";
import ServInputMV from "./CustomersInit/mv/ServInputMV";
import ServInputMT from "./CustomersInit/mt/ServInputMT";

interface historikkInputProps {
  postId: string;
  setOpenBandhistorikkData: React.Dispatch<React.SetStateAction<boolean>>;

  historikkKs: {
    anmKS: string;
    handling: string;
    sgKS: string;
    datoSrv: Date;
    sideklaring: number;
    antRep: number;
    antTannslipp: number;
  };
  setOpenInputKS: React.Dispatch<React.SetStateAction<boolean>>;
  setHistorikkKs: React.Dispatch<
    React.SetStateAction<{
      anmKS: string;
      sgKS: string;
      datoSrv: Date;
      handling: string;
      sideklaring: number;
      antRep: number;
      antTannslipp: number;
    }>
  >;
}

const HistorikkInputKS = ({
  postId,
  historikkKs,
  setHistorikkKs,
  setOpenInputKS,
  blade,
}: historikkInputProps) => {
  const ctx = api.useContext();

  console.log(blade.bandhistorikk);
  console.log(historikkKs.antTannslipp);

  const updatePost = api.bandhistorikk.updateKS.useMutation({
    onSuccess: () => {
      void ctx.sawblades.getAll.invalidate();
      void ctx.sawblades.getCustomer.invalidate();
      setOpenInputKS(false);
    },
  });

  const updateBladeStatus = api.sawblades.updateStatus.useMutation({
    onSuccess: () => {
      void ctx.sawblades.getAll.invalidate();
      void ctx.sawblades.getCustomer.invalidate();
      void ctx.sawblades.getAllService.invalidate();
      setLoading(true);
    },
  });

  const [bfsValue, setBfsValue] = useState({});

  const nonEmptyValues = Object.values(bfsValue).filter(
    (value) => value !== "",
  );
  const concatenatedString = nonEmptyValues.join(", ");

  return (
    <div className="absolute z-40">
      <form
        onSubmit={(e) => {
          e.preventDefault();

          const lastPost = blade.bandhistorikk[0];

          if (concatenatedString === "") {
            alert("Du må velge minst en BFS kode");
          } else if (
            lastPost.feilkode === "Tannslipp" &&
            historikkKs.antTannslipp === 0
          ) {
            alert("du må legg inn antall tannslipp");
          } else if (
            lastPost.service === "Reparasjon" &&
            historikkKs.antRep === 0
          ) {
            alert("du må legg inn antall reparasjoner");
          } else {
            void updatePost.mutate({
              id: postId,
              anmKS: historikkKs.anmKS,
              handling: concatenatedString,
              sgKS: historikkKs.sgKS,
              datoSrv: historikkKs.datoSrv,
              sideklaring: historikkKs.sideklaring,
              creator3: "",
              creatorImg3: "",
              activePost: false,
              antRep: historikkKs.antRep,
              antTannslipp: historikkKs.antTannslipp,
            });
            updateBladeStatus.mutate({
              id: blade.id,
              active: false,
            });
          }
        }}
        className="card w-96 border border-neutral bg-primary text-neutral"
      >
        <div className="card-body">
          <h2 className="card-title">Oppdater post</h2>
          <div>
            <p>Servicedato:</p>
            <input
              onChange={(e) =>
                setHistorikkKs({
                  ...historikkKs,
                  datoSrv: new Date(e.currentTarget.value),
                })
              }
              type="date"
              className="input input-bordered input-xs w-full max-w-xs bg-white"
            />
          </div>

          <div>
            <p>Anm K&S:</p>
            <input
              value={historikkKs.anmKS}
              onChange={(e) =>
                setHistorikkKs({
                  ...historikkKs,
                  anmKS: e.currentTarget.value,
                })
              }
              type="text"
              className="input input-bordered input-xs w-full max-w-xs bg-white"
            />
          </div>
          <div>
            <p>Sideklaring:</p>
            <select
              onChange={(e) =>
                setHistorikkKs({
                  ...historikkKs,
                  sideklaring: Number(e.currentTarget.value),
                })
              }
              className="select select-bordered select-xs w-full max-w-xs bg-white"
            >
              <option value={0}>Velg</option>
              <option value={0.4}>0.4</option>
              <option value={0.45}>0.45</option>
              <option value={0.5}>0.5</option>
              <option value={0.55}>0.55</option>
              <option value={0.6}>0.6</option>
              <option value={0.65}>0.65</option>
              <option value={0.7}>0.7</option>
            </select>
          </div>
          <div>
            <p>Antall tenner rep:</p>
            <input
              onChange={(e) =>
                setHistorikkKs({
                  ...historikkKs,
                  antRep: Number(e.currentTarget.value),
                })
              }
              className="input input-bordered input-xs w-full max-w-xs bg-white"
              type="number"
              value={Number(historikkKs.antRep)}
            />
          </div>
          <div>
            <p>Antall tannslipp:</p>
            <input
              onChange={(e) =>
                setHistorikkKs({
                  ...historikkKs,
                  antTannslipp: Number(e.currentTarget.value),
                })
              }
              className="input input-bordered input-xs w-full max-w-xs bg-white"
              type="number"
              value={Number(historikkKs.antTannslipp)}
            />
          </div>
          <p>SERV koder</p>

          {blade.IdNummer.includes("MV-") && (
            <ServInputMV setBfsValue={setBfsValue} bfsValue={bfsValue} />
          )}
          {blade.IdNummer.includes("MT-") && (
            <ServInputMT setBfsValue={setBfsValue} bfsValue={bfsValue} />
          )}

          <div>
            <p>Sign:</p>
            <input
              value={historikkKs.sgKS}
              onChange={(e) =>
                setHistorikkKs({
                  ...historikkKs,
                  sgKS: e.currentTarget.value,
                })
              }
              type="text"
              className="input input-bordered input-xs w-full max-w-xs bg-white"
            />
          </div>
          <div className="card-actions">
            <button className="btn btn-primary btn-xs">Lagre</button>
            <button
              onClick={() => setOpenInputKS(false)}
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

export default HistorikkInputKS;
