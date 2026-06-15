import React from "react";

type Props = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export default function DashboardLayout({
  title,
  subtitle,
  children,
}: Props) {
  return (
    <div className="min-h-screen bg-slate-50 w-full text-left">
      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 m-0">
            {title}
          </h1>

          {subtitle && (
            <p className="text-gray-500 mt-2">
              {subtitle}
            </p>
          )}
        </div>

        {children}
      </div>
    </div>
  );
}
