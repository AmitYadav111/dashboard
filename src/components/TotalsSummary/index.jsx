import React from "react";
import "./styles.css";

const TotalsSummary = React.memo(({ totals }) => {
  return (
    <div className="totals-summary">
      <h2>Totals Summary</h2>
      <div className="totals-grid">
        <div className="total-item">
          <span className="total-label">Total Spend:</span>
          <span className="total-value">
            $
            {totals.spend.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
        <div className="total-item">
          <span className="total-label">Total Impressions:</span>
          <span className="total-value">
            {totals.impressions.toLocaleString("en-US")}
          </span>
        </div>
        <div className="total-item">
          <span className="total-label">Total Clicks:</span>
          <span className="total-value">
            {totals.clicks.toLocaleString("en-US")}
          </span>
        </div>
        <div className="total-item">
          <span className="total-label">Total Conversions:</span>
          <span className="total-value">
            {totals.conversions.toLocaleString("en-US")}
          </span>
        </div>
        <div className="total-item">
          <span className="total-label">Total CTR:</span>
          <span className="total-value">{totals.ctr.toFixed(2)}%</span>
        </div>
      </div>
    </div>
  );
});

TotalsSummary.displayName = "TotalsSummary";

export default TotalsSummary;
