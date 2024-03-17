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
import DatepickerComponent from "../reusable/Datepicker";

const AdminContent = ({
  newblades,
  deletedblades,
  servicepost,
  servicepostKS,
  dateValue,
  setDateValue,
  servicepostUpdate,
}) => {
  const countService = servicepostKS?.filter((item) => item.creator3).length;
  return (
    <>
      <div className="min-h-screen bg-base-100 px-96 pb-10 pt-24">
        <div className="w-[30rem]">
          <img
            className="w-full"
            src="https://lh3.googleusercontent.com/pw/AP1GczMo3DXbcGsHswgE46n36BzYht6UoYpKSmSMDpFaUbCELeYtF3GDlAB-CWY7zfrkXoyl24nz36eznGZ51KoSsAmXfwOfUDWYNE_NfzlrHR-EZ3cLoM-7_Ewpq1xRZ6Z9US-1YMmJqDK33sYJPxUPWY7f=w1920-h317-s-no?authuser=0"
            alt=""
          />
        </div>

        <div className="mt-10">
          <div className="w-96">
            <DatepickerComponent
              setDateValue={setDateValue}
              dateValue={dateValue}
            />
          </div>
          <p className="text-gray-500">Aktivitet i gitt periode</p>
          <div>
            <h1 className="my-3 font-bold text-gray-500">
              Blad lagt til: ({newblades?.length})
            </h1>
            {newblades && newblades.length > 0 ? (
              newblades.map((blade) => {
                return (
                  <div>
                    <ul>
                      <div className="mb-2 flex items-center">
                        <img
                          className="mr-3 w-5 rounded-full"
                          src={blade.creatorImg}
                          alt=""
                        />
                        <li className="text-xs text-gray-500">
                          {dateFormat(blade.createdAt, "dd.mm.yyyy, HH:MM")} -{" "}
                          <span className="text-blue-500">{blade.creator}</span>{" "}
                          har lagt til{" "}
                          <span className="text-red-500">
                            {blade.type} {blade.side}
                          </span>{" "}
                          , produsent:{" "}
                          <span className="text-blue-600">
                            {blade.produsent}
                          </span>{" "}
                          for{" "}
                          <span className="text-purple-500">{blade.kunde}</span>
                          , id nr:{" "}
                          <span className="text-green-600">
                            {blade.IdNummer}
                          </span>
                        </li>
                      </div>
                    </ul>
                  </div>
                );
              })
            ) : (
              <p className="text-xs italic text-gray-500">
                Ingen aktivitet i perioden.
              </p>
            )}
          </div>
          <div>
            <h1 className="mb-3 mt-10 font-bold text-gray-500">
              Blad slettet: ({deletedblades?.length})
            </h1>
            {deletedblades && deletedblades.length > 0 ? (
              deletedblades.map((blade) => {
                return (
                  <div>
                    <ul>
                      <div className="mb-2 flex items-center">
                        <img
                          className="mr-3 w-5 rounded-full"
                          src={blade.deleterImg}
                          alt=""
                        />
                        <li className="text-xs text-gray-500">
                          {dateFormat(blade.updatedAt, "dd.mm.yyyy, HH:MM")} -{" "}
                          <span className="text-blue-500">{blade.deleter}</span>{" "}
                          har slettet{" "}
                          <span className="text-red-500">
                            {blade.type} {blade.side}
                          </span>
                          . Sletteårsak:
                          <span className="text-orange-500">
                            {" "}
                            {blade.deleteReason},{" "}
                          </span>
                          for{" "}
                          <span className="text-purple-500">{blade.kunde}</span>
                          , id nr:{" "}
                          <span className="text-green-600">
                            {blade.IdNummer}
                          </span>
                        </li>
                      </div>
                    </ul>
                  </div>
                );
              })
            ) : (
              <p className="text-xs italic text-gray-500">
                Ingen aktivitet i perioden.
              </p>
            )}
          </div>
          <div>
            <h1 className="mb-3 mt-10 font-bold text-gray-500">
              Serviceposter: ({servicepost?.length})
            </h1>
            {servicepost && servicepost.length > 0 ? (
              servicepost.map((blade) => {
                return (
                  <div>
                    <ul>
                      <div className="mb-2 flex items-center">
                        <img
                          className="mr-3 w-5 rounded-full"
                          src={blade.creatorImg}
                          alt=""
                        />
                        <li className="text-xs text-gray-500">
                          {dateFormat(blade.createdAt, "dd.mm.yyyy, HH:MM")} -{" "}
                          <span className="text-blue-500">
                            {" "}
                            {blade.creator}
                          </span>{" "}
                          har lagt til servicepost for{" "}
                          <span className="text-red-500">
                            {blade.bladType} {blade.side}
                          </span>{" "}
                          med service: ,{" "}
                          <span className="text-orange-600">
                            {blade.service}
                          </span>{" "}
                          {blade.anmSag && (
                            <>
                              Kommentar:{" "}
                              <span className="text-blue-600">
                                {" "}
                                ({blade.anmSag})
                              </span>
                            </>
                          )}
                          , og id nummer:{" "}
                          <span className="text-green-600">
                            {blade.bladeRelationId}
                          </span>
                        </li>
                      </div>
                    </ul>
                  </div>
                );
              })
            ) : (
              <p className="text-xs italic text-gray-500">
                Ingen aktivitet i perioden.
              </p>
            )}
          </div>
          <div>
            <h1 className="mb-3 mt-10 font-bold text-gray-500">
              Serviceposter endret: ({servicepostUpdate?.length})
            </h1>
            {servicepostUpdate && servicepostUpdate.length > 0 ? (
              servicepostUpdate.map((blade) => {
                return (
                  <div>
                    <ul>
                      <div className="mb-2 flex items-center">
                        <img
                          className="mr-3 w-5 rounded-full"
                          src={blade.creatorImg2}
                          alt=""
                        />
                        <li className="text-xs text-gray-500">
                          {dateFormat(blade.updatedAt, "dd.mm.yyyy, HH:MM")} -{" "}
                          <span className="text-blue-500">
                            {" "}
                            {blade.sgSag ? blade.sgSag : blade.creator2}
                          </span>{" "}
                          har endret servicepost for{" "}
                          <span className="text-red-500">
                            {blade.bladType} {blade.side}
                          </span>{" "}
                          med service:{" "}
                          <span className="text-orange-600">
                            {blade.service}
                          </span>{" "}
                          ,{" "}
                          {blade.anmSag && (
                            <>
                              Kommentar:{" "}
                              <span className="text-blue-600">
                                {" "}
                                ({blade.anmSag})
                              </span>
                              ,{" "}
                            </>
                          )}
                          id nummer:{" "}
                          <span className="text-green-600">
                            {blade.bladeRelationId}
                          </span>
                        </li>
                      </div>
                    </ul>
                  </div>
                );
              })
            ) : (
              <p className="text-xs italic text-gray-500">
                Ingen aktivitet i perioden.
              </p>
            )}
          </div>
          <div>
            <h1 className="mb-3 mt-10 font-bold text-gray-500">
              Handling Kvarnstrands & Stridsbergs: ({countService})
            </h1>
            {servicepostKS && servicepostKS.length > 0 ? (
              servicepostKS.map((blade) => {
                return (
                  <div>
                    <ul>
                      <div className="mb-2 flex items-center">
                        {blade.creator3 && (
                          <>
                            <img
                              className="mr-3 w-5 rounded-full"
                              src={blade.creatorImg3}
                              alt=""
                            />
                            <li className="text-xs text-gray-500">
                              {dateFormat(blade.datoSrv, "dd.mm.yyyy, HH:MM")} -{" "}
                              <span className="text-blue-500">
                                {blade.sgKS ? blade.sgKS : blade.creator3}
                              </span>{" "}
                              har lagt til handling for{" "}
                              <span className="text-red-500">
                                {blade.bladType} {blade.side}
                              </span>
                              , kode:{" "}
                              <span className="text-orange-600">
                                {blade.handling}
                              </span>
                              ,{" "}
                              {blade.anmKS && (
                                <>
                                  Kommentar:{" "}
                                  <span className="text-blue-600">
                                    {" "}
                                    ({blade.anmKS})
                                  </span>
                                  ,{" "}
                                </>
                              )}{" "}
                              id nummer:{" "}
                              <span className="text-green-500">
                                {blade.bladeRelationId}
                              </span>
                            </li>
                          </>
                        )}
                      </div>
                    </ul>
                  </div>
                );
              })
            ) : (
              <p className="text-xs italic text-gray-500">
                Ingen aktivitet i perioden.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminContent;
