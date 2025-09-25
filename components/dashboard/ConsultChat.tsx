'use client';

import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type Msg = { role: 'user' | 'assistant'; content: string };

const SUGGESTS = [
  'Siapa 5 kandidat terbaik menurut AI dan alasannya?',
  'Bagaimana kandidat terbaruku apakah dia layak?.',
  'Apa visi dan misi TemanHire? Siapakah CEO TemanHire?.',
];

// Komponen LoadingDots untuk animasi
function LoadingDots() {
  const [dots, setDots] = useState('');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
    
    return () => clearInterval(interval);
  }, []);
  
  return <span>{dots}</span>;
}

export function ConsultChat() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'assistant', content: 'Hai! Saya Agung-R1 siap membantu konsultasi kandidatmu. Silakan ajukan pertanyaan 🙂' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scRef.current?.scrollTo({ top: scRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  const ask = async (text: string) => {
    if (!text.trim() || loading) return;
    setLoading(true);
    setMessages((m) => [...m, { role: 'user', content: text }]);
    setInput('');

    try {
      const res = await fetch('/api/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j?.error || 'Gagal konsultasi');
      setMessages((m) => [...m, { role: 'assistant', content: j.answer || '(tidak ada jawaban)' }]);
    } catch (e: any) {
      setMessages((m) => [...m, { role: 'assistant', content: `❗ Error: ${e.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg border p-0 overflow-hidden">
      {/* Area chat */}
      <div ref={scRef} className="h-[52vh] overflow-y-auto p-4 space-y-3 bg-white">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm shadow-sm
                ${m.role === 'user' ? 'bg-black text-white' : 'bg-black/5 text-black'}`}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {m.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl px-3 py-2 text-sm bg-black/5 flex items-center gap-1">
              <span>Memikirkan jawaban</span>
              <LoadingDots />
            </div>
          </div>
        )}
      </div>

      {/* Quick suggests */}
      <div className="flex flex-wrap gap-2 border-t p-3">
        {SUGGESTS.map((s, idx) => (
          <button
            key={idx}
            onClick={() => ask(s)}
            className="text-xs rounded-full border px-3 py-1 hover:bg-black/5"
            disabled={loading}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input */}
      <form
        className="flex items-center gap-2 border-t p-3"
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
      >
        <input
          className="flex-1 rounded-md border px-3 py-2 bg-transparent"
          placeholder="Tulis pertanyaanmu…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="rounded-md border px-3 py-2 text-sm hover:bg-black/5 disabled:opacity-50"
        >
          {loading ? 'Mengirim…' : 'Kirim'}
        </button>
      </form>
    </div>
  );
}