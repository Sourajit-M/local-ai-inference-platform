import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type Props = {
  data: Record<string, unknown>[];
  dataKey: string;
};

export default function BenchmarkChart({
  data,
  dataKey,
}: Props) {
  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="model_name"
            angle={-15}
            textAnchor="end"
            height={60}
          />

          <YAxis domain={[0, "auto"]} />

          <Tooltip />

          <Bar
            dataKey={dataKey}
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}