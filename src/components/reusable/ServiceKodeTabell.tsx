/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from "react";
import ServiceKodeTblMT from "../search/CustomersInit/mt/ServiceKodeTblMT";
import ServiceKodeTblMV from "../search/CustomersInit/mv/ServiceKodeTblMV";

const ServiceKodeTabell = ({ bladeInit }: { bladeInit: string[] }) => {
  console.log(bladeInit);

  return (
    <div>
      <table className="table table-xs ml-5 w-full bg-base-100 shadow-xl">
        <thead>
          <tr className="border-none">
            <th className="px-5  text-xs">Kode</th>
            <th className="px-5  text-xs">Beskrivelse</th>
          </tr>
        </thead>
        <tbody>
          {bladeInit.includes("MT-") && <ServiceKodeTblMT />}
          {bladeInit.includes("MV-") && <ServiceKodeTblMV />}
          {/* 
          
         
          
         
          <tr className="border-none">
            <th className="font-thin">SERV 401</th>
            <th className="font-thin">
              SLIP HM/STELLITSAGBLAD Ø 0-600mm inntil 36t
            </th>
          </tr>
         
        
        
         
          <tr className="border-none">
            <th className="font-thin">SERV 406</th>
            <th className="font-thin">SLIP HM/STELLIT PUSSRING</th>
          </tr>
       
         
          <tr className="border-none">
            <th className="font-thin">SERV 410</th>
            <th className="font-thin">LODDING HM-PUSSRINGER</th>
          </tr>
         
        
          <tr className="border-none">
            <th className="font-thin">SERV 415</th>
            <th className="font-thin">LODDING STELLIT Ø 0-610mm</th>
          </tr>
          <tr className="border-none">
            <th className="font-thin">SERV 416</th>
            <th className="font-thin">LODDING STELLIT Ø 610 - 1250mm</th>
          </tr>
          <tr className="border-none">
            <th className="font-thin">SERV 417</th>
            <th className="font-thin">LODDING STELLIT PUSSRING</th>
          </tr>
        
        
         
          
          <tr className="border-none">
            <th className="font-thin">SERV 434</th>
            <th className="font-thin">
              Slip-rett-strekk. Over- og underliggende tømmersagblad
            </th>
          </tr>
          */}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceKodeTabell;
