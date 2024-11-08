/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

const FilterTable = ({ data, setSortByType, sortByType }) => {
  const handleColumnClick = (columnName) => {
    setSortByType(columnName);
  };

  return (
    <div>
      <p>Selected Column: {setSortByType}</p>
      <table className="table table-xs">
        <thead>
          <tr className="bg-blue-400 text-white">
            {data?.length > 0 &&
              Object.keys(data[0]).map((key) => (
                <th
                  key={key}
                  onClick={() => handleColumnClick(key)}
                  className="hover:cursor-pointer"
                >
                  {key}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.id} className="hover:cursor-pointer hover:bg-primary">
              {Object.entries(item).map(([key, value]) => (
                <td key={key} className="whitespace-nowrap">
                  {value instanceof Date
                    ? value.toISOString()
                    : typeof value === "boolean"
                      ? value.toString()
                      : value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FilterTable;
