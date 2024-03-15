/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState, useEffect } from "react";
import FilterTable from "./FilterTable";
import HeaderComponent from "~/components/reusable/HeaderComponent";
import { api } from "~/utils/api";
import { CSVLink } from "react-csv";
import dateFormat from "dateformat";
import DatepickerComponent from "~/components/reusable/Datepicker";
import Checkbox from "./Checkbox";

interface Props {
  theme: string;
}

const Filter = ({ theme }: Props) => {
  const [sawbladesData, setSawbladesData] = useState();
  const [historikkData, setHistorikkData] = useState([]);

  const [sawbladeColumns, setSawbladeColumns] = useState({
    id: false,
    createdAt: false,
    updatedAt: false,
    kunde: false,
    type: false,
    IdNummer: true,
    createdById: false,
    userId: false,
    creator: false,
    creatorImg: false,
    deleted: false,
    note: false,
    side: false,
    active: false,
    deleteReason: false,
    produsent: false,
    deleter: false,
    deleterImg: false,
    artikkel: false,
  });
  const [historikkColumns, setHistorikkColumns] = useState({
    id: false,
    historikkId: false,
    createdAt: false,
    updatedAt: false,
    userId: false,
    service: false,
    datoInn: false,
    klInn: false,
    datoUt: false,
    klUt: false,
    ampere: false,
    feilkode: false,
    sideklaring: false,
    anmSag: false,
    temperatur: false,
    creator: false,
    userId: false,
    sagtid: false,
    sgSag: false,
    anmKS: false,
    handling: false,
    datoSrv: false,
    sgKS: false,
    creatorImg: false,
    side: false,
    bladType: false,
    activePost: false,
    bladeRelationId: true,
    alt: false,
    creator2: false,
    creatorImg2: false,
    creator3: false,
    creatorImg3: false,
    stokkAnt: false,
    antRep: false,
    antTannslipp: false,
  });

  const [dateValue, setDateValue] = useState({
    endDate: dateFormat(new Date(), "yyyy-mm-dd"),
    startDate: dateFormat(new Date(), "yyyy-mm-dd"),
  });

  const [fetchData, setFetchData] = useState(false);
  const { data: sawblades } = api.sawblades?.columns.useQuery({
    ...sawbladeColumns,
    date: `${dateValue.endDate}T23:59:59.000Z`,
    date2: `${dateValue.startDate}T00:00:00.000Z`,
  });
  const { data: historikk } = api.bandhistorikk?.columns.useQuery({
    ...historikkColumns,
    date: `${dateValue.endDate}T23:59:59.000Z`,
    date2: `${dateValue.startDate}T00:00:00.000Z`,
  });

  const [openToggle, setOpenToggle] = useState(true);
  const [openBandsag, setOpenBandsag] = useState(false);
  const [openHistorikk, setOpenHistorikk] = useState(false);

  const [openList, setOpenList] = useState(false);

  const openBandsagHandler = () => {
    setOpenBandsag(!openBandsag);
    setOpenHistorikk(false);
  };
  const openHistorikkHandler = () => {
    setOpenHistorikk(!openHistorikk);
    setOpenBandsag(false);
  };

  useEffect(() => {
    // eslint-disable-next-line prefer-const

    const data = sawblades?.map((item) => {
      const object = {
        id: item.id,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        kunde: item.kunde,
        type: item.type,
        IdNummer: item.IdNummer,
        createdBy: item.createdBy,
        createdById: item.createdById,
        userId: item.userId,
        creator: item.creator,
        creatorImg: item.creatorImg,
        deleted: item.deleted,
        note: item.note,
        side: item.side,
        active: item.active,
        deleteReason: item.deleteReason,
        produsent: item.produsent,
        deleter: item.deleter,
        deleterImg: item.deleterImg,
        artikkel: item.artikkel,
      };
      Object.keys(object).forEach(
        (key) => object[key] == null && delete object[key],
      );
      return object;
    });
    setSawbladesData(data);
  }, [sawblades]);

  useEffect(() => {
    const data = historikk?.map((item) => {
      const object = {
        id: item.id,
        historikkId: item.historikkId,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        userId: item.userId,
        service: item.sagNr,
        datoInn: item.datoInn,
        klInn: item.klInn,
        klUt: item.klUt,
        datoUt: item.datoUt,
        ampere: item.ampere,
        feilkode: item.feilkode,
        sideklaring: item.sideklaring,
        anmSag: item.anmSag,
        temperatur: item.temperatur,
        creator: item.creator,
        userId: item.userId,
        sagtid: item.sagtid,
        sgSag: item.sgSag,
        anmKS: item.anmKS,
        handling: item.handling,
        datoSrv: item.datoSrv,
        sgKS: item.sgKS,
        creatorImg: item.creatorImg,
        side: item.side,
        bladType: item.bladType,
        activePost: item.activePost,
        bladeRelationId: item.bladeRelationId,
        alt: item.alt,
        creator2: item.creator2,
        creatorImg2: item.creatorImg2,
        creator3: item.creator3,
        creatorImg3: item.creatorImg3,
        stokkAnt: item.stokkAnt,
        antRep: item.antRep,
        antTannslipp: item.antTannslipp,
      };
      // Filter out properties with null or undefined values
      Object.keys(object).forEach(
        (key) => object[key] == null && delete object[key],
      );
      return object;
    });
    setHistorikkData(data);
  }, [historikk]);

  return (
    <div data-theme={theme} className="min-h-screen">
      <HeaderComponent />
      <div className="mx-96">
        <h1 className="my-10 text-xl">Avanserte søk og filtrering av data</h1>
        <p>Velg tidsperiode</p>
        <div className="shadow-xl">
          <DatepickerComponent
            setDateValue={setDateValue}
            dateValue={dateValue}
          />
          {openList && (
            <p>
              Hvis ingen data vises kan det være at du ikke har noe på valgt
              tidsperiode.
            </p>
          )}
        </div>
        {openList && (
          <div className="mt-5">
            <button
              onClick={() => window.location.reload()}
              className="btn bg-green-500 text-white hover:bg-green-600"
            >
              Nytt søk
            </button>
          </div>
        )}
        {!openList && (
          <div>
            <button
              onClick={openBandsagHandler}
              className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600"
            >
              Båndsagblad
            </button>
            <button
              onClick={openHistorikkHandler}
              className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600"
            >
              Historikk
            </button>
          </div>
        )}
      </div>
      <div className="mx-96">
        {openBandsag && (
          <div className="mt-10">
            <div className="flex">
              {!openList && (
                <button
                  className="btn mb-5 mr-5 bg-blue-500 text-white hover:bg-blue-600"
                  onClick={() => {
                    if (Object.values(sawbladeColumns).some((value) => value)) {
                      setFetchData(true);
                      setOpenToggle(false);
                      setOpenList(true);
                    } else {
                      alert("Velg minst en kolonne!");
                    }
                  }}
                >
                  Hent data
                </button>
              )}
              <div className="card-actions mb-5 justify-end">
                {sawbladesData && openList && (
                  <CSVLink
                    data={sawbladesData}
                    filename="Bandsagblad.csv"
                    className="btn btn-neutral"
                  >
                    Download
                  </CSVLink>
                )}
              </div>
            </div>
            {openToggle && (
              <div>
                <Checkbox
                  sawbladeColumns={sawbladeColumns}
                  setSawbladeColumns={setSawbladeColumns}
                  title="Båndsagblad"
                />
              </div>
            )}
            <div className="overflow-scroll">
              {fetchData && <FilterTable data={sawblades && sawblades} />}
            </div>
          </div>
        )}
      </div>
      <div className="mx-96">
        {openHistorikk && (
          <div className="mt-10 ">
            <div className="flex">
              {!openList && (
                <button
                  className="btn  mb-5 mr-5 bg-blue-500 text-white hover:bg-blue-600"
                  onClick={() => {
                    if (
                      Object.values(historikkColumns).some((value) => value)
                    ) {
                      setFetchData(true);
                      setOpenToggle(false);
                      setOpenList(true);
                    } else {
                      alert("Velg minst en kolonne!");
                    }
                  }}
                >
                  Hent data historikk
                </button>
              )}
              <div className="card-actions mb-5">
                {sawbladesData && openList && (
                  <CSVLink
                    data={historikkData}
                    filename="Historikk.csv"
                    className="btn btn-neutral"
                  >
                    Download
                  </CSVLink>
                )}
              </div>
            </div>
            {openToggle && (
              <div>
                <Checkbox
                  sawbladeColumns={historikkColumns}
                  setSawbladeColumns={setHistorikkColumns}
                  title="Historikk"
                />
              </div>
            )}
            <div className="overflow-scroll">
              {fetchData && <FilterTable data={historikk && historikk} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
