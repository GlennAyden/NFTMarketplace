import { NextResponse } from "next/server";
import { DROPS } from "@/constants/data";

export async function GET() {
  return NextResponse.json(DROPS, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

