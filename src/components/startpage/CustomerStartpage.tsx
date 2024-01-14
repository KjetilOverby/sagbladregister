import React from "react";
import HeaderComponent from "../reusable/HeaderComponent";
import CustomerContent from "./CustomerContent";

const CustomerStartpage = () => {
  return (
    <div data-theme="darkmode" className="bg-base-100 min-h-screen">
      <HeaderComponent />
      <CustomerContent />
    </div>
  );
};

export default CustomerStartpage;
