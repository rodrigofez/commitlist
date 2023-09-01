import { FC } from 'react';
import { TabsProps } from './types';
import { Link } from 'react-router-dom';

export const Tabs: FC<TabsProps> = ({ options, value }) => {
  return (
    <ul className="relative w-fit flex gap-2 z-0 bg-white m-4 rounded-full p-2 border-1">
      <div
        style={{
          translate: `${
            104 * options.findIndex((option) => option.value == value)
          }px`,
        }}
        className={`w-24 absolute bg-gray-100 transition-all left-2 h-10 rounded-full -z-10`}
      />
      {options.map((option) => (
        <Link key={option.value} to={option.value}>
          <li
            key={option.value}
            className={`z-10 text-md font-semibold w-24  p-2 rounded-full text-center cursor-pointer 
            transition-all ${value == option.value ? '' : 'hover:bg-gray-50 '}`}
          >
            {option.label}
          </li>
        </Link>
      ))}
    </ul>
  );
};
