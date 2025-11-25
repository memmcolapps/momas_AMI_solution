"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface LineData {
  timeLabel?: string;
  hour?: string;
  value: number;
}

const lineData: LineData[] = [
  { hour: "4 hrs", value: 60 },
  { hour: "8 hrs", value: 30 },
  { hour: "12 hrs", value: 40 },
  { hour: "16 hrs", value: 35 },
  { hour: "20 hrs", value: 30 },
  { hour: "24 hrs", value: 80 },
];

interface LineChartProps {
  title: string;
  data?: LineData[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: LineData;
    value: number;
  }>;
}

const renderTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  const data = payload[0].payload;
  const label = data.timeLabel ?? data.hour ?? 'Unknown';

  return (
    <div
      style={{
        backgroundColor: "#3b82f6",
        color: "#FFFFFF",
        padding: "8px",
        borderRadius: "4px",
        fontSize: 12,
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
      }}
    >
      <p>{`${label}: ${data.value}`}</p>
    </div>
  );
};

const RealtimeCommunicationLogsChart = ({ title, data }: LineChartProps) => {
  const chartData = React.useMemo(() => {
    return data ?? lineData;
  }, [data]);

  return (
    <Card className="w-full p-4 pb-0 max-h-[280px] bg-white shadow-none rounded-lg border border-gray-200">
      <CardHeader>
        <CardTitle className="text-gray-800 font-semibold text-sm md:text-base lg:text-lg">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="min-h-[250px]">
        <ResponsiveContainer width="100%" height={250}>
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 20, left: -30, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
            <XAxis
              dataKey="hour"
              stroke="#888"
              tick={{ fontSize: 12 }}
              axisLine={{ stroke: "#e5e7eb", strokeWidth: 1 }}
            />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
              stroke="#888"
              tick={{ fontSize: 12 }}
            />
            <Tooltip content={renderTooltip} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={1}
              dot={{
                r: 3,
                stroke: "#3b82f630",
                fill: "#3b82f6",
                strokeWidth: 8,
              }}
              activeDot={{
                r: 3,
                stroke: "#3b82f630",
                fill: "#3b82f6",
                strokeWidth: 8,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RealtimeCommunicationLogsChart;