import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import logo from '../assets/logo.svg';
import settingsIcon from '../assets/settings.svg';
import { Tabs } from '../components/Tabs';
import { ConfigModal } from '../components/ConfigModal';

const navLinks = [
  { label: 'Home', value: '/' },
  { label: 'Graph', value: '/graph' },
];

export default function Header() {
  const location = useLocation();

  const [isOpenConfig, setOpenConfig] = useState<boolean>(false);

  const blockScroll = () => {
    document.body.style.overflow = 'hidden';
  };

  const enableScroll = () => {
    document.body.style.overflow = 'visible';
  };

  return (
    <>
      <ConfigModal
        isOpen={isOpenConfig}
        onClose={() => {
          setOpenConfig(false);
          enableScroll();
        }}
      />
      <header className="flex flex-col items-center mt-8 gap-2">
        <button
          onClick={() => {
            setOpenConfig(true);
            blockScroll();
          }}
          className="absolute hover:scale-95 hover:bg-gray-50 transition-all right-4 top-4 bg-white p-2 border-1 rounded-md"
        >
          <img src={settingsIcon} />
        </button>
        <img src={logo} className="w-24 h-24"></img>
        <nav className="flex justify-center">
          <Tabs options={navLinks} value={location.pathname} />
        </nav>
      </header>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
