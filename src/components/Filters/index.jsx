import React, { useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../store/slices/dataSlice";
import "./styles.css";

const Filters = React.memo(() => {
  const dispatch = useDispatch();
  const { rawData, filters } = useSelector((state) => state.data);

  // Memoize unique channels and regions extraction
  const channels = useMemo(() => {
    if (rawData.length === 0) return [];
    return [...new Set(rawData.map((item) => item.channel))].sort();
  }, [rawData]);

  const regions = useMemo(() => {
    if (rawData.length === 0) return [];
    return [...new Set(rawData.map((item) => item.region))].sort();
  }, [rawData]);

  const handleFilterChange = useCallback(
    (type, value) => {
      dispatch(setFilter({ type, value }));
    },
    [dispatch]
  );

  return (
    <div className="filters">
      <div className="filter-group">
        <label htmlFor="channel-filter">Filter by Channel:</label>
        <select
          id="channel-filter"
          value={filters.channel}
          onChange={(e) => handleFilterChange("channel", e.target.value)}
        >
          <option value="">All Channels</option>
          {channels.map((channel) => (
            <option key={channel} value={channel}>
              {channel}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="region-filter">Filter by Region:</label>
        <select
          id="region-filter"
          value={filters.region}
          onChange={(e) => handleFilterChange("region", e.target.value)}
        >
          <option value="">All Regions</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
});

Filters.displayName = "Filters";

export default Filters;
