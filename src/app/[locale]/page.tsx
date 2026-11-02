import enMessages from "@/messages/en.json";
import hiMessages from "@/messages/hi.json";
import { Contributors, type ContributorLabels } from "@/components/home/Contributors";
import { HomePageClient } from "@/components/home/HomePageClient";
import { fetchGitHubContributors } from "@/lib/github-contributors";
import { routing } from "@/i18n/routing";

const messagesMap: Record<string, typeof enMessages> = {
  en: enMessages,
  hi: hiMessages,
};

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale = routing.locales.includes(
    locale as (typeof routing.locales)[number],
  )
    ? locale
    : routing.defaultLocale;
  const messages = messagesMap[resolvedLocale] ?? enMessages;
  const labels = messages.Contributors as ContributorLabels;

  const contributors = await fetchGitHubContributors();

  return (
    <HomePageClient
      contributorsSlot={
        <Contributors contributors={contributors} labels={labels} />
      }
    />
  );
}
