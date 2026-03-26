import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

type UsagePayload = {
  eventType?: string;
  path?: string;
  metadata?: Record<string, unknown>;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as UsagePayload;

    const { error } = await supabase.from("portfolio_events").insert({
      event_type: body.eventType ?? "unknown",
      path: body.path ?? "/",
      metadata: body.metadata ?? {},
    });

    if (error) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Usage event was not stored. Create the `portfolio_events` table and allow inserts for anon requests.",
          details: error.message,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid event payload." },
      { status: 400 },
    );
  }
}
