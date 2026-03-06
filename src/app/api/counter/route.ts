import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";

const TOTAL_KEY = "readings:total";
const BY_TYPE_KEY = "readings:by-type";

/** GET /api/counter — devuelve el total y el desglose por tipo */
export async function GET() {
  try {
    const [total, byType] = await Promise.all([
      kv.get<number>(TOTAL_KEY),
      kv.hgetall<Record<string, number>>(BY_TYPE_KEY),
    ]);
    return NextResponse.json({ total: total ?? 0, byType: byType ?? {} });
  } catch {
    return NextResponse.json({ total: 0, byType: {} });
  }
}

/** POST /api/counter — incrementa el contador global y por tipo */
export async function POST(req: NextRequest) {
  try {
    const { spreadType } = (await req.json()) as { spreadType?: string };
    const [total] = await Promise.all([
      kv.incr(TOTAL_KEY),
      spreadType ? kv.hincrby(BY_TYPE_KEY, spreadType, 1) : Promise.resolve(),
    ]);
    return NextResponse.json({ total });
  } catch {
    // El contador nunca debe romper la lectura
    return NextResponse.json({ total: null });
  }
}
