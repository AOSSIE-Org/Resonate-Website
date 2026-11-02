import Image from "next/image";
import { Button } from "../ui/Button";
import type { GitHubContributor } from "@/lib/github-contributors";

const CONTRIBUTING_GUIDE_URL =
  "https://github.com/AOSSIE-Org/Resonate-Website/blob/main/CONTRIBUTING.md";

export type ContributorLabels = {
  titlePart1: string;
  titlePart2: string;
  description: string;
  becomeContributor: string;
  avatarAlt: string;
  visitProfile: string;
};

type ContributorsProps = {
  contributors: GitHubContributor[];
  labels: ContributorLabels;
};

function formatMessage(template: string, values: Record<string, string>) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replaceAll(`{${key}}`, value),
    template,
  );
}

export function Contributors({ contributors, labels }: ContributorsProps) {
  if (contributors.length === 0) {
    return null;
  }

  return (
    <section
      id="section-contributors"
      className="relative flex flex-col pt-16 sm:pt-24 xl:pt-32 overflow-hidden"
    >
      <div className="w-full px-4 md:px-8 xl:px-0 2xl:px-16 flex flex-col gap-10 items-center xl:items-start">
        <div className="flex flex-col gap-4 text-center xl:text-left max-w-2xl">
          <h2 className="text-3xl sm:text-4xl xl:text-5xl font-bold tracking-tight uppercase leading-none text-balance">
            <span className="text-(--foreground)">{labels.titlePart1} </span>
            <span className="text-highlight">{labels.titlePart2}</span>
          </h2>
          <p className="text-(--foreground-muted) text-sm sm:text-base lg:text-lg leading-relaxed text-pretty">
            {labels.description}
          </p>
        </div>

        <ul className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-3 sm:gap-4 w-full max-w-5xl xl:max-w-none list-none p-0 m-0">
          {contributors.map((contributor) => (
            <li key={contributor.login}>
              <a
                href={contributor.html_url}
                target="_blank"
                rel="noopener noreferrer"
                title={contributor.login}
                aria-label={formatMessage(labels.visitProfile, {
                  login: contributor.login,
                })}
                className="group block rounded-full border border-card bg-tech-stack-card shadow-card backdrop-blur-md p-0.5 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-brand-yellow/60 hover:shadow-lg hover:shadow-brand-yellow/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow"
              >
                <Image
                  src={contributor.avatar_url}
                  alt={formatMessage(labels.avatarAlt, {
                    login: contributor.login,
                  })}
                  width={64}
                  height={64}
                  className="h-12 w-12 sm:h-14 sm:w-14 rounded-full object-cover"
                  unoptimized
                />
              </a>
            </li>
          ))}
        </ul>

        <Button
          variant="type2"
          href={CONTRIBUTING_GUIDE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          {labels.becomeContributor}
        </Button>
      </div>
    </section>
  );
}
