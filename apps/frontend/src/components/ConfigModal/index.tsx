import { FC, FormEvent, useState } from 'react';
import { useRepoStore } from '../../stores/repoStore';
import { ConfigModalProps } from './types';

export const ConfigModal: FC<ConfigModalProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [owner, repo, setRepo] = useRepoStore((state) => [
    state.owner,
    state.repo,
    (repo: string, owner: string) => state.setRepo(repo, owner),
  ]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    setError('');
    e.preventDefault();

    const {
      owner: { value: newOwner },
      repo: { value: newRepo },
    } = e.target as typeof e.target & {
      repo: { value: string };
      owner: { value: string };
    };

    try {
      const res = await fetch(
        `/api/v1/github/commits?page=${1}&take=${1}&repo=${newRepo}&owner=${newOwner}`,
      );

      if (!res.ok) throw new Error('Bad request');

      if (newOwner != owner || newRepo != repo) setRepo(newRepo, newOwner);
      onClose();
    } catch (err) {
      setError('Repository could not be loaded');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed p-4 w-72  border-1 z-50 bg-white rounded-md shadow-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h2 className="font-semibold">Repo settings</h2>
          <form
            className="flex mt-4 flex-col items-start gap-2"
            onSubmit={handleSubmit}
          >
            <label htmlFor="Name" className="text-sm">
              Owner
            </label>
            <input
              defaultValue={owner}
              type="owner"
              name="owner"
              placeholder="Owner"
              className="bg-gray-100 h-8 rounded-md px-2 w-full"
            />
            <label htmlFor="Name" className="text-sm mt-2">
              Repo name
            </label>
            <input
              defaultValue={repo}
              type="repo"
              name="repo"
              placeholder="Repo"
              className="bg-gray-100 h-8 rounded-md px-2 w-full"
            />
            {error && (
              <div className="place-self-end text-xs text-red-400">{error}</div>
            )}
            <button className="mt-2 place-self-end text-sm bg-blue-50 h-8 px-2 w-24 rounded-md hover:bg-blue-100">
              {loading ? 'Saving' : 'Save'}
            </button>
          </form>
        </div>
      )}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed top-0 left-0 w-full h-full z-10 backdrop-blur-sm"
        />
      )}
    </>
  );
};
