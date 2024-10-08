/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import mvArticleTypes from "~/appdata/mvArticleTypes";
import RoleAdminMV from "../roles/RoleAdminMV";

const OverviewTable = ({ count }) => {
  if (!count) {
    return null; // or return a loading indicator, or some other placeholder
  }

  // Define custom counts for each type and side
  // Create customCounts object
  const customCounts = mvArticleTypes.reduce((acc, item) => {
    if (Array.isArray(item.art)) {
      item.art.forEach((art, index) => {
        const side = Array.isArray(item.side) ? item.side[index] : item.side;
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        const key = `${item.blade}${side || ""}`; // Include side in key
        acc[key] = item.minAnt;
      });
    } else {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/prefer-nullish-coalescing
      const key = `${item.blade}${item.side || ""}`; // Include side in key
      acc[key] = item.minAnt;
    }
    return acc;
  }, {});

  console.log(customCounts);

  // Group items by type and side
  const groupedItems = count.reduce((acc, item) => {
    const key = `${item.type}${item.side}`;
    if (!acc[key]) {
      acc[key] = {
        type: item.type,
        side: item.side,
        deletedCount: 0,
        nonDeletedCount: 0,
        totalCount: 0,
        customCount: customCounts[key] || 0,
      };
    }
    if (item.deleted) {
      acc[key].deletedCount += item._count;
    } else {
      acc[key].nonDeletedCount += item._count;
    }
    acc[key].totalCount += item._count;
    return acc;
  }, {});

  // Convert the grouped items object to an array
  const itemsArray = Object.values(groupedItems);

  // Calculate the sums for each column
  const nonDeletedSum = itemsArray.reduce(
    (sum, item) => sum + item.nonDeletedCount,
    0,
  );
  const deletedSum = itemsArray.reduce(
    (sum, item) => sum + item.deletedCount,
    0,
  );
  const totalSum = itemsArray.reduce((sum, item) => sum + item.totalCount, 0);

  // Calculate the difference for each item
  itemsArray.forEach((item) => {
    item.difference = item.nonDeletedCount - item.customCount;
  });

  // Filter the items with a negative difference
  const negativeItems = itemsArray.filter((item) => item.difference < 0);

  return (
    <div>
      <table className="table-xs mt-10 md:table">
        <thead>
          <tr className="md:text-md border border-b-accent border-l-base-100 border-r-base-100 border-t-accent text-[.7rem]">
            <th>Type</th>
            <th>Blad i bruk: {nonDeletedSum}</th>
            <th>Slettet: {deletedSum}</th>
            <th>Totalt Antall {totalSum}</th>

            <th>
              <RoleAdminMV>Min antall</RoleAdminMV>
            </th>

            <th>
              <RoleAdminMV>Min antall - faktisk antall</RoleAdminMV>
            </th>
          </tr>
        </thead>
        <tbody>
          {itemsArray.map((item, index) => (
            <tr key={index} className="border-none hover:bg-primary">
              <td className="md:text-md py-5 text-[.7rem]">
                {item.type} {item.side}
              </td>
              <td className="md:text-md py-5 text-[.7rem]">
                {item.nonDeletedCount}
              </td>
              <td className="md:text-md py-5 text-[.7rem]">
                {item.deletedCount}
              </td>
              <td className="md:text-md py-5 text-[.7rem]">
                {item.totalCount}
              </td>

              <td className="md:text-md py-5 text-[.7rem]">
                <RoleAdminMV>{item.customCount}</RoleAdminMV>
              </td>
              <td
                className={`md:text-md py-5 text-[.7rem] ${item.nonDeletedCount - item.customCount < 0 ? "text-red-500" : ""}`}
              >
                <RoleAdminMV>
                  {item.nonDeletedCount - item.customCount}
                </RoleAdminMV>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {
        <RoleAdminMV>
          <div className="mt-5 bg-primary p-3">
            <h1 className="md:text-md text-xs">Må bestilles:</h1>
            {negativeItems.map((item, index) => {
              const matchingArtItem = mvArticleTypes.find((artItem) => {
                if (Array.isArray(artItem.side)) {
                  const sideIndex = artItem.side.indexOf(item.side);
                  return artItem.blade === item.type && sideIndex !== -1;
                } else {
                  return (
                    artItem.blade === item.type &&
                    (artItem.side === item.side || artItem.side === undefined)
                  );
                }
              });
              return (
                <div key={index} className="flex border-none hover:bg-primary">
                  <p className="mr-1 text-[.7rem] md:text-xs">
                    Type: {item.type}
                  </p>
                  <p className="mr-1 text-[.7rem] md:text-xs">{item.side}</p>
                  <p className="mr-5 text-[.7rem] md:text-xs">
                    Artnr:{" "}
                    {matchingArtItem
                      ? Array.isArray(matchingArtItem.art)
                        ? matchingArtItem.art[
                            matchingArtItem.side.indexOf(item.side)
                          ]
                        : matchingArtItem.art
                      : "N/A"}
                  </p>
                  <p className=" text-xs text-blue-500">
                    {Math.abs(item.difference)}stk
                  </p>
                </div>
              );
            })}
          </div>
        </RoleAdminMV>
      }
    </div>
  );
};

export default OverviewTable;
