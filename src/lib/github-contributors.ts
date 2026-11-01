export type GitHubContributor = {
  login: string;
  avatar_url: string;
  html_url: string;
};

const CONTRIBUTORS_API_URL =
  "https://api.github.com/repos/AOSSIE-Org/Resonate-Website/contributors";

const MAX_PAGES = 10;
const PER_PAGE = 100;

export async function fetchGitHubContributors(): Promise<GitHubContributor[]> {
  const contributors: GitHubContributor[] = [];

  try {
    for (let page = 1; page <= MAX_PAGES; page += 1) {
      const response = await fetch(
        `${CONTRIBUTORS_API_URL}?per_page=${PER_PAGE}&page=${page}`,
        {
          headers: {
            Accept: "application/vnd.github+json",
            "User-Agent": "Resonate-Website-Build",
          },
        },
      );

      if (!response.ok) {
        console.warn(
          `GitHub contributors API responded with ${response.status}`,
        );
        break;
      }

      const batch: unknown = await response.json();
      if (!Array.isArray(batch) || batch.length === 0) {
        break;
      }

      for (const entry of batch) {
        if (
          entry &&
          typeof entry === "object" &&
          "login" in entry &&
          "avatar_url" in entry &&
          "html_url" in entry &&
          typeof entry.login === "string" &&
          typeof entry.avatar_url === "string" &&
          typeof entry.html_url === "string"
        ) {
          contributors.push({
            login: entry.login,
            avatar_url: entry.avatar_url,
            html_url: entry.html_url,
          });
        }
      }

      if (batch.length < PER_PAGE) {
        break;
      }
    }
  } catch (error) {
    console.warn("Failed to fetch GitHub contributors:", error);
  }

  return contributors;
}
