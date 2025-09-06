import { NextResponse } from "next/server";
import { FEED_ITEMS } from "@/constants/data";

export async function GET() {
  return NextResponse.json(FEED_ITEMS, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

