import React from "react";
import HeaderComponent from "../reusable/HeaderComponent";
import AdminContent from "./AdminContent";

const AdminStartpage = () => {
  return (
    <div data-theme="darkmode" className="bg-base-100 min-h-screen">
      <HeaderComponent />
      <AdminContent />
    </div>
  );
};

export default AdminStartpage;
