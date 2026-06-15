type Props = {
  title: string;
  value: string | number;
};

export default function StatCard({
  title,
  value,
}: Props) {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow-sm
        border
        p-5
        hover:shadow-md
        transition
        duration-200
        text-left
      "
    >
      <p className="text-xs uppercase font-semibold text-gray-400 tracking-wider">
        {title}
      </p>

      <p className="mt-2 text-3xl font-bold text-slate-800">
        {value}
      </p>
    </div>
  );
}