/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useState, useEffect } from "react";
import DatepickerComponent from "~/components/reusable/Datepicker";
import HeaderComponent from "~/components/reusable/HeaderComponent";
import SearchMain from "~/components/search/SearchMain";
import { api } from "~/utils/api";
import { signIn, signOut, useSession } from "next-auth/react";
import NotAuthorized from "~/components/reusable/NotAuthorized";
import RoleAdmin from "~/components/roles/RoleAdmin";
import RoleAdminMV from "~/components/roles/RoleAdminMV";
import dateFormat from "dateformat";
import RoleAdminMT from "~/components/roles/RoleAdminMT";
import { FaCircleInfo } from "react-icons/fa6";
import InfoComponent from "~/components/search/InfoComponent";

const Search = ({ theme }) => {
  const [closeSearchComponent, setCloseSearchComponent] = useState(false);
  const { data: sessionData } = useSession();
  const [dateValue, setDateValue] = useState({
    endDate: dateFormat(new Date(), "yyyy-mm-dd"),
    startDate: dateFormat(new Date(), "yyyy-mm-dd"),
  });
  const [idValue, setIdValue] = useState("");
  const [openInfoModal, setOpenInfoModal] = useState(false);

  const [customerInit, setCustomerInit] = useState("");

  useEffect(() => {
    if (sessionData?.user.role === "MV_ADMIN") {
      setCustomerInit("MV-");
    } else if (sessionData?.user.role === "MT_ADMIN") {
      setCustomerInit("MT-");
    }
  }, [sessionData]);

  const { data: countAllBlades } = api.sawblades.countAllBlades.useQuery({});
  const { data: countAllBladesCustomers } =
    api.sawblades.countAllBladesCustomer.useQuery({
      init: customerInit,
    });

  const { data: sawblades } = api.sawblades.getAll.useQuery({
    IdNummer: idValue,
  });
  const { data: sawbladesService } = api.sawblades.getAllService.useQuery({});

  const { data: deletedSawblades } = api.sawblades.getAllDeleted.useQuery({
    date: `${dateValue.endDate}T23:59:59.000Z`,
    date2: `${dateValue.startDate}T00:00:00.000Z`,
  });

  const { data: sawbladeslActive } = api.sawblades.getActive.useQuery({
    date: `${dateValue.endDate}T23:59:59.000Z`,
    date2: `${dateValue.startDate}T00:00:00.000Z`,
    IdNummer: idValue,
    init: "",
  });

  // **************** CUSTOMERS ****************** //

  const { data: sawbladesCustomer } = api.sawblades.getCustomer.useQuery({
    IdNummer: idValue,
    init: customerInit,
  });

  const { data: sawbladesCustomerDeleted } =
    api.sawblades.getCustomerAllDeleted.useQuery({
      date: `${dateValue.endDate}T23:59:59.000Z`,
      date2: `${dateValue.startDate}T00:00:00.000Z`,

      init: customerInit,
    });
  const { data: sawbladesCustomerActive } =
    api.sawblades.getCustomerActive.useQuery({
      init: customerInit,
    });

  return (
    <div data-theme={theme}>
      {sessionData?.user.role === "ADMIN" ||
      sessionData?.user.role === "MV_ADMIN" ||
      sessionData?.user.role === "MT_ADMIN" ? (
        <>
          <HeaderComponent />

          <div className="mx-20 min-h-screen max-2xl:w-screen max-xl:m-0">
            <div className="my-5 rounded-xl bg-primary pl-5">
              {!closeSearchComponent ? (
                <div className="flex flex-col py-5">
                  <div className="flex">
                    <label className="mr-5">Søk</label>
                    <input
                      value={idValue}
                      onChange={(e) => setIdValue(e.currentTarget.value)}
                      type="text"
                      placeholder="Skriv id nummer"
                      className="input input-bordered input-xs  w-28 max-w-xs bg-base-100"
                    />
                    <RoleAdmin>
                      <div className="relative">
                        <FaCircleInfo
                          onMouseOver={() => setOpenInfoModal(true)}
                          onMouseOut={() => setOpenInfoModal(false)}
                          className="ml-5 text-lg text-info"
                        />
                        {openInfoModal && (
                          <InfoComponent
                            title="Id nummer"
                            text="Id nummer for Kunder skrives kundebokstavene først. For Moelven Våler er det MV- foran id nummeret, se liste over kunder lenger ned. For Kanefusa blader for Moelven Våler, etter MV- skrives de to første som er et tall og en bokstav. Deretter brukes de 6 siste sifrene eks: "
                            span="MV-8D410120"
                            bg="bg-info"
                            listTitle="Start betegnelse for kunder:"
                            list={["Moelven Våler: MV-", "Moelven Trysil: MT-"]}
                          />
                        )}
                      </div>
                    </RoleAdmin>
                  </div>
                  {sessionData?.user.role === "ADMIN" && (
                    <p className="mt-5 text-sm">
                      Antall blad i bruk: {countAllBlades?.notDeleted}
                    </p>
                  )}
                  {sessionData?.user.role === "MV_ADMIN" && (
                    <p className="mt-5 text-sm">
                      Antall blad i bruk: {countAllBladesCustomers?.notDeleted}
                    </p>
                  )}
                  {sessionData?.user.role === "MT_ADMIN" && (
                    <p className="mt-5 text-sm">
                      Antall blad i bruk: {countAllBladesCustomers?.notDeleted}
                    </p>
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
            <RoleAdmin>
              <SearchMain
                sawblades={sawblades}
                deletedSawblades={deletedSawblades}
                activeBlades={sawbladeslActive}
                closeSearchComponent={closeSearchComponent}
                setCloseSearchComponent={setCloseSearchComponent}
                dateValue={dateValue}
                setDateValue={setDateValue}
                sawbladesService={sawbladesService}
              />
            </RoleAdmin>

            <RoleAdminMV>
              <SearchMain
                sawblades={sawbladesCustomer}
                deletedSawblades={sawbladesCustomerDeleted}
                sawbladesService={sawbladesCustomerActive}
                closeSearchComponent={closeSearchComponent}
                setCloseSearchComponent={setCloseSearchComponent}
                dateValue={dateValue}
                setDateValue={setDateValue}
              />
            </RoleAdminMV>
            <RoleAdminMT>
              <SearchMain
                sawblades={sawbladesCustomer}
                deletedSawblades={sawbladesCustomerDeleted}
                sawbladesService={sawbladesCustomerActive}
                closeSearchComponent={closeSearchComponent}
                setCloseSearchComponent={setCloseSearchComponent}
                dateValue={dateValue}
                setDateValue={setDateValue}
              />
            </RoleAdminMT>
          </div>
        </>
      ) : (
        <NotAuthorized />
      )}
    </div>
  );
};

export default Search;
