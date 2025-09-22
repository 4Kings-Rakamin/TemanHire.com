'use client';

import { useMemo } from 'react';
import {
  ResponsiveContainer, PieChart, Pie, Tooltip, Legend, Cell,
} from 'recharts';

type Cand = { ai_pass: boolean | null };

export default function AnalyticsPassPie({
  candidates,
  title = 'AI Decision Breakdown',
  heightClass = 'h-48',   // ganti ke h-40/h-56 sesuai selera
}: {
  candidates: Cand[];
  title?: string;
  heightClass?: string;
}) {
  const data = useMemo(() => {
    let passed = 0, failed = 0, unscored = 0;
    for (const c of candidates) {
      if (c.ai_pass === true) passed++;
      else if (c.ai_pass === false) failed++;
      else unscored++;
    }
    return [
      { name: 'Passed',   value: passed,   color: '#16a34a' }, // hijau
      { name: 'Failed',   value: failed,   color: '#dc2626' }, // merah
      { name: 'Unscored', value: unscored, color: '#9ca3af' }, // abu
    ].filter(d => d.value > 0); // sembunyikan slice 0
  }, [candidates]);

  if (!data.length) return null;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h3 className="font-semibold mb-3">{title}</h3>
      <div className={heightClass}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius="80%"
              label
              labelLine={false}
            >
              {data.map((d, i) => (
                <Cell key={i} fill={d.color} />
              ))}
            </Pie>
            <Tooltip formatter={(v: number, n: string) => [`${v} kandidat`, n]} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
