import { Dispatch, SetStateAction } from "react";

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
    }>
  >;
}

export const KundeSelector = ({ bladeData, setBladeData }: bladeDataProps) => {
  return (
    <div>
      <select
        onChange={(e) =>
          setBladeData({ ...bladeData, kunde: e.currentTarget.value })
        }
        className="select select-xs border-accent bg-yellow-100  text-xs text-black"
      >
        <option disabled selected>
          Velg kunde
        </option>
        <option value="Moelven Våler">Moelven Våler</option>
        <option value="Moelven Trysil">Moelven Trysil</option>
        {/* <option value="Moelven Soknabruket">Moelven Soknabruket</option>
        <option value="Moelven Mjøsbruket">Moelven Mjøsbruket</option> */}
      </select>
    </div>
  );
};
