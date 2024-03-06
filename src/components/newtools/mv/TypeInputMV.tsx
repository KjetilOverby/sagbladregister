import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface bladeDataProps {
  bladeData: {
    type: string;
    IdNummer: string;
    note: string;
    deleted: boolean;
    kunde: string;
    side: string;
    active: boolean;
    deleteReason: string;
    produsent: string;
    artikkel: string;
  };
  setBladeData: Dispatch<
    SetStateAction<{
      type: string;
      IdNummer: string;
      deleted: boolean;
      note: string;
      kunde: string;
      side: string;
      active: boolean;
      deleteReason: string;
      produsent: string;
      artikkel: string;
    }>
  >;
}

export const TypeInputMV = ({ bladeData, setBladeData }: bladeDataProps) => {
  const [inputVal, setInputVal] = useState("");

  const onChangeHandler = (e) => {
    setBladeData({ ...bladeData, type: e.currentTarget.value });
    setInputVal(e.currentTarget.value);
  };

  /*   useEffect(() => {
    if (inputVal === "445/210 2.2-3.4 z36 MKV") {
      setBladeData({ ...bladeData, artikkel: "V-SH9495" });
    } else if (inputVal === "445/210 2.4-3.6 z36 MKV") {
      setBladeData({ ...bladeData, artikkel: "V-SH9502" });
    } else if (inputVal === "445/210 2.6-4.0 z36 MKV") {
      setBladeData({ ...bladeData, artikkel: "V-SH9505" });
    } else if (inputVal === "445/210 2.8-4.2 z36 MKV") {
      setBladeData({ ...bladeData, artikkel: "V-SH9496" });
    } else if (inputVal === "445/210 3.0-4.4 z36 MKV") {
      setBladeData({ ...bladeData, artikkel: "V-SH9528" });
    } else if (inputVal === "505/210 3.2-4.6 z36 MKV") {
      setBladeData({ ...bladeData, artikkel: "V-SH9745" });
    } else if (inputVal === "505/210 3.2-4.6 z36 MKV") {
      setBladeData({ ...bladeData, artikkel: "V-SH9745" });
    }
  }, [inputVal]); */

  return (
    <div>
      <select
        onChange={onChangeHandler}
        className="select select-sm border-neutral bg-accent text-lg text-neutral"
      >
        <option disabled selected>
          Velg bladtype
        </option>

        <option value="445/210 2.2-3.4 z36 MKV">445/210 2.2-3.4 z36 MKV</option>
        <option value="445/210 2.4-3.6 z36 MKV">445/210 2.4-3.6 z36 MKV</option>
        <option value="445/210 2.6-4.0 z36 MKV">445/210 2.6-4.0 z36 MKV</option>
        <option value="445/210 2.8-4.2 z36 MKV">445/210 2.8-4.2 z36 MKV</option>
        <option value="445/210 3.0-4.4 z36 MKV">445/210 3.0-4.4 z36 MKV</option>
        <option value="505/210 3.2-4.6 z36 MKV">505/210 3.2-4.6 z36 MKV</option>
        <option value="475/120 3.2-4.8 z30 VS66">
          475/120 3.2-4.8 z30 N-blad VS66
        </option>
        <option value="475/120 3.6-5.0 z24 VS66">
          475/120 3.6-5.0 z24 VS66
        </option>
        <option value="475/120 3.6-5.0 z24 flens VS66">
          475/120 3.6-5.0 z24 flens VS66
        </option>
        <option value="500/30 2.8-4.0 z96 JV Trimmer">
          500/30 2.8-4.0 z96 JV Trimmer
        </option>
        <option value="400/30 2.5-3.5 z80 JV Eksakt">
          400/30 2.5-3.5 z80 JV Eksakt
        </option>
        <option value="400/30 3.3-4.4 z96 JV Endekapp">
          400/30 3.3-4.4 z96 JV Endekapp
        </option>
        <option value="450/35 2.8-4.0 z72 RS Trimmer">
          450/35 2.8-4.0 z72 RS Trimmer
        </option>
      </select>
    </div>
  );
};
