import { NextResponse } from "next/server";
import { CREATORS } from "@/constants/data";

export async function GET() {
  return NextResponse.json(CREATORS, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

