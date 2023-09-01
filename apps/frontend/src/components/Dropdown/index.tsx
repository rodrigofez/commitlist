import { FC, useState } from 'react';

import arrowDownIcon from '../../assets/chevron-down.svg';
import branchIcon from '../../assets/git-branch.svg';
import { DropdownProps } from './types';

export const Dropdown: FC<DropdownProps> = ({ options, onSelect, value }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <>
      <div className="relative">
        <div
          role="button"
          className="px-4 bg-white justify-center gap-1 h-9 flex place-items-center 
          rounded-md border-1 hover:bg-gray-100 hover:cursor-pointer relative"
          onClick={() => setIsOpen(true)}
        >
          <img className="w-4 h-4" src={branchIcon} />
          <div>{value}</div>
          <img className="w-4 h-4" src={arrowDownIcon} />
        </div>
        {isOpen && (
          <div
            className="absolute z-10 mt-1 text-sm rounded-md bg-white 
            border-1 p-2 shadow-md whitespace-nowrap"
          >
            <ul>
              {options.map((option) => (
                <li
                  onClick={() => handleClick(option)}
                  className="hover:bg-gray-100 p-1 rounded-sm px-2 hover:cursor-pointer"
                  key={option}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {isOpen && (
        <div
          className="absolute w-screen h-screen bg-black top-0 left-0 opacity-0"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
