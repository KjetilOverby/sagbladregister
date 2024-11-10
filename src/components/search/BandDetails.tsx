/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
import { RiDeleteBinFill } from "react-icons/ri";
import RoleAdmin from "../roles/RoleAdmin";

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
      antRep: number;
      antTannslipp: number;
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
  updatePostKS,
}: bandProps) => {
  const [openInput, setOpenInput] = useState(false);
  const [openMessage, setOpenMessage] = useState<string | null>(null);
  const [openMessageKS, setOpenMessageKS] = useState<string | null>(null);
  const [openInputKS, setOpenInputKS] = useState<boolean>(false);
  const [postId, setPostId] = useState("");

  const [openDeactivateModal, setOpenDeactivateModal] = useState(false);
  const [openEditBandDetails, setOpenEditBandDetails] = useState(false);
  const [openDeleteId, setOpenDeleteId] = useState<string | null>(null);

  const [historikkKs, setHistorikkKs] = useState({
    anmKS: "test",
    sgKS: "",
    datoSrv: new Date(),
    handling: "",
    sideklaring: 0,
    antRep: 0,
    antTannslipp: 0,
  });

  const openDeletePost = (postID: string) => {
    setOpenDeleteId(postID);
  };

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

  const serviceCounts = bandhistorikkData?.bandhistorikk.reduce((acc, post) => {
    const service = post.service;
    if (service) {
      acc[service] = (acc[service] || 0) + 1;
    }
    return acc;
  }, {});

  return (
    <div className="">
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
          blade={blade}
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

      <div className="">
        <div className="mb-5 p-3">
          {/*      {!blade.active && (
            <button
              onClick={() => setOpenInput(true)}
              className="btn btn-xs mb-5 mt-5  text-base-100"
            >
              Ny post
            </button>
          )} */}

          <p>Serviceposter: {bandhistorikkData?.bandhistorikk.length}</p>
          <ul>
            {Object.entries(serviceCounts).map(([service, count]) => (
              <li key={service}>
                {service}:{" "}
                <span
                  className={
                    service === "Omlodding" && count >= 3 ? "text-red-500" : ""
                  }
                >
                  {count}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="max-xl:overflow-scroll">
        <table className="table table-xs w-full bg-blue-600">
          <thead>
            <tr>
              <th className="text-sm font-thin text-gray-100">Service</th>
              <th className="text-sm font-thin text-gray-100">
                Reklamasjonstype
              </th>
              <th className="text-sm font-thin text-gray-100">Til service</th>
              <th className="text-sm font-thin text-gray-100">Signatur</th>

              <th className="text-sm font-thin text-gray-100">Anm</th>
              <th className="text-sm font-bold text-gray-100"></th>
              <th className="text-sm font-bold text-gray-100"></th>
              <th className="text-sm font-bold text-gray-100"></th>
              <th className="text-sm font-bold text-gray-100">Service</th>
              <th className="text-sm font-bold text-gray-100">Rep ant</th>
              <th className="text-sm font-bold text-gray-100">Ant tannslipp</th>
              <th className="text-sm font-bold text-gray-100">SK</th>
              <th className="text-sm font-bold text-gray-100">Anm KS</th>
              <th className="text-sm font-bold text-gray-100">Signatur</th>
              <th className="text-sm font-bold text-gray-100">Dato srv</th>
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
                  antRep: post.antRep,
                  antTannslipp: post.antTannslipp,
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
                  <tr className="border border-base-100 bg-base-100 hover:bg-primary">
                    <td className="py-5">
                      <div className="text-xs text-neutral">{post.service}</div>
                    </td>
                    <td className="py-5 text-neutral">{post.feilkode}</td>
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
                        {post.sgSag ? post.sgSag : post.creator}
                      </div>
                    </td>

                    <td className="relative  max-w-56 py-5 text-neutral">
                      {post.anmSag && (
                        <button
                          onClick={() => messageHander(post.id)}
                          className="btn btn-xs bg-green-500"
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
                              <div className="break-words">
                                <p>{post.anmSag}</p>
                              </div>
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
                        <div className="grid h-6 w-6 place-content-center rounded-full bg-orange-500">
                          <FiRefreshCw className="text-xs text-white" />
                        </div>
                      )}
                    </td>
                    <td className="text-neutral">
                      <button
                        onClick={editHistorikkPostHandler}
                        className="btn btn-xs mr-5 bg-blue-500"
                      >
                        <CiEdit
                          style={{ fontSize: ".8rem" }}
                          className="text-base-100"
                        />
                      </button>
                    </td>
                    <td>
                      <RoleAdmin>
                        <button
                          onClick={openKSinput}
                          className="btn btn-xs bg-yellow-500 text-base-100"
                        >
                          KS
                        </button>
                      </RoleAdmin>
                    </td>
                    <td className="text-neutral">{post.handling}</td>
                    <td className="text-neutral">{post.antRep}</td>
                    <td className="text-neutral">{post.antTannslipp}</td>
                    <td className="text-neutral">{post.sideklaring}</td>
                    <td className="relative max-w-56 text-neutral">
                      {post.anmKS && (
                        <>
                          <button
                            onClick={() => messageKShandler(post.id)}
                            className="btn btn-xs bg-yellow-500 text-base-100"
                          >
                            Vis
                          </button>
                          {openMessageKS === post.id && (
                            <div className="card absolute right-0 top-0 z-50 w-96 break-words bg-neutral text-accent">
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
                        {post.sgKS ? post.sgKS : post.creator3}
                      </div>
                    </td>
                    <td className="text-neutral">
                      {dateFormat(post.datoSrv, "dd.mm.yyyy")}
                    </td>
                    <td className="text-neutral">
                      {openDeleteId === post.id && (
                        <div className="card absolute right-20 z-50 bg-red-500 p-5 text-white">
                          <div>
                            <h1 className="mb-5 text-lg">Slett post</h1>
                            <p>
                              Sletting av post er permanent og kan ikke angres.
                            </p>
                            <p className="mb-3">
                              Statistikk i forbindelse med posten blir borte.
                            </p>
                          </div>
                          <div className="flex">
                            <button
                              onClick={() => setOpenDeleteId(null)}
                              className="btn btn-sm mr-5 bg-blue-500 text-white hover:bg-blue-400"
                            >
                              Avbryt
                            </button>

                            <Deletehistorikkpost
                              post={post.id}
                              setOpenBandhistorikkData={
                                setOpenBandhistorikkData
                              }
                            />
                          </div>
                        </div>
                      )}
                      <td>
                        <button onClick={() => openDeletePost(post.id)}>
                          <RiDeleteBinFill className="text-sm text-red-500" />
                        </button>
                      </td>
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
