'use client';

import { useMemo } from 'react';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

type Cand = {
  created_at: string;
  ai_pass: boolean | null;
};

function ymdLocal(d: Date) {
  // format YYYY-MM-DD berdasar waktu lokal browser
  const pad = (n: number) => String(n).padStart(2, '0');
  const y = d.getFullYear();
  const m = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  return `${y}-${m}-${day}`;
}

export default function AnalyticsTrendLine({ candidates }: { candidates: Cand[] }) {
  const data = useMemo(() => {
    // 1) range 30 hari terakhir
    const today = new Date();
    const start = new Date(today);
    start.setDate(start.getDate() - 29); // termasuk hari ini => total 30 titik

    // 2) inisialisasi map tanggal -> counts
    const map: Record<string, { date: string; total: number; passed: number; failed: number }> = {};
    const cursor = new Date(start);
    while (cursor <= today) {
      const key = ymdLocal(cursor);
      map[key] = { date: key, total: 0, passed: 0, failed: 0 };
      cursor.setDate(cursor.getDate() + 1);
    }

    // 3) isikan data dari candidates
    for (const c of candidates) {
      const d = new Date(c.created_at);
      const key = ymdLocal(d);
      if (!map[key]) continue; // di luar 30 hari terakhir
      map[key].total += 1;
      if (c.ai_pass === true) map[key].passed += 1;
      else if (c.ai_pass === false) map[key].failed += 1;
    }

    // 4) ubah ke array dan urutkan (sudah berurutan, tapi jaga-jaga)
    return Object.values(map).sort((a, b) => a.date.localeCompare(b.date));
  }, [candidates]);

  if (!data.length) return null;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h3 className="font-semibold mb-3">Trend Kandidat (30 hari)</h3>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ left: 8, right: 16, top: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickMargin={8} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total" stroke="#0097b2" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="passed" stroke="#16a34a" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="failed" stroke="#dc2626" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
