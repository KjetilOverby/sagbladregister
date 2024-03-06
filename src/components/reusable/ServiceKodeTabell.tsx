import React from "react";

const ServiceKodeTabell = () => {
  return (
    <div>
      <table className="table table-xs ml-5 w-full bg-base-100 shadow-xl">
        <thead>
          <tr className="border-none">
            <th className="px-5  text-lg">Kode</th>
            <th className="px-5  text-lg">Beskrivelse</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-none">
            <th>SERV 764</th>
            <th>HELOMLODDING HM</th>
          </tr>
          <tr className="border-none">
            <th>SERV 401</th>
            <th>SLIP HM/STELLITSAGBLAD Ø 0-600mm inntil 36t</th>
          </tr>
          <tr className="border-none">
            <th>SERV 402</th>
            <th>SLIP HM/STELLITSAGBLAD Ø 0-610mm f.o.m. 36t</th>
          </tr>
          <tr className="border-none">
            <th>SERV 403</th>
            <th>SLIP HM/STELLITE Ø 650/850mm. Inkl. retting og strekking</th>
          </tr>
          <tr className="border-none">
            <th>SERV 404</th>
            <th>
              SLIP HM/STELLITBLAD Ø 900/1250mm. Inkl. retting og strekking
            </th>
          </tr>
          <tr className="border-none">
            <th>SERV 405</th>
            <th>SLIP KANTVERKSBLAD,MELLOMSKJÆRENDE- OG FORSKJÆRENDE RINGER</th>
          </tr>
          <tr className="border-none">
            <th>SERV 406</th>
            <th>SLIP HM/STELLIT PUSSRING</th>
          </tr>
          {/*         <tr className="border-none">
            <th>SERV 407</th>
            <th>LODDING HM Ø 0-610mm</th>
          </tr>
          <tr className="border-none">
            <th>SERV 409</th>
            <th>LODDING HM Ø 610 - 1250mm</th>
          </tr>
          <tr className="border-none">
            <th>SERV 410</th>
            <th>LODDING HM-PUSSRINGER</th>
          </tr>
          <tr className="border-none">
            <th>SERV 411</th>
            <th>SVEISING TOPPBRUDD</th>
          </tr>
          <tr className="border-none">
            <th>SERV 412</th>
            <th>SVEISING TANNBRUDD</th>
          </tr>
          <tr className="border-none">
            <th>SERV 415</th>
            <th>LODDING STELLIT Ø 0-610mm</th>
          </tr>
          <tr className="border-none">
            <th>SERV 416</th>
            <th>LODDING STELLIT Ø 610 - 1250mm</th>
          </tr>
          <tr className="border-none">
            <th>SERV 417</th>
            <th>LODDING STELLIT PUSSRING</th>
          </tr>
          <tr className="border-none">
            <th>SERV 418</th>
            <th>SLIP SPONROM</th>
          </tr>
          <tr className="border-none">
            <th>SERV 419</th>
            <th>SLIPING STEGTANN</th>
          </tr>
          <tr className="border-none">
            <th>SERV 423</th>
            <th>EKSTRA RETTING</th>
          </tr>
          <tr className="border-none">
            <th>SERV 423</th>
            <th>RENGJØRING</th>
          </tr>
          <tr className="border-none">
            <th>SERV 434</th>
            <th>Slip-rett-strekk. Over- og underliggende tømmersagblad</th>
          </tr> */}
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
