/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useEffect, useState } from "react";

import { CSVLink } from "react-csv";
import Papa from "papaparse";
import { api } from "~/utils/api";
import { PrismaClient } from "@prisma/client";

const FilbehandlingMain = ({ sawblades }) => {
  const prisma = new PrismaClient();
  const [sawbladesData, setSawbladesData] = useState([]);
  const [importedData, setImportedData] = useState([]);

  const saveImportedSawbladeData = api.sawblades.createManyBlades.useMutation({
    onSuccess: () => {
      void ctx.sawblades.getAll.invalidate();
      void ctx.sawblades.getCustomer.invalidate();
    },
  });
  useEffect(() => {
    // eslint-disable-next-line prefer-const
    let data = [];
    sawblades?.forEach((item) => {
      let object = {
        id: item.id,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        kunde: item.kunde,
        type: item.type,
        IdNummer: item.IdNummer,
        createdBy: item.createdBy,
        createdById: item.createdById,
        userId: item.userId,
        creator: item.creator,
        creatorImg: item.creatorImg,
        deleted: item.deleted,
        note: item.note,
        side: item.side,
        active: item.active,
        deleteReason: item.deleteReason,
        produsent: item.produsent,
        deleter: item.deleter,
        deleterImg: item.deleterImg,
      };
      data.push(object);
    });
    setSawbladesData(data);
  }, [sawblades]);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setImportedData(results.data);
      },
    });
  };

  //   const saveData = async () => {
  //     const response = await prisma.sawblade.createMany({
  //       data: importedData.map((item) => ({
  //         kunde: item.kunde,
  //         type: item.type,
  //         IdNummer: item.IdNummer,
  //         note: item.note,
  //         side: item.side,
  //         produsent: item.produsent,
  //       })),
  //     });
  //   };

  console.log(importedData);

  return (
    <div>
      <div className="card w-96 bg-primary text-primary-content">
        <div className="card-body">
          <h2 className="card-title">Bandsagblad</h2>
          <p>Last ned registrerte bandsagblad.</p>
          <div className="card-actions justify-end">
            <CSVLink
              data={sawbladesData}
              filename="Sawblades.csv"
              className="btn btn-neutral"
            >
              Download
            </CSVLink>
          </div>
        </div>
      </div>
      <div className="card w-96 bg-primary text-primary-content">
        <div className="card-body">
          <h2 className="card-title">Bandsagblad</h2>
          <p>Last ned registrerte bandsagblad.</p>
          <div>
            <input
              style={{ background: "seagreen" }}
              type="file"
              accept=".csv"
              onChange={handleUpload}
            />
          </div>
        </div>
        {/* <button onClick={saveData}>Save Data</button> */}
      </div>
    </div>
  );
};

export default FilbehandlingMain;
