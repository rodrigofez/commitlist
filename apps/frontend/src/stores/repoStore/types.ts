export type RepoStore = {
  repo: string;
  owner: string;
  branch?: string;
  setRepo: (repo: string, owner: string) => void;
  setBranch: (branch: string) => void;
};
