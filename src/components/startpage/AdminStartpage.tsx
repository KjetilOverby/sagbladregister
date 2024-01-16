import React from "react";
import HeaderComponent from "../reusable/HeaderComponent";
import AdminContent from "./AdminContent";

const AdminStartpage = () => {
  return (
    <div data-theme="lightmode" className="min-h-screen bg-base-100">
      <HeaderComponent />
      <AdminContent />
    </div>
  );
};

export default AdminStartpage;
