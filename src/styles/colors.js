// Chart colors - reads from CSS variables
// This ensures chart colors match the current theme defined in variables.css
export const CHART_COLORS = {
  get primary() {
    return (
      getComputedStyle(document.documentElement)
        .getPropertyValue("--color-chart-primary")
        .trim() || "#3498db"
    );
  },
  get success() {
    return (
      getComputedStyle(document.documentElement)
        .getPropertyValue("--color-chart-success")
        .trim() || "#2ecc71"
    );
  },
  get danger() {
    return (
      getComputedStyle(document.documentElement)
        .getPropertyValue("--color-chart-danger")
        .trim() || "#e74c3c"
    );
  },
};
