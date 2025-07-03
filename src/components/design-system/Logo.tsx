import React from 'react';
interface LogoProps {
  variant?: 'full' | 'icon' | 'text';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  size = 'md',
  className = ''
}) => {
  const sizeStyles = {
    sm: variant === 'icon' ? 'w-8 h-8' : 'h-8',
    md: variant === 'icon' ? 'w-10 h-10' : 'h-10',
    lg: variant === 'icon' ? 'w-12 h-12' : 'h-12'
  };
  if (variant === 'icon') {
    return <div className={`${sizeStyles[size]} ${className}`}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <circle cx="32" cy="32" r="28" fill="#228B22" />
          <path d="M32 12C20.95 12 12 20.95 12 32C12 43.05 20.95 52 32 52C43.05 52 52 43.05 52 32C52 20.95 43.05 12 32 12ZM32 48C23.18 48 16 40.82 16 32C16 23.18 23.18 16 32 16C40.82 16 48 23.18 48 32C48 40.82 40.82 48 32 48Z" fill="#FFD700" />
          <path d="M32 20C25.37 20 20 25.37 20 32C20 38.63 25.37 44 32 44C38.63 44 44 38.63 44 32C44 25.37 38.63 20 32 20ZM32 40C27.59 40 24 36.41 24 32C24 27.59 27.59 24 32 24C36.41 24 40 27.59 40 32C40 36.41 36.41 40 32 40Z" fill="#228B22" />
          <path d="M32 28C29.79 28 28 29.79 28 32C28 34.21 29.79 36 32 36C34.21 36 36 34.21 36 32C36 29.79 34.21 28 32 28Z" fill="#FFD700" />
        </svg>
      </div>;
  }
  if (variant === 'text') {
    return <div className={`${sizeStyles[size]} ${className} flex items-center`}>
        <span className="text-[#228B22] font-bold text-xl">SaveEasy</span>
        <span className="text-[#FFD700] font-bold text-xl">Africa</span>
      </div>;
  }
  // Full logo (default)
  return <div className={`${sizeStyles[size]} ${className} flex items-center`}>
      <div className={`${size === 'sm' ? 'w-8 h-8' : size === 'md' ? 'w-10 h-10' : 'w-12 h-12'} mr-2`}>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <circle cx="32" cy="32" r="28" fill="#228B22" />
          <path d="M32 12C20.95 12 12 20.95 12 32C12 43.05 20.95 52 32 52C43.05 52 52 43.05 52 32C52 20.95 43.05 12 32 12ZM32 48C23.18 48 16 40.82 16 32C16 23.18 23.18 16 32 16C40.82 16 48 23.18 48 32C48 40.82 40.82 48 32 48Z" fill="#FFD700" />
          <path d="M32 20C25.37 20 20 25.37 20 32C20 38.63 25.37 44 32 44C38.63 44 44 38.63 44 32C44 25.37 38.63 20 32 20ZM32 40C27.59 40 24 36.41 24 32C24 27.59 27.59 24 32 24C36.41 24 40 27.59 40 32C40 36.41 36.41 40 32 40Z" fill="#228B22" />
          <path d="M32 28C29.79 28 28 29.79 28 32C28 34.21 29.79 36 32 36C34.21 36 36 34.21 36 32C36 29.79 34.21 28 32 28Z" fill="#FFD700" />
        </svg>
      </div>
      <div>
        <span className="text-[#228B22] font-bold text-xl">SaveEasy</span>
        <span className="text-[#FFD700] font-bold text-xl">Africa</span>
      </div>
    </div>;
};