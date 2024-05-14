/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState } from "react";

const EditInputComponent = ({ editSawblade, blade, openEditHandler }) => {
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

  console.log(editInputVal.active);

  return (
    <div className="mt-5">
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
          <label className="text-gray-600">Id nummer: </label>
          <input
            onChange={(e) =>
              setEditInputVal({
                ...editInputVal,
                IdNummer: e.currentTarget.value,
              })
            }
            type="text mb-5"
            className="input input-bordered input-xs  max-w-xs bg-white"
            value={editInputVal.IdNummer}
          />
        </div>
        <div className="mb-5 flex flex-col">
          <label className="text-gray-600">Notat: </label>
          <input
            onChange={(e) =>
              setEditInputVal({ ...editInputVal, note: e.currentTarget.value })
            }
            type="text"
            className="input input-bordered input-xs  max-w-xs bg-white"
            value={editInputVal.note}
          />
        </div>
        <div>
          <p>Produsent:</p>
          <select
            onChange={(e) =>
              setEditInputVal({
                ...editInputVal,
                produsent: e.currentTarget.value,
              })
            }
            className="select select-bordered select-xs mb-5 w-full max-w-xs bg-white"
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
          <p>Kunde:</p>
          <select
            onChange={(e) =>
              setEditInputVal({
                ...editInputVal,
                kunde: e.currentTarget.value,
              })
            }
            className="select select-bordered select-xs mb-5 w-full max-w-xs bg-white"
            value={editInputVal.kunde}
          >
            <option value="">Velg kunde</option>
            <option value="Moelven Våler">Moelven Våler</option>
            <option value="Moelven Trysil">Moelven Trysil</option>
          </select>
        </div>
        <div>
          <p>Service:</p>
          <select
            onChange={(e) =>
              setEditInputVal({
                ...editInputVal,
                active: e.currentTarget.value,
              })
            }
            className="select select-bordered select-xs mb-5 w-full max-w-xs bg-white"
            value={Boolean(editInputVal.active)}
          >
            <option value="">Velg</option>
            <option value={true}>Aktiver service</option>
            <option value={false}>Deaktiver service</option>
          </select>
        </div>
        <div className="mt-5">
          <button className="btn btn-xs bg-success text-white" type="submit">
            Oppdater
          </button>
          <button
            onClick={() => openEditHandler(null)}
            className="btn btn-xs bg-info text-white"
          >
            Avbryt
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditInputComponent;
