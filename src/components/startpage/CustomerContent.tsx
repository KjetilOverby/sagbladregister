/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import ActivityNewblades from "./activity/ActivityNewblades";
import DatepickerComponent from "../reusable/Datepicker";
import ActivityDelete from "./activity/ActivityDelete";
import ActivityServiceCreate from "./activity/ActivityServiceCreate";
import ActivityServiceEdit from "./ActivityServiceEdit";
import ActivityHandling from "./activity/ActivityHandling";
import dateFormat from "dateformat";

const CustomerContent = ({
  newblades,
  dateValue,
  setDateValue,
  deletedblades,
  servicepost,
  servicepostUpdate,
  servicepostKS,
  oppstartsDato,
}) => {
  return (
    <>
      <div className="min-h-screen bg-base-100 pb-10 pt-24 md:px-20 2xl:px-96">
        <div className="md:w-[30rem]">
          <img
            className="w-full"
            src="https://lh3.googleusercontent.com/pw/AP1GczMo3DXbcGsHswgE46n36BzYht6UoYpKSmSMDpFaUbCELeYtF3GDlAB-CWY7zfrkXoyl24nz36eznGZ51KoSsAmXfwOfUDWYNE_NfzlrHR-EZ3cLoM-7_Ewpq1xRZ6Z9US-1YMmJqDK33sYJPxUPWY7f=w1920-h317-s-no?authuser=0"
            alt=""
          />
        </div>
        <h1 className="text-gray-400">
          Oppstart database for Moelven Våler:{" "}
          {dateFormat(oppstartsDato, "dd.mm.yyyy")}
        </h1>

        <div className="mt-10 p-1">
          <div className="w-96 shadow-lg">
            <DatepickerComponent
              setDateValue={setDateValue}
              dateValue={dateValue}
            />
          </div>
          <p className="text-gray-500">Aktivitet i gitt periode</p>
          <ActivityNewblades newblades={newblades} />
          <ActivityDelete deletedblades={deletedblades} />
          <ActivityServiceCreate servicepost={servicepost} />
          <ActivityServiceEdit servicepostUpdate={servicepostUpdate} />
          <ActivityHandling servicepostKS={servicepostKS} />
        </div>
      </div>
    </>
  );
};

export default CustomerContent;
