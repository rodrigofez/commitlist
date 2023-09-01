import { FC, useEffect, useState } from 'react';
import { UserCard } from '../UserCard';

import branchIcon from '../../assets/git-branch.svg';
import clipboardIcon from '../../assets/clipboard.svg';
import checkIcon from '../../assets/check.svg';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const CommitCard: FC<{
  author: { avatar_url?: string; login: string; name: string; email: string };
  message: string;
  date: Date;
  html_url: string;
  sha: string;
}> = ({
  author,
  html_url,
  author: { name, email, login, avatar_url },
  date,
  message,
  sha,
}) => {
  return (
    <div
      className="bg-white rounded-md border-gray-200 border-1 p-4 
        hover:bg-slate-100 transition-all flex justify-between gap-4"
    >
      <div>
        <h3 title={message} className="font-semibold text-sm">
          {message.split('*')[0]}
        </h3>
        <div className="flex place-items-end">
          <div className="group">
            <img
              alt="small avatar"
              className="w-5 h-5 rounded-full inline-block mr-2 group"
              src={author ? author.avatar_url : branchIcon}
            />
            {author && (
              <UserCard
                avatar={avatar_url}
                username={login}
                name={name}
                email={email}
                githubUrl={`https://github.com/${login}`}
              />
            )}
          </div>
          <span className="font-semibold text-xs mr-1">{name}</span>
          <span className="font-base text-xs">
            commited {dayjs(date).fromNow()}
          </span>
        </div>
      </div>
      <HashButton sha={sha} url={html_url} />
    </div>
  );
};

const HashButton = ({ sha, url }: { sha: string; url: string }) => {
  const [copy, setCopy] = useState<boolean>(false);

  useEffect(() => {
    if (copy) setTimeout(() => setCopy(false), 2000);
  }, [copy]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(sha);
    setCopy(true);
  };

  return (
    <div
      className="sm:flex hidden h-7 w-28 bg-gradient-to-b from-gray-100 to-slate-100 rounded-md border-1 
  border-gray-300 hover:cursor-pointer place-items-center flex-none
    justify-around"
    >
      <div onClick={handleCopy} className="border-r border-black pl-2 pr-2">
        <img className="w-4 h-4" src={copy ? checkIcon : clipboardIcon} />
      </div>

      <a href={url}>
        <div className="p-2 text-xs group relative">
          <div className="text-center -left-12 w-32 absolute hidden group-hover:block -bottom-8 bg-black text-white p-1 rounded-md">
            View commit details
          </div>
          {sha.substring(0, 7)}
        </div>
      </a>
    </div>
  );
};
