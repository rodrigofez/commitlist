import { ReactNode } from 'react';

import { CommitCard } from '../components/CommitCard';
import { Dropdown } from '../components/Dropdown';
import { ButtonSkeleton } from '../components/Skeletons/ButtonSkeleton';
import { CardSkeleton } from '../components/Skeletons/CardSkeleton';
import Error from '../components/Error';
import { useHistory } from '../hooks/useHistory';

export const Home = () => {
  const {
    data,
    branch,
    setBranch,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    branches,
    isLoadingBranches,
    isSuccessBranches,
    isLoadingCommits,
    isError,
    isSuccess,
    ref,
  } = useHistory();

  return (
    <div className="m-4 flex flex-col items-start gap-2">
      {isLoadingBranches && <ButtonSkeleton />}
      {isSuccessBranches && (
        <Dropdown
          value={branch ?? branches![0].name}
          options={branches!.map(({ name }) => name)}
          onSelect={(value) => {
            setBranch(value);
          }}
        />
      )}
      {/* Commits */}
      <div className="flex flex-col gap-2 w-full">
        {isLoadingCommits && <ListCommitsSkeleton />}
        {isError && <Error>There was an error retrieving commits</Error>}
        {isSuccess &&
          data?.pages.map((page) =>
            page.results.map(({ commit, sha, committer, author, html_url }) => (
              <CommitCard
                key={sha}
                author={{
                  avatar_url: author?.avatar_url,
                  email: commit.author.email,
                  login: committer.login,
                  name: commit.author.name,
                }}
                date={commit.author.date}
                html_url={html_url}
                message={commit.message}
                sha={sha}
              />
            )),
          )}
      </div>
      {/* Commits */}
      <div className="w-full" ref={ref}>
        {isFetchingNextPage ? (
          <CardSkeleton />
        ) : (
          hasNextPage && (
            <BottomActionButton onClick={fetchNextPage}>
              Load more...
            </BottomActionButton>
          )
        )}
      </div>
    </div>
  );
};

const ListCommitsSkeleton = () => (
  <>
    {Array.from({ length: 10 }, (_, index) => (
      <CardSkeleton key={index} />
    ))}
  </>
);

const BottomActionButton = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) => (
  <button
    onClick={onClick}
    className="flex hover:scale-95 cursor-pointer transition-all items-center justify-center 
      w-full h-20 text-center bg-gray-100 font-semibold rounded-md"
  >
    {children}
  </button>
);
