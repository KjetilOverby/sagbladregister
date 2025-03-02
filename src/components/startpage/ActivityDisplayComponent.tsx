/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import dateFormat from "dateformat";
import Link from "next/link";
import React from "react";
import TimeCalc from "~/components/reusable/TimeCalc";

const ActivityDisplayComponent: React.FC<ActivityDisplayProps> = ({
  title,
  displaydata,
  type,
  setIdValue,
  customer,
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
              <div className="text-xs text-neutral">
                <p className="font-bold ">
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
                      {blade.type} {blade.side}{" "}
                      <span className="text-red-500">
                        • Sletteårsak: {blade.deleteReason}
                      </span>
                    </>
                  )}
                  {type === "Service" && (
                    <>
                      {dateFormat(blade.createdAt, "dd.mm.yyyy, HH:MM")} •{" "}
                      {blade.bladType} {blade.side}
                      <p className="text-blue-500">
                        Service: {blade.feilkode} • {`${blade.temperatur}°C`}
                      </p>
                      <span className="text-purple-500">
                        {" "}
                        {blade.anmSag && `Kommentar: ${blade.anmSag}`}
                      </span>
                    </>
                  )}
                  {type === "Nye" && (
                    <>
                      {dateFormat(blade.updatedAt, "dd.mm.yyyy, HH:MM")} •{" "}
                      <span className="text-blue-500"></span>
                      {blade.type} {blade.side} • Produsent: {blade.produsent}
                    </>
                  )}
                  {type === "Handling" && (
                    <>
                      {dateFormat(blade.datoSrv, "dd.mm.yyyy, HH:MM")} •{" "}
                      {blade.bladType} {blade.side}
                      <p className="text-blue-500">
                        Handling: {blade.handling} •{" "}
                        <span className="text-purple-500">
                          {blade.anmKS && `Kommentar: ${blade.anmKS}`}
                        </span>
                      </p>
                    </>
                  )}
                </p>
              </div>
              <div>
                {type === "Slettet" && (
                  <p className="text-xs text-blue-500">
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
                  <p className="text-xs font-semibold text-blue-500">
                    <span className="text-red-600">
                      {blade.bladeRelationId}
                    </span>
                  </p>
                )}
              </div>
            </div>
            {type === "Service" && (
              <Link href="/search">
                <div
                  onClick={() =>
                    setIdValue(
                      customer
                        ? blade.bladeRelationId.slice(3)
                        : blade.bladeRelationId,
                    )
                  }
                  className="ml-5 mt-3 flex h-5 min-w-10  items-center justify-center rounded-xl border border-primary bg-base-100 p-1 px-5 text-xs text-primary hover:bg-primary hover:text-base-100 hover:transition-all"
                >
                  <p>{type}</p>
                </div>
              </Link>
            )}
            {type === "Handling" && (
              <Link href="/search">
                <div
                  onClick={() =>
                    setIdValue(
                      customer
                        ? blade.bladeRelationId.slice(3)
                        : blade.bladeRelationId,
                    )
                  }
                  className="ml-5 mt-3 flex h-5 min-w-10  items-center justify-center rounded-xl border border-primary bg-base-100 p-1 px-5 text-xs text-primary hover:bg-primary hover:text-base-100 hover:transition-all"
                >
                  <p>{type}</p>
                </div>
              </Link>
            )}
            {type === "Slettet" && (
              <Link href="/search">
                <div
                  onClick={() =>
                    setIdValue(
                      customer ? blade.IdNummer.slice(3) : blade.IdNummer,
                    )
                  }
                  className="ml-5 mt-3 flex h-5 min-w-10  items-center justify-center rounded-xl border border-primary bg-base-100 p-1 px-5 text-xs text-primary hover:bg-primary hover:text-base-100 hover:transition-all"
                >
                  <p>{type}</p>
                </div>
              </Link>
            )}
            {type === "Nye" && (
              <Link href="/search">
                <div
                  onClick={() =>
                    setIdValue(
                      customer ? blade.IdNummer.slice(3) : blade.IdNummer,
                    )
                  }
                  className="ml-5 mt-3 flex h-5 min-w-10  items-center justify-center rounded-xl border border-primary bg-base-100 p-1 px-5 text-xs text-primary hover:bg-primary hover:text-base-100 hover:transition-all"
                >
                  <p>{type}</p>
                </div>
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ActivityDisplayComponent;
