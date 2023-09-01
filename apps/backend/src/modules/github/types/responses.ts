import { Endpoints } from '@octokit/types';

export type ListCommits =
  Endpoints['GET /repos/{owner}/{repo}/commits']['response']['data'];

export type ListBranches =
  Endpoints['GET /repos/{owner}/{repo}/branches']['response']['data'];

export type CommitTree = ListCommits &
  { branch: string; branchOrder: number }[];
