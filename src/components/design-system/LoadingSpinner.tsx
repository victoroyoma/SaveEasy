import React from 'react';
export type SpinnerSize = 'sm' | 'md' | 'lg';
export type SpinnerVariant = 'default' | 'primary' | 'secondary' | 'emergency';
interface LoadingSpinnerProps {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  className?: string;
}
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  variant = 'default',
  className = ''
}) => {
  const sizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };
  const variantColors = {
    default: '#87CEEB',
    primary: '#228B22',
    secondary: '#FFD700',
    emergency: '#FF4040' // Coral Red
  };
  const color = variantColors[variant];
  return <div className={`flex justify-center items-center ${className}`}>
      <svg className={`animate-spin ${sizeStyles[size]}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke={color} strokeWidth="4" />
        <path className="opacity-75" fill={color} d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    </div>;
};