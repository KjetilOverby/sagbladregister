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
import RoleAdmin from "~/components/roles/RoleAdmin";
import RoleAdminMV from "~/components/roles/RoleAdminMV";
import { signIn, signOut, useSession } from "next-auth/react";

interface Props {
  theme: string;
}

const Filter = ({ theme }: Props) => {
  const { data: sessionData } = useSession();
  const [sawbladesData, setSawbladesData] = useState();
  const [historikkData, setHistorikkData] = useState();

  const [sortByType, setSortByType] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [customerInit, setCustomerInit] = useState("");

  useEffect(() => {
    if (sessionData?.user.role === "MV_ADMIN") {
      setCustomerInit("MV-");
    } else if (sessionData?.user.role === "MT_ADMIN") {
      setCustomerInit("MT-");
    }
  }, [sessionData]);

  const [sawbladeColumns, setSawbladeColumns] = useState({
    id: false,
    createdAt: true,
    updatedAt: true,
    kunde: false,
    type: true,
    IdNummer: true,
    createdById: false,
    userId: false,
    creator: false,
    creatorImg: false,
    deleted: true,
    note: true,
    side: true,
    active: false,
    deleteReason: true,
    produsent: true,
    deleter: false,
    deleterImg: false,
    artikkel: false,
  });
  const [historikkColumns, setHistorikkColumns] = useState({
    id: false,
    historikkId: false,
    createdAt: true,
    updatedAt: true,
    userId: false,
    service: true,
    datoInn: false,
    klInn: false,
    datoUt: false,
    klUt: false,
    ampere: false,
    feilkode: true,
    sideklaring: false,
    anmSag: true,
    temperatur: false,
    creator: true,
    userId: false,
    sagtid: false,
    sgSag: false,
    anmKS: true,
    handling: true,
    datoSrv: false,
    sgKS: false,
    creatorImg: false,
    side: true,
    bladType: true,
    activePost: false,
    bladeRelationId: true,
    alt: false,
    creator2: false,
    creatorImg2: false,
    creator3: false,
    creatorImg3: false,
    stokkAnt: false,
    antRep: true,
    antTannslipp: true,
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
    orderBy: {
      field: sortByType,
      direction: sortOrder,
    },
  });

  const { data: sawbladesCustomer } = api.sawblades?.columnsCustomer.useQuery({
    ...sawbladeColumns,
    date: `${dateValue.endDate}T23:59:59.000Z`,
    date2: `${dateValue.startDate}T00:00:00.000Z`,
    orderBy: {
      field: sortByType,
      direction: sortOrder,
    },
    init: customerInit,
  });

  const { data: historikk } = api.bandhistorikk?.columns.useQuery({
    ...historikkColumns,
    date: `${dateValue.endDate}T23:59:59.000Z`,
    date2: `${dateValue.startDate}T00:00:00.000Z`,
    orderBy: {
      field: sortByType,
      direction: sortOrder,
    },
  });

  const { data: historikkCustomer } =
    api.bandhistorikk?.columnsCustomer.useQuery({
      ...historikkColumns,
      date: `${dateValue.endDate}T23:59:59.000Z`,
      date2: `${dateValue.startDate}T00:00:00.000Z`,
      orderBy: {
        field: sortByType,
        direction: sortOrder,
      },
      init: customerInit,
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
      <div className="mx-10 ">
        <h1 className="my-10 text-xl">Avanserte søk og filtrering av data</h1>
        <p>Velg tidsperiode</p>
        <div className="mb-5 rounded-xl border border-primary p-5">
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
              className="btn btn-sm bg-success text-white hover:bg-green-600"
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
              Sagblad
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
      <div className="mx-10 ">
        {openBandsag && (
          <div className="mt-10 ">
            <div className="mb-10 flex w-40 ">
              <div className="mr-10">
                <label>Sorter etter:</label>
                <select
                  className="bg-primary"
                  value={sortByType}
                  onChange={(e) => setSortByType(e.target.value)}
                >
                  <option value="#">Velg sortering</option>
                  <option value="createdAt">Opprettet</option>
                  <option value="updatedAt">Oppdatert</option>
                  <option value="kunde">Kunde</option>
                  <option value="type">Bladtype</option>
                  <option value="IdNummer">ID nummer</option>
                  <option value="creator">Creator</option>
                  <option value="deleted">Slettet</option>
                  <option value="note">Notat</option>
                  <option value="side">Side</option>
                  <option value="deleteReason">Sletteårsak</option>
                  <option value="produsent">Produsent</option>
                  <option value="deleter">Slettet av</option>
                </select>
              </div>
              <div className=" flex w-40 flex-col">
                <label>Rekkefølge:</label>
                <select
                  className="bg-primary"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="#">Velg rekkefølge</option>
                  <option value="asc">Stigende</option>
                  <option value="desc">Synkende</option>
                </select>
              </div>
            </div>

            <div className="flex ">
              {!openList && (
                <button
                  className="btn btn-sm mb-5 mr-5 bg-blue-500 text-white hover:bg-blue-600"
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
              <div className="card-actions mb-5 flex flex-col justify-end">
                {sawbladesData && openList && (
                  <>
                    <label className="text-neutral">Last ned CSV fil </label>
                    <CSVLink
                      data={sawbladesData}
                      filename="Bandsagblad.csv"
                      className="btn btn-warning btn-sm"
                    >
                      Download
                    </CSVLink>
                  </>
                )}
              </div>
            </div>
            {openToggle && (
              <div>
                <Checkbox
                  sawbladeColumns={sawbladeColumns}
                  setSawbladeColumns={setSawbladeColumns}
                  title="Sagblad"
                />
              </div>
            )}
            <div className="overflow-scroll">
              <RoleAdmin>
                {fetchData && (
                  <FilterTable
                    data={sawblades && sawblades}
                    setSortByType={setSortByType}
                    sortByType={sortByType}
                  />
                )}
              </RoleAdmin>
              <RoleAdminMV>
                {fetchData && (
                  <FilterTable
                    data={sawbladesCustomer && sawbladesCustomer}
                    setSortByType={setSortByType}
                    sortByType={sortByType}
                  />
                )}
              </RoleAdminMV>
            </div>
          </div>
        )}
      </div>
      <div className="mx-10">
        {openHistorikk && (
          <div className="mt-10 ">
            <div className="mb-10 flex w-40 ">
              <div className="mr-10">
                <label>Sorter etter:</label>
                <select
                  className="bg-primary"
                  value={sortByType}
                  onChange={(e) => setSortByType(e.target.value)}
                >
                  <option value="#">Velg sortering</option>
                  <option value="createdAt">Opprettet</option>
                  <option value="updatedAt">Oppdatert</option>
                  <option value="service">Service</option>
                  <option value="feilkode">Servicetype</option>
                  <option value="anmSag">Anm sag</option>
                  <option value="creator">Creator</option>
                  <option value="anmKS">Anm KS</option>
                  <option value="handling">Handling</option>
                  <option value="side">Side</option>
                  <option value="bladType">Blad type</option>
                  <option value="bladeRelationId">ID nummer</option>
                  <option value="antRep">Antall rep</option>
                  <option value="antTannslipp">Antall tannslipp</option>
                </select>
              </div>
              <div className=" flex w-40 flex-col">
                <label>Rekkefølge:</label>
                <select
                  className="bg-primary"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="#">Velg rekkefølge</option>
                  <option value="asc">Stigende</option>
                  <option value="desc">Synkende</option>
                </select>
              </div>
            </div>
            <div className="flex">
              {!openList && (
                <button
                  className="btn btn-sm  mb-5 mr-5 bg-blue-500 text-white hover:bg-blue-600"
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
              <div className="card-actions mb-5 flex flex-col">
                {historikkData && openList && (
                  <>
                    <label className="text-neutral">Last ned CSV fil </label>
                    <CSVLink
                      data={historikkData}
                      filename="Historikk.csv"
                      className="btn btn-warning btn-sm"
                    >
                      Download
                    </CSVLink>
                  </>
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
              <RoleAdmin>
                {fetchData && (
                  <FilterTable
                    setSortByType={setSortByType}
                    data={historikk && historikk}
                  />
                )}
              </RoleAdmin>
              <RoleAdminMV>
                {fetchData && (
                  <FilterTable
                    setSortByType={setSortByType}
                    data={historikkCustomer && historikkCustomer}
                  />
                )}
              </RoleAdminMV>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
