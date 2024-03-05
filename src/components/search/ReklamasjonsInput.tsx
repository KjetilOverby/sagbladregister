import React from "react";

const ReklamasjonsInput = ({ setHistorikkData, historikkData }) => {
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
        className="select select-bordered select-xs w-full max-w-xs bg-white"
      >
        <option value="">Velg årsak</option>
        <option value="Tannslipp">Tannslipp</option>
        <option value="Dårlig lodd">Dårlig lodd</option>
        <option value="Manglende sideslip">Manglende sideslip</option>
      </select>
    </div>
  );
};

export default ReklamasjonsInput;
