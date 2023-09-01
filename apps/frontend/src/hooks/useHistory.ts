import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useRepoStore } from '../stores/repoStore';
import { Branch } from '../types/Branch';
import { CommitList } from '../types/Commit';

import { getBranches, getCommitList } from '../services/githubService';
import { toast } from 'react-hot-toast';

export const useHistory = () => {
  const { ref, inView } = useInView();

  const [owner, repo, branch, setBranch] = useRepoStore((state) => [
    state.owner,
    state.repo,
    state.branch,
    (branch: string) => state.setBranch(branch),
  ]);

  const {
    data: branches,
    isLoading: isLoadingBranches,
    isSuccess: isSuccessBranches,
    isError: isErrorBranches,
  } = useQuery<Branch[]>(
    [`branches-${repo}-${owner}`, repo, owner],
    async () => getBranches(repo, owner),
    {
      cacheTime: 0,
      onSuccess: (branches) => {
        if (branches.length > 0 && !branch) setBranch(branches[0].name);
      },
      onError: (e) => {
        if (e instanceof Error) {
          toast.error('Error: ' + e.message);
        } else {
          toast.error('An unexpected error ocurred');
        }
      },
    },
  );

  const { status, data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery<CommitList>(
      [`commits-${branch}-${repo}-${owner}`, branch, repo, owner],
      async ({ pageParam = 1 }) =>
        getCommitList(repo, owner, branch ?? branches![0].name, pageParam),
      {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        enabled: !!branches,
        getNextPageParam: (lastPage) => {
          if (lastPage.results.length < 6) return undefined;
          return lastPage.page + 1;
        },
        getPreviousPageParam: () => undefined,
        onError: (e) => {
          if (e instanceof Error) {
            toast.error('Error: ' + e.message);
          } else {
            toast.error('An unexpected error ocurred');
          }
        },
      },
    );

  useEffect(() => {
    if (inView && !!branch && hasNextPage) {
      fetchNextPage();
    }
    //eslint-disable-next-line
  }, [inView]);

  const isLoadingCommits = !isErrorBranches && status == 'loading';
  const isError = isErrorBranches || status == 'error';
  const isSuccess = status == 'success';

  return {
    data,
    branch,
    setBranch,
    status,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    branches,
    isLoadingBranches,
    isSuccessBranches,
    isLoadingCommits,
    isError,
    isSuccess,
    ref,
  };
};
