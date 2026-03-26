import { supabase } from "@/lib/supabase";

type PortfolioMetrics = {
  statusLabel: string;
  description: string;
  eventsCount: number | null;
  inquiriesCount: number | null;
};

export async function getPortfolioMetrics(): Promise<PortfolioMetrics> {
  try {
    const [eventsResult, inquiriesResult] = await Promise.all([
      supabase.from("portfolio_events").select("*", {
        count: "exact",
        head: true,
      }),
      supabase.from("portfolio_inquiries").select("*", {
        count: "exact",
        head: true,
      }),
    ]);

    const hasSchemaErrors = Boolean(eventsResult.error || inquiriesResult.error);

    if (hasSchemaErrors) {
      return {
        statusLabel: "Configured, schema pending",
        description:
          "Supabase credentials are wired in, but the expected tables are not available yet or are blocked by RLS.",
        eventsCount: null,
        inquiriesCount: null,
      };
    }

    return {
      statusLabel: "Connected",
      description:
        "Portfolio usage and inquiry metrics are being read from Supabase successfully.",
      eventsCount: eventsResult.count ?? 0,
      inquiriesCount: inquiriesResult.count ?? 0,
    };
  } catch {
    return {
      statusLabel: "Connection check failed",
      description:
        "The app could not confirm the Supabase schema from this environment. Credentials are still configured in the codebase.",
      eventsCount: null,
      inquiriesCount: null,
    };
  }
}
