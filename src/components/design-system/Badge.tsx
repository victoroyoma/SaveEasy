import React from 'react';
export type BadgeVariant = 'success' | 'primary' | 'secondary' | 'accent' | 'emergency' | 'achievement' | 'challenge';
export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';
interface BadgeProps {
  text: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  icon?: React.ReactNode;
}
export const Badge: React.FC<BadgeProps> = ({
  text,
  variant = 'primary',
  size = 'md',
  className = '',
  icon
}) => {
  const variantStyles = {
    primary: 'bg-[#228B22] text-white',
    secondary: 'bg-[#FFD700] text-[#333333]',
    accent: 'bg-[#87CEEB] text-[#333333]',
    success: 'bg-green-100 text-green-800',
    emergency: 'bg-[#FF4040] text-white',
    achievement: 'bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#333333]',
    challenge: 'bg-[#FFD700] bg-opacity-20 border border-[#FFD700] text-[#333333]'
  };
  const sizeStyles = {
    xs: 'text-xs py-0.5 px-1.5',
    sm: 'text-xs py-0.5 px-2',
    md: 'text-sm py-1 px-3',
    lg: 'text-base py-1 px-3'
  };
  return <span className={`inline-flex items-center gap-1 rounded-full font-medium ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
      {icon && icon}
      {text}
    </span>;
};