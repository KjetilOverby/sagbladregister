/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import DatepickerComponent from "../reusable/Datepicker";
import dateFormat from "dateformat";
import ActivityDisplayComponent from "./ActivityDisplayComponent";

const CustomerContent = ({
  newblades,
  dateValue,
  setDateValue,
  deletedblades,
  servicepost,
  servicepostUpdate,
  servicepostKS,
  oppstartsDato,
  setIdValue,
}) => {
  const handlingType = servicepostKS?.filter(
    (item: ServicePost) => item.handling !== "",
  );
  return (
    <>
      <div className="relative h-64 w-full">
        <div className="bg-image absolute inset-0 bg-cover bg-center bg-no-repeat"></div>
        <div className="relative z-10 flex h-full w-full items-center justify-center">
          <h1 className="text-4xl text-white">Aktivitetslogg</h1>
        </div>
        <style>
          {`
           .bg-image {
             background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1)),url('https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');}
          `}
        </style>
      </div>
      <div className="min-h-screen bg-base-100 pb-10 pt-10 md:px-20 2xl:px-96">
        <h1 className="text-neutral">
          Oppstart database for Moelven Våler:{" "}
          {dateFormat(oppstartsDato, "dd.mm.yyyy")}
        </h1>

        <div className="mt-3 p-1">
          <div className="w-96">
            <DatepickerComponent
              setDateValue={setDateValue}
              dateValue={dateValue}
            />
          </div>
          <p className="text-neutral">Aktivitet i gitt periode</p>
          <ActivityDisplayComponent
            displaydata={servicepost}
            title="Serviceposter"
            type="Service"
            setIdValue={setIdValue}
            customer={true}
          />
          <ActivityDisplayComponent
            displaydata={newblades}
            title="Nye blad"
            type="Nye"
            setIdValue={setIdValue}
            customer={true}
          />
          <ActivityDisplayComponent
            displaydata={deletedblades}
            title="Slettede blad"
            type="Slettet"
            setIdValue={setIdValue}
            customer={true}
          />
          <ActivityDisplayComponent
            displaydata={handlingType}
            title="Handling"
            type="Handling"
            setIdValue={setIdValue}
            customer={true}
          />
        </div>
      </div>
    </>
  );
};

export default CustomerContent;
