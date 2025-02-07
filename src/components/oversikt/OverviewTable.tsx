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

const OverviewTable = ({ count, theme }) => {
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
      <h2 className="mb-2 mt-10 text-lg text-neutral ">Oversikt antall blad</h2>
      <table className="table-xs  md:table">
        <thead>
          <tr
            className={`md:text-md border border-b-accent border-l-base-100 border-r-base-100 border-t-accent  text-[.7rem] text-white ${theme === "darkmode" ? "bg-primary" : "bg-neutral"}`}
          >
            <th>Type</th>
            <th>Artikkel nummer</th>
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
          {itemsArray.map((item, index) => {
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
              <tr
                key={index}
                className={`border-none ${
                  theme === "darkmode" ? "odd:bg-gray-700" : "odd:bg-gray-200"
                }`}
              >
                <td className="md:text-md py-5 text-[.7rem] text-neutral">
                  {item.type} {item.side}{" "}
                </td>
                <td className="md:text-md py-5 text-[.7rem] text-neutral">
                  {" "}
                  {matchingArtItem
                    ? Array.isArray(matchingArtItem.art)
                      ? matchingArtItem.art[
                          matchingArtItem.side.indexOf(item.side)
                        ]
                      : matchingArtItem.art
                    : "N/A"}
                </td>
                <td className="md:text-md py-5 text-[.7rem] text-neutral">
                  {item.nonDeletedCount}
                </td>
                <td className="md:text-md py-5 text-[.7rem] text-neutral">
                  {item.deletedCount}
                </td>
                <td className="md:text-md py-5 text-[.7rem] text-neutral">
                  {item.totalCount}
                </td>
                <td className="md:text-md py-5 text-[.7rem] text-neutral">
                  <RoleAdminMV>{item.customCount}</RoleAdminMV>
                </td>
                <td
                  className={`md:text-md py-5 text-[.7rem] ${
                    item.difference < 0 ? "text-red-500" : "text-neutral"
                  }`}
                >
                  <RoleAdminMV>{item.difference}</RoleAdminMV>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {
        <RoleAdminMV>
          <div
            className={`mt-5 ${theme === "darkmode" ? "bg-primary" : "bg-neutral"} p-3 text-white`}
          >
            <h1 className="md:text-md text-xs text-white">Må bestilles:</h1>
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
                  <p className=" textgray-200 text-xs">
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
