import React from "react";
import HeaderComponent from "../reusable/HeaderComponent";
import AdminContent from "./AdminContent";

interface adminProps {
  theme: string;
}

const AdminStartpage = ({ theme }: adminProps) => {
  return (
    <div data-theme={theme} className="min-h-screen bg-base-100">
      <HeaderComponent />
      <AdminContent />
    </div>
  );
};

export default AdminStartpage;
