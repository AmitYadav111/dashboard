import React, { useEffect, useMemo, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setData, applyFilters } from "../../store/slices/dataSlice";
import Filters from "../Filters";
import TotalsSummary from "../TotalsSummary";
import DataTable from "../DataTable";
import Pagination from "../Pagination";
import "./styles.css";
// Lazy load PerformanceChart to reduce initial bundle size
const PerformanceChart = lazy(() => import("../PerformanceChart"));

const Dashboard = () => {
  const dispatch = useDispatch();
  const { rawData, filteredData, filters, sort, pagination } = useSelector(
    (state) => state.data
  );
  useEffect(() => {
    // Load data from data.json
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        dispatch(setData(data));
        dispatch(applyFilters());
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      });
  }, [dispatch]);

  useEffect(() => {
    // Apply filters whenever filters or sort changes
    if (rawData.length > 0) {
      dispatch(applyFilters());
    }
  }, [filters, sort, dispatch, rawData.length]);

  // Memoize paginated data calculation
  const paginatedData = useMemo(() => {
    const startIndex = (pagination.currentPage - 1) * pagination.pageSize;
    const endIndex = startIndex + pagination.pageSize;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, pagination.currentPage, pagination.pageSize]);

  // Memoize totals calculation to avoid recalculation on every render
  const totals = useMemo(() => {
    return filteredData.reduce(
      (acc, item) => {
        acc.spend += item.spend;
        acc.impressions += item.impressions;
        acc.clicks += item.clicks;
        acc.conversions += item.conversions;
        return acc;
      },
      { spend: 0, impressions: 0, clicks: 0, conversions: 0 }
    );
  }, [filteredData]);

  const totalCTR = useMemo(() => {
    return totals.impressions > 0
      ? (totals.clicks / totals.impressions) * 100
      : 0;
  }, [totals]);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Marketing Performance Analytics Dashboard</h1>
      </header>

      <div className="dashboard-content">
        <Filters />
        <TotalsSummary totals={{ ...totals, ctr: totalCTR }} />
        <Suspense
          fallback={<div className="chart-loading">Loading chart...</div>}
        >
          <PerformanceChart />
        </Suspense>
        <DataTable data={paginatedData} />
        <Pagination
          totalItems={filteredData.length}
          currentPage={pagination.currentPage}
          pageSize={pagination.pageSize}
        />
      </div>
    </div>
  );
};

export default Dashboard;
