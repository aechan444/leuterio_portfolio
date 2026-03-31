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

export async function getPublicHomesPhNews() {
  const RSS_URL = "https://news.homes.ph/rss/";
  
  try {
    const response = await fetch(RSS_URL, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) throw new Error("Failed to fetch RSS");
    
    const xml = await response.text();
    
    // Simple regex-based XML parser for RSS items
    const items = xml.match(/<item>[\s\S]*?<\/item>/g) || [];
    
    return items.map(item => {
      const title = item.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/)?.[1] || 
                    item.match(/<title>([\s\S]*?)<\/title>/)?.[1] || "";
      const link = item.match(/<link>([\s\S]*?)<\/link>/)?.[1] || "";
      const pubDate = item.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1] || "";
      const description = item.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/)?.[1] || 
                          item.match(/<description>([\s\S]*?)<\/description>/)?.[1] || "";
      
      // Extract featured image if present in media:content or content:encoded
      const image = item.match(/<media:content[^>]*url="([\s\S]*?)"/)?.[1] || 
                    item.match(/<img[^>]*src="([\s\S]*?)"/)?.[1] || 
                    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200";

      return {
        title: title.trim(),
        link: link.trim(),
        published_at: pubDate,
        content_preview: description.replace(/<[^>]*>/g, '').substring(0, 160) + '...',
        thumbnail_url: image
      };
    }).slice(0, 6); // Get latest 6
  } catch (error) {
    console.error("Error fetching public RSS news:", error);
    return [];
  }
}
