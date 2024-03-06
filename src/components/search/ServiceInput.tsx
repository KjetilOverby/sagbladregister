/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";

const ServiceInput = ({ setHistorikkData, historikkData }) => {
  return (
    <div>
      <p>service:</p>
      <select
        onChange={(e) =>
          setHistorikkData({
            ...historikkData,
            service: e.currentTarget.value,
          })
        }
        value={historikkData.service}
        className="select select-bordered select-xs w-full max-w-xs bg-white"
      >
        <option value="">Velg service</option>
        <option value="Omlodding">Omlodding</option>
        <option value="Sliping">Sliping</option>
        <option value="Reparasjon">Reparasjon</option>
        <option value="Reklamasjon">Reklamasjon</option>
      </select>
    </div>
  );
};

export default ServiceInput;
