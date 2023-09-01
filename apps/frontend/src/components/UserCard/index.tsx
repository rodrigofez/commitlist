import { FC } from 'react';
import { UserCardProps } from './types';

export const UserCard: FC<UserCardProps> = ({
  avatar,
  username,
  name,
  githubUrl,
  email,
}) => {
  return (
    <div
      role="user-card"
      className="hidden absolute bg-white p-4 group-hover:flex gap-2 flex-col border-1 rounded-md shadow-md w-fit"
    >
      <img className="bg-gray-100 w-12 h-12 rounded-full" src={avatar}></img>
      <div className="text-sm flex gap-1">
        <a className="hover:text-indigo-600 font-semibold" href={githubUrl}>
          {name}
        </a>
        <a className="hover:text-indigo-600" href={githubUrl}>
          {username}
        </a>
      </div>
      <div className="text-xs">{email}</div>
    </div>
  );
};
