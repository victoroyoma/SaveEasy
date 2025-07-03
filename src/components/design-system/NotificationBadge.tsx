import React from 'react';
interface NotificationBadgeProps {
  count?: number;
  showZero?: boolean;
  maxCount?: number;
  className?: string;
}
export const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  count = 0,
  showZero = false,
  maxCount = 99,
  className = ''
}) => {
  if (count === 0 && !showZero) {
    return null;
  }
  const displayCount = count > maxCount ? `${maxCount}+` : count.toString();
  return <span className={`inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1 rounded-full text-xs font-medium bg-[#FF4040] text-white ${className}`}>
      {displayCount}
    </span>;
};