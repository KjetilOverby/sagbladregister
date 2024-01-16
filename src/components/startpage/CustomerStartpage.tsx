import React from "react";
import HeaderComponent from "../reusable/HeaderComponent";
import CustomerContent from "./CustomerContent";

const CustomerStartpage = () => {
  return (
    <div data-theme="lightmode" className="min-h-screen bg-base-100">
      <HeaderComponent />
      <CustomerContent />
    </div>
  );
};

export default CustomerStartpage;
