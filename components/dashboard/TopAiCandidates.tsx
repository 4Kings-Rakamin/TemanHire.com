'use client';

import Link from 'next/link';
import { useMemo } from 'react';

type Cand = {
  id: string;
  name: string | null;
  ai_score: number | null;
  ai_pass: boolean | null;
};

export default function TopAiCandidates({
  candidates,
  limit = 5,
  title = 'Top Candidates (AI Score)',
}: {
  candidates: Cand[];
  limit?: number;
  title?: string;
}) {
  const top = useMemo(() => {
    return (candidates ?? [])
      .filter(c => typeof c.ai_score === 'number')
      .sort((a, b) => (b.ai_score! - a.ai_score!))
      .slice(0, limit);
  }, [candidates, limit]);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h3 className="font-semibold mb-3">{title}</h3>

      {top.length === 0 ? (
        <p className="text-sm text-gray-500">Belum ada kandidat dengan skor AI.</p>
      ) : (
        <ul className="space-y-3">
          {top.map((c, i) => (
            <li key={c.id} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 text-xs font-semibold">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <div className="font-medium text-black truncate">{c.name ?? 'Tanpa Nama'}</div>
                  <div className="text-xs text-gray-500">
                    {c.ai_pass === true ? 'Lolos' : c.ai_pass === false ? 'Tidak Lolos' : 'Belum dinilai'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* progress mini */}
                <div className="w-24">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${c.ai_pass ? 'bg-green-600' : 'bg-gray-900'}`}
                      style={{ width: `${Math.max(0, Math.min(100, c.ai_score ?? 0))}%` }}
                    />
                  </div>
                </div>
                <div className="w-14 text-right text-sm font-semibold">
                  {c.ai_score ?? '-'}<span className="text-xs text-gray-500">/100</span>
                </div>
                <Link
                  href={`/dashboard/candidates/${c.id}/edit`}
                  className="text-xs rounded-md border border-[#0097b2] text-[#0097b2] px-2 py-1 hover:bg-[#0097b2] hover:text-white"
                >
                  Detail
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
