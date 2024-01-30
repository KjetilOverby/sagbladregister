"use client";

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

export const NewInputComponent = ({
  bladeData,
  setBladeData,
}: bladeDataProps) => {
  return (
    <div>
      <select
        onChange={(e) =>
          setBladeData({ ...bladeData, type: e.currentTarget.value })
        }
        className="select select-sm border-neutral bg-accent text-lg text-neutral"
      >
        <option disabled selected>
          Velg bladtype
        </option>

        <option value="MKV 2.2-3.3 445 36z">MKV 2.2-3.3 445 36z</option>
        <option value="MKV 2.4-3.8 445 36z">MKV 2.4-3.8 445 36z</option>
        <option value="MKV 2.6-4.0 445 36z">MKV 2.6-4.0 445 36z</option>
        <option value="MKV 2.8-4.2 445 36z">MKV 2.8-4.2 445 36z</option>
        <option value="MKV 3.0-4.4 445 36z">MKV 3.0-4.4 445 36z</option>
        <option value="MKV 3.2-4.6 510 36z">MKV 3.2-4.6 445 36z</option>
        <option value="VS66 N 3,2-4,8 475">VS66 N 3,2-4,8 475</option>
        <option value="VS66 3,6-5,0 475 27z">VS66 3,6-5,0 475 27z</option>
        <option value="VS66 3,6-5,0 475 24z Flens">
          VS66 3,6-5,0 475 24z Flens
        </option>
        <option value="Trimmer JV 4,0/2,8 500 96z">
          Trimmer JV 4,0/2,8 500 96z
        </option>
        <option value="Eksakt JV 3.5/2,5 400 80z">
          Eksakt JV 3.5/2,5 400 80z
        </option>
        <option value="Endekapp JV 4.4/3.3 610 96z">
          Endekapp JV 4.4/3.3 610 96z
        </option>
        <option value="Trimmer RS 4.0-2.8 450">Trimmer RS 4.0-2.8 450</option>
      </select>
    </div>
  );
};
