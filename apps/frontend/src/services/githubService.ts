export const getCommitList = async (
  repo: string,
  owner: string,
  branch: string,
  page: string,
) => {
  const res = await fetch(
    `/api/v1/github/commits?branch=${branch}&page=${page}&take=${6}&repo=${repo}&owner=${owner}`,
  );

  const parsedRes = await res.json();

  if (!res.ok) throw new Error(parsedRes.message);

  return parsedRes;
};

export const getBranches = async (repo: string, owner: string) => {
  const res = await fetch(
    `/api/v1/github/branches?repo=${repo}&owner=${owner}`,
  );

  const parsedRes = await res.json();

  if (!res.ok) throw new Error(parsedRes.message);

  return parsedRes;
};

export const getCommitTree = async (repo: string, owner: string) => {
  const res = await fetch(
    `/api/v1/github/commit-tree?repo=${repo}&owner=${owner}`,
  );

  const parsedRes = await res.json();

  if (!res.ok) throw new Error(parsedRes.message);

  return parsedRes;
};
