/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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

export const TypeInputMV = ({
  bladeData,
  setBladeData,
  articleTypes,
}: bladeDataProps) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBladeData({ ...bladeData, type: e.currentTarget.value });
  };
  return (
    <div>
      <select
        onChange={onChangeHandler}
        className="select select-xs border-accent bg-blue-100 text-xs text-black"
      >
        <option disabled selected>
          Velg bladtype
        </option>

        {articleTypes?.map((item, index) => (
          <option key={index} value={item.blade}>
            {item.blade}
          </option>
        ))}
      </select>
    </div>
  );
};
