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
import { FiRefreshCw } from "react-icons/fi";

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
      service: string;
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
    service: "",
  });

  return (
    <div className="z-50 w-full">
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

      <div className="bg-base-100">
        <div>
          <button
            onClick={() => setOpenInput(true)}
            className="btn btn-xs mb-5 mt-5 bg-primary"
          >
            Ny post
          </button>
        </div>
      </div>
      <div className="max-xl:overflow-scroll">
        <table className="table table-xs w-full bg-base-100">
          <thead>
            <tr>
              <th className="text-sm font-thin text-neutral">Service</th>
              <th className="text-sm font-thin text-neutral">Til service</th>
              <th className="text-sm font-thin text-neutral">Signatur</th>

              <th className="text-sm font-thin text-neutral">Feilkode</th>
              <th className="text-sm font-thin text-neutral">Anm</th>
              <th className="text-sm font-bold text-neutral"></th>
              <th className="text-sm font-bold text-neutral"></th>
              <th className="text-sm font-bold text-neutral">Service</th>
              <th className="text-sm font-bold text-neutral">SK</th>
              <th className="text-sm font-bold text-neutral">Anm KS</th>
              <th className="text-sm font-bold text-neutral">Signatur</th>
              <th className="text-sm font-bold text-neutral">Dato srv</th>
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
                  service: post.service,
                  ampere: post.ampere,
                });
              };

              return (
                <>
                  <tr className="border border-base-100 bg-base-100">
                    <td className="py-5">
                      <div className="text-xs text-neutral">{post.service}</div>
                    </td>
                    <td className="py-5">
                      <div className="text-xs text-neutral ">
                        {dateFormat(post.datoInn, "dd.mm.yyyy")},{" "}
                        {dateFormat(post.klInn, "HH:MM")}
                      </div>
                    </td>
                    <td className="py-5 text-neutral">
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

                    <td className="py-5 text-neutral">{post.feilkode}</td>

                    <td className="relative  max-w-56 py-5 text-neutral">
                      {post.anmSag === "-" ? (
                        ""
                      ) : (
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
                        <div onClick={() => setOpenDeactivateModal(true)}>
                          <FiRefreshCw className=" text-lg text-orange-400" />
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
                      {post.anmKS === "-" ? (
                        ""
                      ) : (
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
                      {post.creator3 === "-" ? (
                        ""
                      ) : (
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
                      )}
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
