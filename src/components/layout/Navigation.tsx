import React from 'react';
import { Icon, IconType } from '../design-system/Icon';
interface NavigationItem {
  name: string;
  icon: IconType;
  active?: boolean;
  onClick?: () => void;
}
interface NavigationProps {
  items: NavigationItem[];
}
export const Navigation: React.FC<NavigationProps> = ({
  items
}) => {
  return <nav className="bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] fixed bottom-0 left-0 right-0 border-t border-gray-100">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {items.map(item => <button key={item.name} className={`flex flex-col items-center py-2.5 px-2 w-full relative ${item.active ? 'text-[#228B22]' : 'text-gray-500 hover:text-[#228B22]'}`} onClick={item.onClick}>
            {item.active && <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-[#228B22] rounded-b-full" />}
            <Icon name={item.icon} color={item.active ? '#228B22' : '#999999'} size={22} />
            <span className={`text-xs mt-1 ${item.active ? 'font-medium' : ''}`}>
              {item.name}
            </span>
          </button>)}
      </div>
    </nav>;
};