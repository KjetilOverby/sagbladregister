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
import ActivityDisplayComponent from "./ActivityDisplayComponent";
import StorageUsage from "./StorageUsage";
import MemoryUsage from "./MemoryUsage";

const AdminContent = ({
  newblades,
  deletedblades,
  servicepost,
  servicepostKS,
  dateValue,
  setDateValue,
  servicepostUpdate,
  setIdValue,
  tables,
  queryStats,
}) => {
  const handlingType = servicepostKS?.filter((item) => item.handling !== "");
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
      <div className="min-h-screen bg-base-100 pb-10 pt-5 md:px-20 2xl:px-96">
        <StorageUsage tables={tables} />
        <MemoryUsage tables={queryStats} />
        <div className="">
          <div className="w-96">
            <DatepickerComponent
              setDateValue={setDateValue}
              dateValue={dateValue}
            />
          </div>
          <p className="text-xs text-neutral">Aktivitet i gitt periode</p>
          <ActivityDisplayComponent
            displaydata={servicepost}
            title="Serviceposter"
            type="Service"
            setIdValue={setIdValue}
            customer={false}
          />
          <ActivityDisplayComponent
            displaydata={newblades}
            title="Nye blad"
            type="Nye"
            setIdValue={setIdValue}
            customer={false}
          />
          <ActivityDisplayComponent
            displaydata={deletedblades}
            title="Slettede blad"
            type="Slettet"
            setIdValue={setIdValue}
            customer={false}
          />
          <ActivityDisplayComponent
            displaydata={handlingType}
            title="Handling"
            type="Handling"
            setIdValue={setIdValue}
            customer={false}
          />
        </div>
      </div>
    </>
  );
};

export default AdminContent;
