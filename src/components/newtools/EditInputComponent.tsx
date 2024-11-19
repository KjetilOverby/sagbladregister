/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState } from "react";
import theme from "tailwindcss/defaultTheme";

const EditInputComponent = ({
  editSawblade,
  blade,
  openEditHandler,
  title,
  theme,
}) => {
  const [editInputVal, setEditInputVal] = useState({
    IdNummer: blade.IdNummer,
    type: blade.type,
    deleted: blade.deleted,
    note: blade.note,
    kunde: blade.kunde,
    side: blade.side,
    active: blade.active,
    deleteReason: blade.deleteReason,
    produsent: blade.produsent,
    artikkel: blade.artikkel,
  });

  return (
    <div
      className={`absolute   z-[100] mt-5 w-96 rounded-xl ${theme === "darkmode" ? "bg-primary" : "bg-neutral"} p-5 text-gray-200 shadow-xl`}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();

          void editSawblade.mutate({
            id: blade.id,
            IdNummer: editInputVal.IdNummer,
            type: editInputVal.type,
            deleted: editInputVal.deleted,
            note: editInputVal.note,
            kunde: editInputVal.kunde,
            side: editInputVal.side,
            active: Boolean(editInputVal.active),
            deleteReason: editInputVal.deleteReason,
            produsent: editInputVal.produsent,

            artikkel: "",
          });
          openEditHandler(null);
        }}
      >
        <div className="mb-5 flex flex-col">
          <h2 className="mb-5 font-bold">Rediger: {title}</h2>
          <label className="text-xs font-bold text-gray-200">Id nummer: </label>
          <input
            onChange={(e) =>
              setEditInputVal({
                ...editInputVal,
                IdNummer: e.currentTarget.value,
              })
            }
            type="text"
            className={`input input-bordered input-sm  max-w-xs bg-white ${theme === "darkmode" ? "text-primary" : "text-neutral"} `}
            value={editInputVal.IdNummer}
          />
        </div>
        <div className="mb-5 flex flex-col">
          <label className="text-xs font-bold text-gray-200">Notat: </label>
          <input
            onChange={(e) =>
              setEditInputVal({ ...editInputVal, note: e.currentTarget.value })
            }
            type="text"
            className={`input input-bordered input-sm max-w-xs bg-white ${theme === "darkmode" ? "text-primary" : "text-neutral"} `}
            value={editInputVal.note}
          />
        </div>
        <div>
          <p className="text-xs font-bold">Produsent:</p>
          <select
            onChange={(e) =>
              setEditInputVal({
                ...editInputVal,
                produsent: e.currentTarget.value,
              })
            }
            className={`select select-bordered select-sm mb-5 w-full max-w-xs bg-white ${theme === "darkmode" ? "text-primary" : "text-neutral"}`}
            value={editInputVal.produsent}
          >
            <option value="Kanefusa">Kanefusa</option>
            <option value="Tenryu">Tenryu</option>
            <option value="Swedex">Swedex</option>
            <option value="Nässjö">Nässjö</option>
            <option value="Aspi">Aspi</option>
            <option value="Nook">Nook</option>
            <option value="Micor">Micor</option>
            <option value="Frezite">Frezite</option>
            <option value="Ukjent">Ukjent</option>
          </select>
        </div>
        <div>
          <p className="text-xs font-bold">Kunde:</p>
          <select
            onChange={(e) =>
              setEditInputVal({
                ...editInputVal,
                kunde: e.currentTarget.value,
              })
            }
            className={`select select-bordered select-sm mb-5 w-full max-w-xs bg-white ${theme === "darkmode" ? "text-primary" : "text-neutral"}`}
            value={editInputVal.kunde}
          >
            <option value="">Velg kunde</option>
            <option value="Moelven Våler">Moelven Våler</option>
            <option value="Moelven Trysil">Moelven Trysil</option>
          </select>
        </div>
        <div>
          <p className="text-xs font-bold">Service:</p>
          <select
            onChange={(e) =>
              setEditInputVal({
                ...editInputVal,
                active: e.currentTarget.value,
              })
            }
            className={`select select-bordered select-sm mb-5 w-full max-w-xs bg-white ${theme === "darkmode" ? "text-primary" : "text-neutral"}`}
            // value={Boolean(editInputVal.active)}
          >
            <option value="">Velg</option>
            <option value={true}>Aktiver service</option>
            <option value="">Deaktiver service</option>
          </select>
        </div>
        <div className="mt-5">
          <button
            className={`btn btn-sm ${theme === "darkmode" ? "bg-primary" : "bg-neutral"} mr-5 text-gray-200`}
            text-white
            type="submit"
          >
            Oppdater
          </button>
          <button
            onClick={() => openEditHandler(null)}
            className="btn btn-sm bg-info text-white"
          >
            Avbryt
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditInputComponent;
