// app/(dash)/dashboard/page.tsx
import { redirect } from 'next/navigation';
import { supabaseServer } from '@/lib/supabase/server';
import DeleteCandidateButton from '@/components/dashboard/DeleteCandidateButton';
import { AiScoreButton } from '@/components/dashboard/AiScoreButton'
import { AiScoreAllButton } from '@/components/dashboard/AiScoreAllButton';
import AnalyticsBar from '@/components/dashboard/AnalyticsStrategyBar';
import AnalyticsTrendLine from '@/components/dashboard/AnalyticsTrendLine';
import AnalyticsPassPie from '@/components/dashboard/AnalyticsPassPie';
import TopAiCandidates from '@/components/dashboard/TopAiCandidates';
import Link from 'next/link';

export default async function DashboardPage() {
  const supabase = supabaseServer();

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', session.user.id)
    .maybeSingle();

  const { data: candidates } = await supabase
    .from('candidates')
    .select('id, name, interview_score, skill_score, personality_score, education_level, recruitment_strategy, experience_level, status, created_at, ai_score, ai_notes, ai_pass')
    .eq('owner_id', session.user.id)
    .order('created_at', { ascending: false });

  const total = candidates?.length ?? 0;
  const passed = (candidates ?? []).filter(c => c.ai_pass === true).length;
  const failed = (candidates ?? []).filter(c => c.ai_pass === false).length;
  const unscored = total - passed - failed;

  return (
    <main className="min-h-[70vh] p-6 space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-bold text-black">Dashboard</h1>

      {/* Welcome Card */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-start space-x-4">
          <div className="rounded-full bg-[#0097b2] p-3">
            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="mb-2 text-xl font-semibold text-gray-800">
              Selamat Datang{profile?.full_name ? `, ${profile.full_name}` : ''}!
            </h2>
            <p className="text-sm leading-relaxed text-gray-600">
              <span className="text-[#0097b2] font-medium">{session.user.email}</span>
              <br />
              Dashboard ini membantu Anda mengelola dan melihat informasi Kandidat. 
            </p>
            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <p className="flex items-center">
                <span className="mr-2">•</span>
                Gunakan tombol di bawah untuk menambahkan kandidat baru atau mengimpor dari CSV
              </p>
              <p className="flex items-center">
                <span className="mr-2">•</span>
                Klik tombol edit pada setiap kandidat untuk memperbarui informasi
              </p>
              <p className="flex items-center">
                <span className="mr-2">•</span>
                Gunakan tombol AI Score untuk menilai ulang kandidat dengan Model XGBoost terbaru kami
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-600 mb-2">Total Kandidat</p>
          <p className="text-3xl font-bold text-[#0097b2]">{total}</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-600 mb-2">Lolos (AI)</p>
          <p className="text-3xl font-bold text-green-600">{passed}</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-600 mb-2">Tidak Lolos (AI)</p>
          <p className="text-3xl font-bold text-red-600">{failed}</p>
          {unscored > 0 && (
            <p className="text-xs text-gray-500 mt-2">Belum dinilai: {unscored}</p>
          )}
        </div>
      </section>
      
      {/* Main Content */}
      {(candidates?.length ?? 0) === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
          <p className="mb-4 text-gray-700">Kamu belum punya kandidat.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/dashboard/forminput"
              className="rounded-md bg-[#0097b2] text-white px-4 py-2 hover:bg-[#007a8f] transition-colors"
            >
              Tambah kandidat
            </a>
            <a 
              href="/dashboard/import" 
              className="rounded-md border border-[#0097b2] text-[#0097b2] px-4 py-2 hover:bg-[#0097b2] hover:text-white transition-colors"
            >
              Import CSV
            </a>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Bar Chart Recruitment Strategy */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnalyticsBar items={candidates ?? []} field="recruitment_strategy" title="Recruitment Strategy" />
            <AnalyticsBar items={candidates ?? []} field="education_level" title="Education Level" />
            <AnalyticsBar items={candidates ?? []} field="experience_level" title="Experience Level" />
            <AnalyticsTrendLine candidates={candidates ?? []} />
            <AnalyticsPassPie candidates={candidates ?? []} title="Pass vs Fail vs Unscored" />
            <TopAiCandidates candidates={candidates ?? []} limit={5} />
          </div>
          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-black">Your Candidates</h2>
            <div className="flex flex-wrap gap-2">
              <AiScoreAllButton />
              <a 
                href="/dashboard/import" 
                className="rounded-md border border-[#0097b2] text-[#0097b2] px-3 py-2 text-sm hover:bg-[#0097b2] hover:text-white transition-colors"
              >
                Import CSV
              </a>
              <a
                href="/dashboard/forminput"
                className="rounded-md bg-[#0097b2] text-white px-3 py-2 text-sm hover:bg-[#007a8f] transition-colors"
              >
                Tambah kandidat
              </a>
            </div>
          </div>

          {/* Candidates Table */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <div className="min-w-full">
                {/* Table Header - Hidden on mobile, visible on larger screens */}
                <div className="hidden lg:grid lg:grid-cols-10 gap-4 p-4 bg-[#0097b2] border-b border-gray-200">
                  <div className="col-span-2 text-sm font-medium text-white">Nama</div>
                  <div className="text-sm font-medium text-white">Strategi</div>
                  <div className="text-sm font-medium text-white">Interview</div>
                  <div className="text-sm font-medium text-white">Skill</div>
                  <div className="text-sm font-medium text-white">Personality</div>
                  <div className="text-sm font-medium text-white">Education</div>
                  <div className="text-sm font-medium text-white">Experience</div>
                  <div className="text-sm font-medium text-white">Status</div>
                  <div className="text-sm font-medium text-white">AI Score</div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-gray-200">
                  {(candidates ?? []).map((c) => (
                    <div key={c.id} className="p-4">
                      {/* Desktop Layout */}
                      <div className="hidden lg:grid lg:grid-cols-10 gap-3">
                        <div className="col-span-2 font-medium text-black">{c.name}</div>
                        <div className="text-sm text-gray-700 truncate">{c.recruitment_strategy}</div>
                        <div className="text-sm text-[#0097b2] font-medium">{c.interview_score}</div>
                        <div className="text-sm text-[#0097b2] font-medium">{c.skill_score}</div>
                        <div className="text-sm text-[#0097b2] font-medium">{c.personality_score}</div>
                        <div className="text-sm text-gray-700 truncate">{c.education_level}</div>
                        <div className="text-sm text-gray-700 truncate">{c.experience_level}</div>
                        <div className="text-sm text-gray-700 truncate">{c.status}</div>
                        <div className="flex flex-col gap-2">
                          {/* AI Score Display */}
                          <div className="text-sm">
                            {typeof c.ai_score === 'number' ? (
                              <div className="flex gap-1">
                                <span className="text-black font-medium">{c.ai_score}/100</span>
                                <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${c.ai_pass ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                  {c.ai_pass ? 'Lolos' : 'Tidak Lolos'}
                                </span>
                              </div>
                            ) : (
                              <span className="text-gray-400">—</span>
                            )}
                          </div>
                          {/* Action Buttons */}
                          <div className="flex justify-end gap-1">
                            <AiScoreButton id={c.id} />
                            <Link 
                              href={`/dashboard/candidates/${c.id}/edit`}
                              className="rounded-md border border-[#0097b2] text-[#0097b2] px-2 py-1 text-sm hover:bg-[#0097b2] hover:text-white transition-colors whitespace-nowrap"
                            >
                              Edit
                            </Link>
                            <DeleteCandidateButton id={c.id} name={c.name} />      
                          </div>
                        </div>
                      </div>

                      {/* Mobile Layout */}
                      <div className="lg:hidden space-y-3">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-black text-lg">{c.name}</h3>
                          <div className="flex gap-1">
                            <AiScoreButton id={c.id} />
                            <Link 
                              href={`/dashboard/candidates/${c.id}/edit`}
                              className="rounded-md border border-[#0097b2] text-[#0097b2] px-2 py-1 text-sm hover:bg-[#0097b2] hover:text-white transition-colors"
                            >
                              Edit
                            </Link>
                            <DeleteCandidateButton id={c.id} name={c.name} />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                          <div>
                            <span className="text-gray-600">Strategi:</span>
                            <span className="ml-2 text-gray-800">{c.recruitment_strategy}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Status:</span>
                            <span className="ml-2 text-gray-800">{c.status}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Interview:</span>
                            <span className="ml-2 text-[#0097b2] font-medium">{c.interview_score}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Skill:</span>
                            <span className="ml-2 text-[#0097b2] font-medium">{c.skill_score}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Personality:</span>
                            <span className="ml-2 text-[#0097b2] font-medium">{c.personality_score}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Education:</span>
                            <span className="ml-2 text-gray-800">{c.education_level}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Experience:</span>
                            <span className="ml-2 text-gray-800">{c.experience_level}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">AI Score:</span>
                            {typeof c.ai_score === 'number' ? (
                              <div className="ml-2 inline-flex items-center gap-2">
                                <span className="text-black font-medium">{c.ai_score}/100</span>
                                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${c.ai_pass ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                  {c.ai_pass ? 'Lolos' : 'Tidak Lolos'}
                                </span>
                              </div>
                            ) : (
                              <span className="ml-2 text-gray-400">—</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}