"use client";

import React, { useMemo, useState } from "react";

type RawParse = {
  filename: string;
  results?: Record<string, string>;       // bentuk dari /parse
  text?: Record<string, string>;          // kalau pakai /parse-structured
  structured?: any;                       // opsional
  error?: string;
};

export default function ScanPage() {
  const [file, setFile] = useState<File | null>(null);
  const [conf, setConf] = useState<number>(0.45);
  const [loading, setLoading] = useState(false);
  const [resp, setResp] = useState<RawParse | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const preview = useMemo(() => (file && file.type.startsWith("image/")
    ? URL.createObjectURL(file) : null), [file]);

  const onPick = (f?: File | null) => {
    if (!f) return;
    if (!["image/jpeg","image/png","application/pdf"].includes(f.type)) {
      setErr("File harus JPG/PNG/PDF"); return;
    }
    if (f.size > 12 * 1024 * 1024) { // 12 MB
      setErr("Ukuran file maksimal 12MB"); return;
    }
    setErr(null);
    setResp(null);
    setFile(f);
  };

  async function handleScan() {
    if (!file) { setErr("Pilih file dulu"); return; }
    try {
      setLoading(true); setErr(null);
      const fd = new FormData();
      fd.append("file", file);
      fd.append("conf", String(conf));

      const r = await fetch("/api/scan", { method: "POST", body: fd });
      const data: RawParse = await r.json();
      if (!r.ok) throw new Error(data?.error || `HTTP ${r.status}`);
      setResp(data);
    } catch (e: any) {
      setErr(e?.message || "Gagal memproses");
    } finally {
      setLoading(false);
    }
  }

  // Normalisasi agar mendukung /parse (results) atau /parse-structured (text)
  const sections: Record<string, string> | null = useMemo(() => {
    if (!resp) return null;
    if (resp.results && typeof resp.results === "object") return resp.results;
    if (resp.text && typeof resp.text === "object") return resp.text;
    return null;
  }, [resp]);

  function copyAll() {
    if (!sections) return;
    const text = Object.entries(sections)
      .map(([k, v]) => `## ${k.toUpperCase()}\n${v}`)
      .join("\n\n");
    navigator.clipboard.writeText(text);
  }

  function downloadJSON() {
    const blob = new Blob([JSON.stringify(resp, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `cv_ocr_${resp?.filename || "result"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function copySection(k: string, v: string) {
    navigator.clipboard.writeText(v);
  }

  return (
    <div className="mx-auto max-w-5xl p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Scan CV</h1>
        <p className="text-sm text-muted-foreground">
          Upload CV kandidat, dan biarkan Model Kami yang membaca. Model dilatih dengan arsitektur YOLOv11 dan
          EasyOCR untuk mengekstrak informasi penting dari CV dalam format PDF, JPG, atau PNG.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="md:col-span-2 border border-dashed rounded-xl p-6 flex items-center justify-center hover:bg-muted/30 cursor-pointer">
          <input
            type="file"
            accept="image/jpeg,image/png,application/pdf"
            className="hidden"
            onChange={(e) => onPick(e.target.files?.[0] ?? null)}
          />
          <div className="text-center">
            <div className="font-medium">{file ? file.name : "Klik untuk pilih PDF/JPG/PNG"}</div>
            <div className="text-xs text-muted-foreground">Maks 12MB 4K for better result</div>
          </div>
        </label>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <label className="text-sm">Confidence</label>
            <input
              type="range" min={0.1} max={0.95} step={0.05}
              value={conf}
              onChange={(e) => setConf(parseFloat(e.target.value))}
              className="w-full"
            />
            <span className="text-sm tabular-nums w-12 text-right">{conf.toFixed(2)}</span>
          </div>

          <button
            onClick={handleScan}
            disabled={!file || loading}
            className="w-full rounded-lg py-2 px-3 bg-black text-white disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Scan CV"}
          </button>

          {sections && (
            <div className="flex gap-2">
              <button onClick={copyAll} className="flex-1 rounded-lg py-2 px-3 border">Copy Semua</button>
              <button onClick={downloadJSON} className="flex-1 rounded-lg py-2 px-3 border">Download JSON</button>
            </div>
          )}
        </div>
      </div>

      {preview && (
        <div className="border rounded-xl p-3">
          <div className="text-sm font-medium mb-2">Preview Gambar</div>
          <img src={preview} alt="preview" className="max-h-[420px] w-auto object-contain mx-auto" />
        </div>
      )}

      {err && <div className="text-red-600 text-sm border border-red-300 bg-red-50 p-3 rounded-lg">{err}</div>}

      {sections && (
        <div className="grid gap-3">
          {Object.entries(sections).map(([k, v]) => (
            <div key={k} className="rounded-xl border p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{k.toUpperCase()}</h3>
                <button
                  onClick={() => copySection(k, v)}
                  className="text-xs border rounded-md px-2 py-1"
                  title="Copy"
                >
                  Copy
                </button>
              </div>
              <textarea
                readOnly
                className="w-full h-40 resize-y rounded-md border p-2 text-sm"
                value={v}
              />
            </div>
          ))}
        </div>
      )}

      {!sections && !loading && (
        <p className="text-sm text-muted-foreground">Upload file lalu klik “Scan CV” untuk melihat hasil OCR.</p>
      )}
    </div>
  );
}
