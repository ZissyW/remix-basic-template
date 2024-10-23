export type FetchMarkdownFileResponse = {
  attributes: Record<string, string | number | boolean>;
  html: string;
};

export async function fetchMarkdownFromGithubMD(
  fileName: string,
  owner: string,
  repo: string,
  branch: string
): Promise<FetchMarkdownFileResponse | undefined> {
  const url = `https://github-md.com/${owner}/${repo}/${branch}/${fileName}`;

  const response = await fetch(url);
  if (!response.ok || response.status !== 200) {
    if (response.status === 404) return undefined;
    throw Error(
      `Fetching Markdown file from GitHub failed with ${response.status}: ${response.statusText}`
    );
  }

  const data = await response.json<FetchMarkdownFileResponse>();
  return data;
}

// 定义 GitHub API 响应的类型
type GitHubContentItem = {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string | null;
  type: "file" | "dir" | "symlink" | "submodule";
  _links: {
    self: string;
    git: string;
    html: string;
  };
};

// 如果您想返回简化版的数据，可以这样修改函数
function convertGitHubUrlToApiUrl(url: string): string {
  const parts = url.replace("https://github.com/", "").split("/");
  const [owner, repo] = parts;
  return `https://api.github.com/repos/${owner}/${repo}`;
}

// 更新后的 fetchRepoContents 函数，支持分页
export async function fetchRepoContents(
  repoUrl: string,
  path: string = "",
  page: number = 1,
  limit: number = -1
): Promise<{
  items: GitHubContentItem[];
  hasMore: boolean;
  totalPages: number;
}> {
  const apiUrl = convertGitHubUrlToApiUrl(repoUrl);

  const headers = new Headers();
  headers.set("Accept", "application/vnd.github.v3+json");
  headers.set("User-Agent", "ZissyW");

  const url = new URL(`${apiUrl}/contents/${path}`.replace(/\/+/g, "/"));

  const response = await fetch(url.toString(), { headers });
  if (!response.ok) {
    throw Error(
      `获取 GitHub 仓库内容失败，状态码 ${response.status}: ${response.statusText}`
    );
  }

  const allData: GitHubContentItem[] = await response.json();
  const startIndex = limit < 0 ? 0 : (page - 1) * limit;
  const endIndex = limit < 0 ? allData.length : startIndex + limit;
  const paginatedData = allData.slice(startIndex, endIndex);

  return {
    items: paginatedData,
    totalPages: limit < 0 ? 1 : Math.ceil(allData.length / limit),
    hasMore: limit >= 0 && endIndex < allData.length,
  };
}

export async function fetchMDContent(
  repoUrl: string,
  path: string,
  fileName: string
): Promise<FetchMarkdownFileResponse | undefined> {
  // 从 repoUrl 中提取 owner 和 repo
  const urlParts = repoUrl.replace("https://github.com/", "").split("/");
  const [owner, repo] = urlParts;

  // 默认使用 'main' 分支，如果需要可以修改
  const branch = "master";

  // 组合完整的文件路径
  const fullPath = path ? `${path}/${fileName}` : fileName;

  try {
    const result = await fetchMarkdownFromGithubMD(
      fullPath,
      owner,
      repo,
      branch
    );
    return result;
  } catch (error) {
    console.error("获取 Markdown 文件失败:", error);
    throw error;
  }
}
