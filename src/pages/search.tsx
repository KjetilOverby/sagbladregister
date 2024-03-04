/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useState } from "react";
import DatepickerComponent from "~/components/reusable/Datepicker";
import HeaderComponent from "~/components/reusable/HeaderComponent";
import SearchMain from "~/components/search/SearchMain";
import { api } from "~/utils/api";
import { signIn, signOut, useSession } from "next-auth/react";
import NotAuthorized from "~/components/reusable/NotAuthorized";
import RoleAdmin from "~/components/roles/RoleAdmin";
import RoleAdminMV from "~/components/roles/RoleAdminMV";
import dateFormat from "dateformat";

const Search = ({ theme }) => {
  const [closeSearchComponent, setCloseSearchComponent] = useState(false);
  const { data: sessionData } = useSession();
  const [dateValue, setDateValue] = useState({
    endDate: dateFormat(new Date(), "yyyy-mm-dd"),
    startDate: dateFormat(new Date(), "yyyy-mm-dd"),
  });
  const [idValue, setIdValue] = useState("");

  const { data: countAllBlades } = api.sawblades.countAllBlades.useQuery({});

  const { data: sawblades } = api.sawblades.getAll.useQuery({
    IdNummer: idValue,
  });

  const { data: deletedSawblades } = api.sawblades.getAllDeleted.useQuery({
    date: `${dateValue.endDate}T23:59:59.000Z`,
    date2: `${dateValue.startDate}T00:00:00.000Z`,
    IdNummer: idValue,
  });

  const { data: sawbladeslActive } = api.sawblades.getActive.useQuery({
    date: `${dateValue.endDate}T23:59:59.000Z`,
    date2: `${dateValue.startDate}T00:00:00.000Z`,
    IdNummer: idValue,
    init: "MØ",
  });

  const { data: sawbladesOsterdal } = api.sawblades.getCustomer.useQuery({
    date: `${dateValue.endDate}T23:59:59.000Z`,
    date2: `${dateValue.startDate}T00:00:00.000Z`,
    IdNummer: idValue,
    init: "MØ",
  });
  const { data: sawbladesOsterdalDeleted } =
    api.sawblades.getCustomerAllDeleted.useQuery({
      date: `${dateValue.endDate}T23:59:59.000Z`,
      date2: `${dateValue.startDate}T00:00:00.000Z`,
      IdNummer: idValue,
      init: "MØ",
    });
  const { data: sawbladesOsterdalActive } =
    api.sawblades.getCustomerActive.useQuery({
      date: `${dateValue.endDate}T23:59:59.000Z`,
      date2: `${dateValue.startDate}T00:00:00.000Z`,
      IdNummer: idValue,
      init: "MØ",
    });

  return (
    <div data-theme={theme}>
      {sessionData?.user.role === "ADMIN" ||
      sessionData?.user.role === "MV_ADMIN" ? (
        <>
          <HeaderComponent />

          <div className="mx-20 min-h-screen max-2xl:w-screen max-xl:m-0">
            <div className="rounded-xl bg-base-100">
              {!closeSearchComponent ? (
                <div className="flex flex-col py-5">
                  <label>Søk</label>
                  <input
                    value={idValue}
                    onChange={(e) => setIdValue(e.currentTarget.value)}
                    type="text"
                    placeholder="Skriv id nummer"
                    className="input input-bordered input-xs  w-28 max-w-xs bg-base-100"
                  />
                  <p className="mt-5 text-sm">
                    Antall blad i bruk: {countAllBlades?.notDeleted}
                  </p>
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
              />
            </RoleAdmin>

            <RoleAdminMV>
              <SearchMain
                sawblades={sawbladesOsterdal}
                deletedSawblades={sawbladesOsterdalDeleted}
                activeBlades={sawbladesOsterdalActive}
                closeSearchComponent={closeSearchComponent}
                setCloseSearchComponent={setCloseSearchComponent}
                dateValue={dateValue}
                setDateValue={setDateValue}
              />
            </RoleAdminMV>
          </div>
        </>
      ) : (
        <NotAuthorized />
      )}
    </div>
  );
};

export default Search;
