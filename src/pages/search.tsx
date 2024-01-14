// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState } from "react";
import DatepickerComponent from "~/components/reusable/Datepicker";
import HeaderComponent from "~/components/reusable/HeaderComponent";
import SearchMain from "~/components/search/SearchMain";
import { api } from "~/utils/api";

const Search = () => {
  const [dateValue, setDateValue] = useState({
    endDate: "2040-01-14",
    startDate: "2023-12-01",
  });
  const [idValue, setIdValue] = useState("");

  const { data: sawblades } = api.sawblades.getAll.useQuery({
    date: `${dateValue.endDate}T23:59:59.000Z`,
    date2: `${dateValue.startDate}T00:00:00.000Z`,
    IdNummer: idValue,
  });

  const { data: deletedSawblades } = api.sawblades.getAllDeleted.useQuery({
    date: `${dateValue.endDate}T23:59:59.000Z`,
    date2: `${dateValue.startDate}T00:00:00.000Z`,
    IdNummer: idValue,
  });
  return (
    <div data-theme="darkmode">
      <HeaderComponent />
      <div className="m-5">
        <div className="bg-accent mb-5 w-96 rounded-xl p-5">
          <DatepickerComponent
            setDateValue={setDateValue}
            dateValue={dateValue}
          />
          <div className="flex flex-col">
            <label>Søk</label>
            <input
              onChange={(e) => setIdValue(e.currentTarget.value)}
              type="text"
              placeholder="Skriv id nummer"
              className="input input-bordered input-xs bg-accent w-full max-w-xs"
            />
          </div>
        </div>
        <SearchMain sawblades={sawblades} deletedSawblades={deletedSawblades} />
      </div>
    </div>
  );
};

export default Search;
