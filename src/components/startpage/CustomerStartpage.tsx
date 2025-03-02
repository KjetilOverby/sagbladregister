/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import HeaderComponent from "../reusable/HeaderComponent";
import CustomerContent from "./CustomerContent";

const CustomerStartpage = ({
  newblades,
  dateValue,
  setDateValue,
  deletedblades,
  servicepost,
  servicepostUpdate,
  servicepostKS,
  oppstartsDato,
  theme,
  setIdValue,
}) => {
  return (
    <div data-theme={theme} className="min-h-screen bg-base-100">
      <HeaderComponent />

      <CustomerContent
        dateValue={dateValue}
        setDateValue={setDateValue}
        newblades={newblades}
        deletedblades={deletedblades}
        servicepost={servicepost}
        servicepostUpdate={servicepostUpdate}
        servicepostKS={servicepostKS}
        oppstartsDato={oppstartsDato}
        setIdValue={setIdValue}
      />
    </div>
  );
};

export default CustomerStartpage;
