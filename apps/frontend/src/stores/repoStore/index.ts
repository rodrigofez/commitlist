import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { RepoStore } from './types';

const initialState = {
  owner: 'rodrigofez',
  repo: 'commitlist',
  branch: undefined,
};

export const useRepoStore = create<RepoStore>()(
  persist(
    (set) => ({
      ...initialState,
      setRepo: (repo, owner) => set(() => ({ repo, owner, branch: undefined })),
      setBranch: (branch) => set((state) => ({ ...state, branch })),
    }),
    {
      name: 'repo',
    },
  ),
);
