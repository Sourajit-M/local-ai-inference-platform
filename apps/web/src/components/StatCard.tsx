type Props = {
  title: string;
  value: string | number;
};

export default function StatCard({
  title,
  value,
}: Props) {
  return (
    <div className="rounded-lg border p-4">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}