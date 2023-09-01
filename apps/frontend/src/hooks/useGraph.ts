import { useState } from 'react';
import { useRepoStore } from '../stores/repoStore';
import { useQuery } from '@tanstack/react-query';
import { getCommitTree } from '../services/githubService';
import { Commit } from '../types/Commit';
import { Edge, Node } from 'reactflow';
import { toast } from 'react-hot-toast';

export const useGraph = () => {
  const [owner, repo] = useRepoStore((state) => [
    state.owner,
    state.repo,
    state.branch,
  ]);
  const [initialNodes, setInitialNodes] = useState<Node[]>([]);
  const [initialEdges, setInitialEdges] = useState<Edge[]>([]);

  const { isLoading, isSuccess, isError } = useQuery<
    (Commit & { branch: string; branchOrder: number })[]
  >(['commit-tree', repo, owner], () => getCommitTree(repo, owner), {
    onSuccess: (commits) => {
      setInitialNodes(
        commits.map((commit, i) => ({
          data: {
            label: commit.commit.message,
            avatar: commit.author ? commit.committer.avatar_url : '',
            order: commit.branchOrder,
            branch: commit.branch,
          },
          id: commit.sha + commit.branch,
          position: { x: commit.branchOrder * 40 + 30, y: i * 60 + 40 },
          type: 'textUpdater',
        })),
      );

      const edges: Edge[] = [];

      commits.forEach((commit) =>
        commit.parents.forEach((el) =>
          edges.push({
            id: commit.sha + el.sha + commit.branch,
            source: commit.sha + commit.branch,
            target: el.sha + commit.branch,
            animated: true,
          }),
        ),
      );

      setInitialEdges(edges);
    },
    onError: (e) => {
      if (e instanceof Error) {
        toast.error('Error: ' + e.message);
      } else {
        toast.error('An unexpected error ocurred');
      }
    },
  });

  return { initialNodes, initialEdges, isLoading, isSuccess, isError };
};
