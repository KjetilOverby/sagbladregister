/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import dateFormat from "dateformat";
import TimeCalc from "~/components/reusable/TimeCalc";

interface Blade {
  id: string;
  deleterImg?: string;
  creatorImg?: string;
  creatorImg3?: string;
  deleter?: string;
  creator?: string;
  creator3?: string;
  updatedAt?: string;
  createdAt?: string;
  datoSrv?: string;
  type?: string;
  side?: string;
  deleteReason?: string;
  bladType?: string;
  Service?: string;
  anmSag?: string;
  produsent?: string;
  Handling?: string;
  anmKS?: string;
  kunde?: string;
  IdNummer?: string;
  bladeRelationId?: string;
}

interface ActivityDisplayProps {
  title: string;
  displaydata: Array<Blade>;
  type: string;
}

const ActivityDisplayComponent: React.FC<ActivityDisplayProps> = ({
  title,
  displaydata,
  type,
}) => {
  return (
    <div className="mb-40">
      <h1 className="my-3   text-xs text-neutral md:text-lg">
        {displaydata && displaydata.length > 0 && (
          <div>
            <p>
              {title} ({displaydata?.length})
            </p>
          </div>
        )}
      </h1>
      {displaydata?.map((blade) => {
        return (
          <div
            key={blade.id}
            className="flex border-b-[1px] border-primary py-5"
          >
            <div>
              {type === "Slettet" && (
                <img
                  className="mr-3 w-10 rounded-full"
                  src={blade.deleterImg}
                  alt=""
                />
              )}
              {type === "Service" && (
                <img
                  className="mr-3 w-10 rounded-full"
                  src={blade.creatorImg}
                  alt=""
                />
              )}
              {type === "Nye" && (
                <img
                  className="mr-3 w-10 rounded-full"
                  src={blade.creatorImg}
                  alt=""
                />
              )}
              {type === "Handling" && (
                <img
                  className="mr-3 w-10 rounded-full"
                  src={blade.creatorImg3}
                  alt=""
                />
              )}
            </div>
            <div className="flex-col">
              <div className="text-xs font-semibold text-neutral">
                <p>
                  {type === "Slettet" && blade.deleter}
                  {type === "Service" && blade.creator}
                  {type === "Nye" && blade.creator}
                  {type === "Handling" && blade.creator3} {"•"}{" "}
                  <span className="font-thin text-primary">
                    {type === "Slettet" && (
                      <TimeCalc fromDate={blade.updatedAt} toTitle="siden" />
                    )}
                    {type === "Service" && (
                      <TimeCalc fromDate={blade.createdAt} toTitle="siden" />
                    )}
                    {type === "Nye" && (
                      <TimeCalc fromDate={blade.createdAt} toTitle="siden" />
                    )}
                    {type === "Handling" && (
                      <TimeCalc fromDate={blade.datoSrv} toTitle="siden" />
                    )}
                  </span>
                </p>
              </div>

              <div>
                <p className="text-xs text-neutral">
                  {type === "Slettet" && (
                    <>
                      {dateFormat(blade.updatedAt, "dd.mm.yyyy, HH:MM")} •{" "}
                      {blade.type} {blade.side}• {blade.produsent}
                      <p className="text-purple-500">
                        Sletteårsak: {blade.deleteReason}
                      </p>
                    </>
                  )}
                  {type === "Service" && (
                    <>
                      {dateFormat(blade.createdAt, "dd.mm.yyyy, HH:MM")} •{" "}
                      <span className="text-blue-500"></span>
                      {blade.bladType} {blade.side}
                      <p className="text-blue-500">
                        Service: {blade.service}.{" "}
                        {blade.anmSag && `Kommentar: ${blade.anmSag}`}
                      </p>
                    </>
                  )}
                  {type === "Nye" && (
                    <>
                      {dateFormat(blade.updatedAt, "dd.mm.yyyy, HH:MM")} •{" "}
                      <span className="text-blue-500"></span>
                      {blade.type} {blade.side}• {blade.produsent}
                    </>
                  )}
                  {type === "Handling" && (
                    <>
                      {dateFormat(blade.datoSrv, "dd.mm.yyyy, HH:MM")} •{" "}
                      <span className="text-blue-500"></span>
                      {blade.bladType} {blade.side}
                      <p className="text-blue-500">
                        Handling: {blade.handling} •{" "}
                        {blade.anmKS && `Kommentar: ${blade.anmKS}`}
                      </p>
                    </>
                  )}
                </p>
              </div>
              <div>
                {type === "Slettet" && (
                  <p className="text-xs font-semibold text-blue-500">
                    {blade.kunde} •{" "}
                    <span className="font-semibold text-red-600">
                      {blade.IdNummer}
                    </span>
                  </p>
                )}
                {type === "Nye" && (
                  <p className="text-xs text-blue-500">
                    {blade.kunde} •{" "}
                    <span className="font-semibold text-red-600">
                      {blade.IdNummer}
                    </span>
                  </p>
                )}
                {type === "Service" && (
                  <p className="text-xs text-blue-500">
                    <span className="font-semibold text-red-600">
                      {blade.bladeRelationId}
                    </span>
                  </p>
                )}
                {type === "Handling" && (
                  <p className="text-xs text-blue-500">
                    <span className="font-semibold text-red-600">
                      {blade.bladeRelationId}
                    </span>
                  </p>
                )}
              </div>
            </div>
            <div className="ml-5 mt-4  flex h-5 min-w-10 items-center justify-center rounded-xl border border-primary bg-base-100 p-1 px-5 text-xs text-primary">
              <p>{type}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ActivityDisplayComponent;
