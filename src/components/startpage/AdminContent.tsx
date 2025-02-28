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
import DatepickerComponent from "../reusable/Datepicker";
import ActivityDisplayComponent from "./activity/ActivityDisplayComponent";

const AdminContent = ({
  newblades,
  deletedblades,
  servicepost,
  servicepostKS,
  dateValue,
  setDateValue,
  servicepostUpdate,
}) => {
  const handlingType = servicepostKS?.filter((item) => item.handling !== "");

  return (
    <>
      <div className="min-h-screen bg-base-100 pb-10 pt-24 md:px-20 2xl:px-96">
        <div className="md:w-[30rem]">
          <img
            className="w-full"
            src="https://lh3.googleusercontent.com/pw/AP1GczMl2BWtf6-zh2g4uWGl4naDJ87x01pfcRvMNy21LlElrQVqWdSt9MtQAUfa-6nfeexrJGbcSln4ULat4QzkDp1rPGTJJkVy2MBHsUaqhCInScxCnhVUA4ZvR7wl-YlfpmviKWTvLPdU61V2Gx8Tz9sD=w1920-h196-s-no?authuser=0"
            alt=""
          />
        </div>

        <div className="mt-10 p-1">
          <div className="w-96">
            <DatepickerComponent
              setDateValue={setDateValue}
              dateValue={dateValue}
            />
          </div>
          <p className="text-xs text-neutral">Aktivitet i gitt periode</p>
          <ActivityDisplayComponent
            title="Blad lagt til"
            displaydata={newblades}
            type="Nye"
          />
          <ActivityDisplayComponent
            title="Blad slettet"
            displaydata={deletedblades}
            type="Slettet"
          />
          <ActivityDisplayComponent
            title="Serviceposter"
            displaydata={servicepost}
            type="Service"
          />

          <ActivityDisplayComponent
            title="Handling"
            displaydata={handlingType}
            type="Handling"
          />
        </div>
      </div>
    </>
  );
};

export default AdminContent;
