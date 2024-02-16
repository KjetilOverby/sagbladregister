import React from "react";

const ServiceKodeTabell = () => {
  return (
    <div>
      <table className="table table-xs ml-5 w-full border border-primary bg-base-100  py-5">
        <thead>
          <tr className="border border-primary">
            <th className="itay-5 px-5  text-lg">Kode</th>
            <th className="itay-5 px-5  text-lg">Beskrivelse</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border border-primary">
            <th>SERV 764</th>
            <th>HELOMLODDING HM</th>
          </tr>
          <tr className="border border-primary">
            <th>SERV 402</th>
            <th>SLIP HM/STELLITBLAD</th>
          </tr>
          <tr className="border border-primary">
            <th>SERV 407</th>
            <th>LODDING HM</th>
          </tr>
          <tr className="border border-primary">
            <th>SERV 411</th>
            <th>SVEISING TOPPBRUDD</th>
          </tr>
          <tr className="border border-primary">
            <th>SERV 427</th>
            <th>RENGJØRING</th>
          </tr>
          <tr>
            <th>REKLAMASJON</th>
            <th>REKLAMASJON</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ServiceKodeTabell;
