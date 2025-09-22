'use client';

import { useMemo } from 'react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell,
} from 'recharts';

type AnyRow = Record<string, unknown>;

type Props<T extends AnyRow> = {
  /** Data mentah (mis. candidates dari Supabase) */
  items: T[];
  /** Nama kolom yang mau dihitung frekuensinya (mis. "recruitment_strategy") */
  field: keyof T;
  /** Judul di atas chart */
  title?: string;
  /** Label pengganti jika null/kosong */
  nullLabel?: string;
  /** Batasi jumlah bar teratas (default 8) */
  topN?: number;
  /** Opsional: mapping/normalisasi nilai sebelum dihitung */
  mapValue?: (raw: unknown) => string;
};

export default function AnalyticsBar<T extends AnyRow>({
  items,
  field,
  title = 'Distribution',
  nullLabel = 'Unknown',
  topN = 8,
  mapValue,
}: Props<T>) {
  const data = useMemo(() => {
    const counts: Record<string, number> = {};

    for (const it of items) {
      const raw = it[field];
      const valRaw =
        mapValue?.(raw) ??
        String(raw ?? '').trim();

      const key = valRaw === '' ? nullLabel : valRaw;
      counts[key] = (counts[key] ?? 0) + 1;
    }

    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, topN);
  }, [items, field, mapValue, nullLabel, topN]);

  if (!data.length) return null;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h3 className="font-semibold mb-3">{title}</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
                <Cell
                key={`cell-${index}`}
                fill={["#0097b2", "#00c49f", "#ffbb28", "#ff8042"][index % 4]}
                />
            ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
