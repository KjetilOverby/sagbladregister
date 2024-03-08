/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import BandDetails from "./BandDetails";
import ServiceKodeTabell from "../reusable/ServiceKodeTabell";
import dateFormat from "dateformat";
import TypesArticle from "../reusable/TypesArticle";
import mvArticleTypes from "~/appdata/mvArticleTypes";
import mtArticleTypes from "~/appdata/mtArticleTypes";

const HistorikkComponent = ({
  blade,
  setOpenBandhistorikkData,
  updatePost,
  updateStatusHandler,
  handleCloseModal,
  updatePostKS,
}) => {
  return (
    <div>
      <div className="mb-5  max-lg:relative">
        <div className="mr-5 flex ">
          <div className="mb-3 rounded-xl p-5 shadow-xl">
            <h1 className="text-2xl">
              ID: {blade.IdNummer}{" "}
              {blade.deleted === true && (
                <span className="text-red-500">VRAKET</span>
              )}
            </h1>
            <p className="text-xs">
              Type: {blade.type} {blade.side}
            </p>
            <p className="mb-3 text-xs">
              Art nr:{" "}
              <span>
                <TypesArticle blade={blade} articleTypes={mvArticleTypes} />
              </span>
              <span>
                <TypesArticle blade={blade} articleTypes={mtArticleTypes} />
              </span>
            </p>

            <div className="mb-5 rounded-xl bg-green-200 p-2 text-xs">
              <p className="">Registrert av: {blade.creator}</p>
              <p className="mb-3">
                Dato:
                {dateFormat(blade.createdAt as Date, "dd.mm.yyyy")}
              </p>
              <div className="w-10">
                <img
                  className="w-full rounded-full"
                  src={blade.creatorImg}
                  alt=""
                />
              </div>
            </div>
            {blade.deleted && (
              <div className="mb-5 rounded-xl bg-red-200 p-2 text-xs">
                <p>Slettet av: {blade.deleter}</p>
                <p>Dato: {dateFormat(blade.updatedAt as Date, "dd.mm.yyyy")}</p>
                <p className="mb-3">Vrakårsak: {blade.deleteReason}</p>
                <div className="w-10">
                  <img
                    className="w-full rounded-full"
                    src={blade.deleterImg}
                    alt=""
                  />
                </div>
              </div>
            )}
          </div>
          {/*  <div
            onClick={() => statusHandler(blade.id)}
            className="flex flex-col items-center justify-center"
          >
            <h1>Service</h1>
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full ${blade.active ? "bg-emerald-400" : "bg-base-100"}`}
            >
              <FiRefreshCw
                className={`text-3xl ${
                  blade.active ? "text-blue-600" : "text-accent"
                }`}
              />
            </div>
          </div> */}
          <div className="mb-5">
            <ServiceKodeTabell />
          </div>
        </div>
        <BandDetails
          bandhistorikkData={blade}
          setOpenBandhistorikkData={setOpenBandhistorikkData}
          blade={blade}
          updatePost={updatePost}
          updateStatusHandler={updateStatusHandler}
          handleCloseModal={handleCloseModal}
          updatePostKS={updatePostKS}
        />
      </div>
    </div>
  );
};

export default HistorikkComponent;
