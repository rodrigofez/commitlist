import { ReactNode } from 'react';

const Error = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="font-semibold text-lg">
        {children ?? 'Oops! There was an error'}
      </div>
    </div>
  );
};

export default Error;
