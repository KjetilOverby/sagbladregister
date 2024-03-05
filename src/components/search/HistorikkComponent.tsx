/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import BandDetails from "./BandDetails";
import ServiceKodeTabell from "../reusable/ServiceKodeTabell";
import dateFormat from "dateformat";

import { FiRefreshCw } from "react-icons/fi";

const HistorikkComponent = ({
  blade,
  setOpenBandhistorikkData,
  updatePost,
  updateStatusHandler,
  handleCloseModal,
}) => {
  return (
    <div>
      <div className="mb-5  p-5 max-lg:relative">
        <div className="mr-5 flex justify-between">
          <div>
            <h1 className=" texty-5  px-5">Historikk</h1>
            <h1 className="font-semiby-5 px-5  text-2xl">
              ID: {blade.IdNummer}
            </h1>
            <p className="texty-5  px-5">
              Type: {blade.type} {blade.side}
            </p>
            <p className="itay-5  px-5">
              Registrert:
              {dateFormat(blade.createdAt as Date, "dd.mm.yyyy")}
            </p>
            <div className="flex items-center justify-center">
              <p className="itay-5  px-5">Registrert av: {blade.creator}</p>
              <div className="w-10 ">
                <img
                  className="w-full rounded-full"
                  src={blade.creatorImg}
                  alt=""
                />
              </div>
            </div>
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
        />
      </div>
    </div>
  );
};

export default HistorikkComponent;
