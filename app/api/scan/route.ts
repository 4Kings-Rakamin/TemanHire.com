// app/api/scan/route.ts
import { NextResponse } from "next/server";
const OCR_API = process.env.OCR_API_URL || "https://agunghari-yoloocr.hf.space/parse";

export async function POST(req: Request) {
  try {
    const fd = await req.formData();
    const r = await fetch(OCR_API, { method: "POST", body: fd });
    const data = await r.json();
    return NextResponse.json(data, { status: r.status });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "failed" }, { status: 500 });
  }
}
