import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

type InquiryPayload = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as InquiryPayload;
    const name = body.name?.trim();
    const email = body.email?.trim();
    const company = body.company?.trim() || null;
    const message = body.message?.trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    const { error } = await supabase.from("portfolio_inquiries").insert({
      name,
      email,
      company,
      message,
    });

    if (error) {
      return NextResponse.json(
        {
          error:
            "Supabase insert failed. Create the `portfolio_inquiries` table and matching RLS policies first.",
          details: error.message,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      message: "Inquiry captured in Supabase.",
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 },
    );
  }
}
