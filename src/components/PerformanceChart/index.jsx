import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";
import { CHART_COLORS } from "../../styles/colors";
import "./styles.css";

const PerformanceChart = React.memo(() => {
  const { filteredData } = useSelector((state) => state.data);

  // Calculate aggregated data by channel
  const chartData = useMemo(() => {
    const channelMap = {};

    filteredData.forEach((item) => {
      if (!channelMap[item.channel]) {
        channelMap[item.channel] = {
          channel: item.channel,
          spend: 0,
          clicks: 0,
          conversions: 0,
        };
      }
      channelMap[item.channel].spend += item.spend;
      channelMap[item.channel].clicks += item.clicks;
      channelMap[item.channel].conversions += item.conversions;
    });

    return Object.values(channelMap).sort((a, b) => b.spend - a.spend);
  }, [filteredData]);

  if (chartData.length === 0) {
    return null;
  }

  return (
    <div className="performance-chart">
      <h2>Performance by Channel</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="channel" angle={-45} textAnchor="end" height={100} />
          <YAxis />
          <Tooltip
            formatter={(value) => {
              if (typeof value === "number") {
                return value.toLocaleString("en-US");
              }
              return value;
            }}
          />
          <Legend />
          <Bar dataKey="spend" fill={CHART_COLORS.primary} name="Spend ($)" />
          <Bar dataKey="clicks" fill={CHART_COLORS.success} name="Clicks" />
          <Bar
            dataKey="conversions"
            fill={CHART_COLORS.danger}
            name="Conversions"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});

PerformanceChart.displayName = "PerformanceChart";

export default PerformanceChart;
