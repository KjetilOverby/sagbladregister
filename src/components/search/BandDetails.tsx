/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @next/next/no-img-element */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState } from "react";
import dateFormat from "dateformat";
import HistorikkInput from "./HistorikkInput";
import Deletehistorikkpost from "./deletehistorikkpost";
import HistorikkInputKS from "./HistorikkInputKS";
import { CiEdit } from "react-icons/ci";
import DeactivateBlade from "./DeactivateBlade";
import EditBandDetails from "./EditBandDetails";

interface bandProps {
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
  bandhistorikkData: {
    side: string;
    id: string;
    updatedAt: Date;
    IdNummer: string;
    type: string;

    bandhistorikk: {
      creator: string;
      feilkode: string;
      handling: string;
      historikkId: string;
      id: string;
      datoInn: Date;
      datoUt: Date;
      sagNr: string;
      sideklaring: number;
      updatedAt: Date;
      sagtid: number;
      klInn: Date;
      klUt: Date;
      anmSag: string;
      anmKS: string;
      sgKS: string;
      sgSag: string;
      datoSrv: Date;
      temperatur: number;
      ampere: number;
      activePost: boolean;
    }[];
  };

  setOpenBandhistorikkData: React.Dispatch<React.SetStateAction<boolean>>;
  updatePost: () => void;
  deactivateStatusHandler: () => void;
  handleCloseModal: () => void;
}

