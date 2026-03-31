import PortfolioClient from '../components/PortfolioClient';
import { supabase } from '../lib/supabase';
import { getPublicHomesPhNews } from '../lib/portfolio-data';
import { fallbackCoaching, fallbackEcosystem, fallbackDevelopers, fallbackCredentials, fallbackAwards, fallbackNews } from '../lib/mockData';

export const revalidate = 0;

export default async function Page() {
  const { data: coachingData } = await supabase.from('coaching').select('*');
  const { data: ecosystemData } = await supabase.from('companies').select('*');
  const { data: devsData } = await supabase.from('developers').select('*');
  const { data: credentialsData } = await supabase.from('credentials').select('*');
  const { data: awardsData } = await supabase.from('awards').select('*');
  const { data: newsData } = await supabase.from('news_articles').select('*');
  
  // Fetch public news from the main news.homes.ph feed
  const externalNewsRaw = await getPublicHomesPhNews();
  
  // Map external news to your portfolio's news schema
  const externalNews = (externalNewsRaw || []).map((article: any, i: number) => ({
    id: `external-${i}`,
    title: article.title,
    description: article.content_preview,
    image_url: article.thumbnail_url,
    published_at: article.published_at,
    published_date: new Date(article.published_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    tag: 'Global News',
    link: article.link
  }));

  const mergeData = (fallback: any[], supabaseData: any[] | null, key: string) => {
    if (!supabaseData || supabaseData.length === 0) return fallback;
    const supabaseKeys = new Set(supabaseData.map(item => item[key]));
    const filteredFallback = fallback.filter(item => !supabaseKeys.has(item[key]));
    return [...filteredFallback, ...supabaseData];
  };

  const activeCoaching = mergeData(fallbackCoaching, coachingData, 'title');
  const activeEcosystem = mergeData(fallbackEcosystem, ecosystemData, 'name');
  const activeDevs = mergeData(fallbackDevelopers, devsData, 'name');
  const activeCredentials = mergeData(fallbackCredentials, credentialsData, 'title');
  const activeAwards = mergeData(fallbackAwards, awardsData, 'title');
  
  // Merge Supabase news with the public feed and sort
  const baseNews = mergeData(fallbackNews, newsData, 'title').map((n: any) => ({
    ...n,
    published_at: n.published_at || n.created_at || '1970-01-01'
  }));

  const activeNews = [...externalNews, ...baseNews].sort((a, b) => {
    return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
  });

  return (
    <main>
      <PortfolioClient 
        initialCoaching={activeCoaching}
        initialEcosystem={activeEcosystem}
        initialDevelopers={activeDevs}
        initialCredentials={activeCredentials}
        initialAwards={activeAwards}
        initialNews={activeNews}
      />
    </main>
  );
}
