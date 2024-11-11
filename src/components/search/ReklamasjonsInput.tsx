/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";

const ReklamasjonsInput = ({ setHistorikkData, historikkData, theme }) => {
  return (
    <div>
      <p>Årsak:</p>
      <select
        onChange={(e) =>
          setHistorikkData({
            ...historikkData,
            feilkode: e.currentTarget.value,
          })
        }
        className={`select select-bordered select-xs w-full max-w-xs bg-white ${theme === "darkmode" ? "text-neutral" : "text-neutral"}`}
      >
        <option value="">Velg årsak</option>
        <option value="Tannslipp">Tannslipp</option>
        <option value="Dårlig lodd">Dårlig lodd</option>
        <option value="Manglende sideslip">Manglende sideslip</option>
        <option value="Dårlig retting">Dårlig retting</option>
      </select>
    </div>
  );
};

export default ReklamasjonsInput;