const BandDetails = ({
  bandhistorikkData,
  setOpenBandhistorikkData,
  blade,
  updatePost,
  deactivateStatusHandler,
  handleCloseModal,
}: bandProps) => {
  const [openInput, setOpenInput] = useState(false);
  const [openMessage, setOpenMessage] = useState<string | null>(null);
  const [openMessageKS, setOpenMessageKS] = useState<string | null>(null);
  const [openInputKS, setOpenInputKS] = useState<boolean>(false);
  const [postId, setPostId] = useState("");

  const [openDeactivateModal, setOpenDeactivateModal] = useState(false);
  const [openEditBandDetails, setOpenEditBandDetails] = useState(false);

  const [historikkKs, setHistorikkKs] = useState({
    anmKS: "",
    sgKS: "",
    datoSrv: new Date(),
    handling: "",
    sideklaring: 0,
  });

  const messageHander = (postID: string) => {
    setOpenMessage(postID);
  };
  const closeMessageHandler = () => {
    setOpenMessage(null);
  };
  const closeMessageKSHandler = () => {
    setOpenMessageKS(null);
  };
  const messageKShandler = (postID: string) => {
    setOpenMessageKS(postID);
  };
  const [historikkData, setHistorikkData] = useState({
    datoInn: new Date(),
    klInn: new Date(),
    datoUt: new Date(),
    klUt: new Date(),
    sagtid: 0,
    feilkode: "",
    bladedata: "",
    anmSag: "",
    anTimer: 0,
    temperatur: 0,
    ampere: 0,
    sgSag: "",
    activePost: false,
    sagNr: "",
  });

  return (
    <div className="z-50 w-full bg-gradient-to-r from-primary via-secondary to-primary">
      {openInput && (
        <HistorikkInput
          setOpenInput={setOpenInput}
          bandId={bandhistorikkData.id}
          setOpenBandhistorikkData={setOpenBandhistorikkData}
          side={bandhistorikkData.side}
          bladType={bandhistorikkData.type}
          bladID={bandhistorikkData.IdNummer}
        />
      )}

      {openInputKS && (
        <HistorikkInputKS
          setOpenBandhistorikkData={setOpenBandhistorikkData}
          setOpenInputKS={setOpenInputKS}
          postId={postId}
          historikkKs={historikkKs}
          setHistorikkKs={setHistorikkKs}
        />
      )}

      {openEditBandDetails && (
        <EditBandDetails
          setOpenEditBandDetails={setOpenEditBandDetails}
          postId={postId}
          historikkData={historikkData}
          setHistorikkData={setHistorikkData}
        />
      )}

      <div>
        <div>
          <button
            onClick={() => setOpenInput(true)}
            className="btn btn-xs mb-5 mt-5 bg-primary"
          >
            Ny post
          </button>
        </div>
      </div>
      <div>
        <table className="table table-xs w-full bg-neutral">
          <thead>
            <tr>
              <th className="text-sm font-thin text-accent">Sag</th>
              <th className="text-sm font-thin text-accent">Innpostet</th>
              <th className="text-sm font-thin text-accent">Signatur</th>
              <th className="text-sm font-thin text-accent">Utpostet</th>
              <th className="text-sm font-thin text-accent">Signatur</th>

              <th className="text-sm font-thin text-accent">T</th>

              <th className="text-sm font-thin text-accent">Temp</th>
              <th className="text-sm font-thin text-accent">Ampere</th>
              <th className="text-sm font-thin text-accent">Feilkode</th>
              <th className="text-sm font-thin text-accent">Anm</th>
              <th className="text-sm font-bold text-primary"></th>
              <th className="text-sm font-bold text-primary"></th>
              <th className="text-sm font-bold text-primary">Service</th>
              <th className="text-sm font-bold text-primary">SK</th>
              <th className="text-sm font-bold text-primary">Anm KS</th>
              <th className="text-sm font-bold text-primary">Signatur</th>
              <th className="text-sm font-bold text-primary">Dato srv</th>
            </tr>
          </thead>
          <tbody>
            {bandhistorikkData.bandhistorikk.map((post) => {
              const openKSinput = () => {
                setOpenInputKS(true);
                setPostId(post.id);
                setHistorikkKs({
                  anmKS: post.anmKS,
                  handling: post.handling,
                  sgKS: post.sgKS,
                  datoSrv: new Date(),
                  sideklaring: post.sideklaring,
                });
              };

              const editHistorikkPostHandler = () => {
                setOpenEditBandDetails(true);
                setPostId(post.id);
                setHistorikkData({
                  activePost: post.activePost,
                  datoInn: post.datoInn,
                  klInn: post.klInn,
                  klUt: post.klUt,
                  datoUt: post.datoUt,
                  feilkode: post.feilkode,
                  temperatur: post.temperatur,
                  anmSag: post.anmSag,
                  sgSag: post.sgSag,
                  sagtid: post.sagtid,
                  sagNr: post.sagNr,
                  ampere: post.ampere,
                });
              };

              return (
                <>
                  <tr
                    className={post.activePost ? "bg-primary" : "bg-secondary"}
                  >
                    <td>
                      <div className="text-xs text-neutral">{post.sagNr}</div>
                    </td>
                    <td>
                      <div className="text-xs text-neutral ">
                        {dateFormat(post.datoInn, "dd.mm.yyyy")},{" "}
                        {dateFormat(post.klInn, "HH:MM")}
                      </div>
                    </td>
                    <td className="text-neutral">
                      <div className="flex items-center">
                        <div className="mr-2 h-5 w-5">
                          <img
                            className="w-full rounded-full"
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            src={post.creatorImg}
                            alt=""
                          />
                        </div>
                        {post.creator}
                      </div>
                    </td>
                    <td>
                      {!post.activePost ? (
                        <div className="text-xs text-neutral">
                          {dateFormat(post.datoUt, "dd.mm.yyyy")},{" "}
                          {dateFormat(post.klUt, "HH:MM")}
                        </div>
                      ) : (
                        "Aktiv"
                      )}
                    </td>
                    <td className="text-neutral">
                      <div className="flex items-center">
                        <div className="mr-2 h-5 w-5">
                          <img
                            className="w-full rounded-full"
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            src={post.creatorImg2}
                            alt=""
                          />
                        </div>
                        {post.sgSag ? post.sgSag : post.creator2}
                      </div>
                    </td>
                    <td className="font-bold text-neutral">{post.sagtid}</td>

                    <td className="text-neutral">{post.temperatur}</td>
                    <td className="text-neutral">{post.ampere}</td>
                    <td className="text-neutral">{post.feilkode}</td>

                    <td className="relative  max-w-56 text-neutral">
                      {post.anmSag && (
                        <button
                          onClick={() => messageHander(post.id)}
                          className="btn btn-xs bg-accent"
                        >
                          Vis
                        </button>
                      )}
                      {openMessage === post.id && (
                        <>
                          {openMessage && <p></p>}
                          <div className="card absolute top-0 z-50 w-96 bg-neutral text-accent">
                            <div className="card-body">
                              <h2 className="card-title">Melding fra sag</h2>
                              <p>{post.anmSag}</p>
                              <div className="card-actions justify-end">
                                <button
                                  onClick={closeMessageHandler}
                                  className="btn btn-xs"
                                >
                                  Lukk
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </td>

                    <td className="text-primary">
                      {post.activePost && (
                        <div
                          onClick={() => setOpenDeactivateModal(true)}
                          className="h-3 w-3 rounded-full bg-green-400"
                        >
                          {openDeactivateModal && (
                            <DeactivateBlade
                              blade={blade}
                              updatePost={updatePost}
                              updateStatusHandler={deactivateStatusHandler}
                              handleCloseModal={handleCloseModal}
                              post={post}
                              setOpenDeactivateModal={setOpenDeactivateModal}
                            />
                          )}
                        </div>
                      )}
                    </td>
                    <td className="text-neutral">
                      <button
                        onClick={editHistorikkPostHandler}
                        className="btn btn-xs mr-5 bg-base-100"
                      >
                        <CiEdit
                          style={{ fontSize: ".8rem" }}
                          className="text-neutral"
                        />
                      </button>

                      {!post.activePost && (
                        <button
                          onClick={openKSinput}
                          className="btn btn-xs text-neutral"
                        >
                          KS
                        </button>
                      )}
                    </td>
                    <td className="text-neutral">{post.handling}</td>
                    <td className="text-neutral">{post.sideklaring}</td>
                    <td className="relative max-w-56 text-neutral">
                      {post.anmKS && (
                        <>
                          <button
                            onClick={() => messageKShandler(post.id)}
                            className="btn btn-xs bg-accent"
                          >
                            Vis
                          </button>
                          {openMessageKS === post.id && (
                            <div className="card absolute right-0 top-0 z-50 w-96 bg-neutral text-accent">
                              <div className="card-body">
                                <h2 className="card-title">
                                  Melding fra Stridsbergs
                                </h2>
                                <p>{post.anmKS}</p>
                                <div className="card-actions justify-end">
                                  <button
                                    onClick={closeMessageKSHandler}
                                    className="btn btn-xs"
                                  >
                                    Lukk
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </td>
                    <td className="text-neutral">
                      <div className="flex items-center">
                        <div className="mr-2 h-5 w-5">
                          <img
                            className="w-full rounded-full"
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            src={post.creatorImg3}
                            alt=""
                          />
                        </div>
                        {post.creator3}
                      </div>
                    </td>
                    <td className="text-neutral">
                      {dateFormat(post.datoSrv, "dd.mm.yyyy")}
                    </td>
                    <td className="text-neutral">
                      <Deletehistorikkpost
                        post={post.id}
                        setOpenBandhistorikkData={setOpenBandhistorikkData}
                      />
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BandDetails;
