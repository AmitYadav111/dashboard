import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rawData: [],
  filteredData: [],
  filters: {
    channel: "",
    region: "",
  },
  sort: {
    column: null,
    direction: "asc", // 'asc' or 'desc'
  },
  pagination: {
    currentPage: 1,
    pageSize: 25,
  },
  loading: false,
  error: null,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.rawData = action.payload;
      state.filteredData = action.payload;
    },
    setFilter: (state, action) => {
      const { type, value } = action.payload;
      state.filters[type] = value;
      state.pagination.currentPage = 1; // Reset to first page on filter change
    },
    setSort: (state, action) => {
      const { column } = action.payload;
      if (state.sort.column === column) {
        // Toggle direction if same column
        state.sort.direction = state.sort.direction === "asc" ? "desc" : "asc";
      } else {
        state.sort.column = column;
        state.sort.direction = "asc";
      }
    },
    setPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    setPageSize: (state, action) => {
      state.pagination.pageSize = action.payload;
      state.pagination.currentPage = 1; // Reset to first page on page size change
    },
    applyFilters: (state) => {
      // Early return if no data
      if (state.rawData.length === 0) {
        state.filteredData = [];
        return;
      }

      let filtered = state.rawData;

      // Apply channel filter - use more efficient approach
      if (state.filters.channel) {
        filtered = filtered.filter(
          (item) => item.channel === state.filters.channel
        );
      }

      // Apply region filter
      if (state.filters.region) {
        filtered = filtered.filter(
          (item) => item.region === state.filters.region
        );
      }

      // Apply sorting only if needed
      if (state.sort.column && filtered.length > 0) {
        // Create a copy only when sorting is needed
        filtered = [...filtered];
        filtered.sort((a, b) => {
          let aVal = a[state.sort.column];
          let bVal = b[state.sort.column];

          // Handle CTR calculation
          if (state.sort.column === "ctr") {
            aVal = a.impressions > 0 ? (a.clicks / a.impressions) * 100 : 0;
            bVal = b.impressions > 0 ? (b.clicks / b.impressions) * 100 : 0;
          }

          // Handle numeric comparison
          if (typeof aVal === "number" && typeof bVal === "number") {
            return state.sort.direction === "asc" ? aVal - bVal : bVal - aVal;
          }

          // Handle string comparison
          const aStr = String(aVal).toLowerCase();
          const bStr = String(bVal).toLowerCase();
          if (state.sort.direction === "asc") {
            return aStr.localeCompare(bStr);
          } else {
            return bStr.localeCompare(aStr);
          }
        });
      }

      state.filteredData = filtered;
    },
  },
});

export const {
  setData,
  setFilter,
  setSort,
  setPage,
  setPageSize,
  applyFilters,
} = dataSlice.actions;

export default dataSlice.reducer;
