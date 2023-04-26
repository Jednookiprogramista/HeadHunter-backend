export function filterGithubUrls(urlList: string | string[]): string[] {
  let normalizedUrlList: string[] = [];

  if (typeof urlList === 'string') {
    normalizedUrlList = urlList
      .replace(/\s+/g, ' ')
      .replace(/;/g, ',')
      .split(',');
  } else if (typeof urlList === 'object') {
    normalizedUrlList = urlList;
  }
  const regex = /^https:\/\/github.com\/[a-zA-Z0-9_-]+$/;
  return normalizedUrlList
    .map((url) => url.trim())
    .filter((url) => regex.test(url));
}
