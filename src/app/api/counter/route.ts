import { getRedis } from "@/lib/redis";
import { NextRequest, NextResponse } from "next/server";

const TOTAL_KEY = "readings:total";
const BY_TYPE_KEY = "readings:by-type";

/** GET /api/counter — devuelve el total y el desglose por tipo */
export async function GET() {
  try {
    const redis = await getRedis();
    const [totalStr, byTypeRaw] = await Promise.all([
      redis.get(TOTAL_KEY),
      redis.hGetAll(BY_TYPE_KEY),
    ]);
    const total = totalStr ? Number(totalStr) : 0;
    const byType: Record<string, number> = {};
    if (byTypeRaw && typeof byTypeRaw === "object") {
      for (const [k, v] of Object.entries(byTypeRaw)) {
        byType[k] = Number(v) || 0;
      }
    }
    return NextResponse.json({ total, byType });
  } catch (e) {
    console.error("[counter GET]", e);
    return NextResponse.json({ total: 0, byType: {} });
  }
}

/** POST /api/counter — incrementa el contador global y por tipo */
export async function POST(req: NextRequest) {
  try {
    const { spreadType } = (await req.json()) as { spreadType?: string };
    const redis = await getRedis();
    const total = await redis.incr(TOTAL_KEY);
    if (spreadType) {
      await redis.hIncrBy(BY_TYPE_KEY, spreadType, 1);
    }
    return NextResponse.json({ total });
  } catch (e) {
    console.error("[counter POST]", e);
    return NextResponse.json({ total: null });
  }
}
