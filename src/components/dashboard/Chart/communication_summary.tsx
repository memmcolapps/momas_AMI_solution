import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import type { RectangleProps } from "recharts";

const RoundedBar = (props: RectangleProps) => {
  const { x, y, width, height, fill } = props;
  const radius = 6;
  
  if (x === undefined || y === undefined || width === undefined || height === undefined) {
    return null;
  }
  
  return (
    <path
      d={`
        M ${x},${y + radius}
        Q ${x},${y} ${x + radius},${y}
        L ${x + width - radius},${y}
        Q ${x + width},${y} ${x + width},${y + radius}
        L ${x + width},${y + height}
        L ${x},${y + height}
        Z
      `}
      fill={fill}
    />
  );
};

export default function CommunicationSummaryChart() {
  const data = [
    { hours: "9 hrs", value: 45 },
    { hours: "10 hrs", value: 62 },
    { hours: "11 hrs", value: 38 },
    { hours: "12 hrs", value: 71 },
    { hours: "1 hrs", value: 55 },
    { hours: "2 hrs", value: 48 },
    { hours: "3 hrs", value: 67 },
    { hours: "4 hrs", value: 53 },
  ];

  return (
    <Card className="w-full h-[280px] bg-white shadow-none rounded-lg border border-gray-200 flex flex-col">
      <CardHeader className="pb-6">
        <CardTitle className="text-gray-800 font-semibold text-sm md:text-base lg:text-lg">
          Communication Summary
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 p-0 pb-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <XAxis 
              dataKey="hours" 
              axisLine={true}
              tickLine={false}
              style={{ fontSize: '12px', fill: '#6B7280' }}
            />
            <YAxis 
              axisLine={true}
              tickLine={false}
              style={{ fontSize: '12px', fill: '#6B7280' }}
              width={35}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: 'none', 
                borderRadius: '8px',
                color: '#fff'
              }}
              cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
            />
            <Bar 
              dataKey="value" 
              fill="#3B82F6" 
              shape={<RoundedBar />}
              barSize={10}
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}