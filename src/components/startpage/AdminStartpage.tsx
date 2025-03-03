/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import HeaderComponent from "../reusable/HeaderComponent";
import AdminContent from "./AdminContent";

interface adminProps {
  theme: string;
}

const AdminStartpage = ({
  theme,
  newblades,
  deletedblades,
  servicepost,
  servicepostKS,
  dateValue,
  setDateValue,
  servicepostUpdate,
  setIdValue,
  tables,
}: adminProps) => {
  return (
    <div data-theme={theme} className="min-h-screen bg-base-100">
      <HeaderComponent />
      <AdminContent
        newblades={newblades}
        deletedblades={deletedblades}
        servicepost={servicepost}
        servicepostKS={servicepostKS}
        dateValue={dateValue}
        setDateValue={setDateValue}
        servicepostUpdate={servicepostUpdate}
        setIdValue={setIdValue}
        tables={tables}
      />
    </div>
  );
};

export default AdminStartpage;
