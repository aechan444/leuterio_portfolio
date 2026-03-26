import { supabase } from "./supabase";

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

export async function getBucketImages() {
  try {
    const { data, error } = await supabase.storage.from('portfolio_images').list('uploads');
    if (error) throw error;

    return data.map(file => {
      const { data: { publicUrl } } = supabase.storage.from('portfolio_images').getPublicUrl(`uploads/${file.name}`);
      return {
        name: file.name,
        url: publicUrl,
        metadata: file.metadata
      };
    });
  } catch (error) {
    console.error("Error fetching bucket images:", error);
    return [];
  }
}
