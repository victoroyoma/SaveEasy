import React from 'react';
import { Icon } from '../design-system/Icon';
interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
  showProfileButton?: boolean;
  onProfileClick?: () => void;
}
export const Header: React.FC<HeaderProps> = ({
  title = 'SaveEasy Africa',
  showBackButton = false,
  onBackClick,
  showProfileButton = true,
  onProfileClick
}) => {
  return <header className="bg-gradient-to-r from-[#1A6B1A] to-[#228B22] text-white p-4 flex items-center justify-between shadow-md sticky top-0 z-10">
      <div className="flex items-center">
        {showBackButton && <button onClick={onBackClick} className="mr-3 p-2 rounded-full hover:bg-white hover:bg-opacity-20 active:bg-opacity-30 transition-colors" aria-label="Go back">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>}
        <div className="flex items-center">
          <div className="w-9 h-9 mr-3 rounded-full bg-white flex items-center justify-center shadow-sm">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5Z" fill="#228B22" stroke="#228B22" strokeWidth="2" />
              <path d="M12 8V12L14 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="text-xl font-bold">{title}</h1>
        </div>
      </div>
      {showProfileButton && <button onClick={onProfileClick} className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 active:bg-opacity-30 transition-colors" aria-label="Profile">
          <Icon name="profile" color="white" size={22} />
        </button>}
    </header>;
};