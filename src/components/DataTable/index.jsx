import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSort } from "../../store/slices/dataSlice";
import "./styles.css";

const DataTable = React.memo(({ data }) => {
  const dispatch = useDispatch();
  const { sort } = useSelector((state) => state.data);

  const handleSort = useCallback(
    (column) => {
      dispatch(setSort({ column }));
    },
    [dispatch]
  );

  const getSortIcon = useCallback(
    (column) => {
      if (sort.column !== column) {
        return "↕️";
      }
      return sort.direction === "asc" ? "↑" : "↓";
    },
    [sort.column, sort.direction]
  );

  const calculateCTR = useCallback((clicks, impressions) => {
    if (impressions === 0) return 0;
    return ((clicks / impressions) * 100).toFixed(2);
  }, []);

  return (
    <div className="data-table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("channel")} className="sortable">
              Channel {getSortIcon("channel")}
            </th>
            <th onClick={() => handleSort("region")} className="sortable">
              Region {getSortIcon("region")}
            </th>
            <th onClick={() => handleSort("spend")} className="sortable">
              Spend {getSortIcon("spend")}
            </th>
            <th onClick={() => handleSort("impressions")} className="sortable">
              Impressions {getSortIcon("impressions")}
            </th>
            <th onClick={() => handleSort("clicks")} className="sortable">
              Clicks {getSortIcon("clicks")}
            </th>
            <th onClick={() => handleSort("conversions")} className="sortable">
              Conversions {getSortIcon("conversions")}
            </th>
            <th onClick={() => handleSort("ctr")} className="sortable">
              CTR {getSortIcon("ctr")}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="7" className="no-data">
                No data available
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={row.id}>
                <td>{row.channel}</td>
                <td>{row.region}</td>
                <td>
                  $
                  {row.spend.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td>{row.impressions.toLocaleString("en-US")}</td>
                <td>{row.clicks.toLocaleString("en-US")}</td>
                <td>{row.conversions.toLocaleString("en-US")}</td>
                <td>{calculateCTR(row.clicks, row.impressions)}%</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
});

DataTable.displayName = "DataTable";

export default DataTable;
