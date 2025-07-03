import React from 'react';
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text' | 'emergency';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';
interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
}
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  fullWidth = false,
  className = '',
  type = 'button',
  icon,
  iconPosition = 'left',
  loading = false
}) => {
  const baseStyles = 'font-medium rounded-lg transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantStyles = {
    primary: 'bg-[#228B22] hover:bg-[#2EA62E] active:bg-[#1A6B1A] text-white focus:ring-[#228B22] shadow-sm hover:shadow',
    secondary: 'bg-[#FFD700] hover:bg-[#FFDF33] active:bg-[#CCAC00] text-[#333333] focus:ring-[#FFD700] shadow-sm hover:shadow',
    outline: 'border-2 border-[#87CEEB] text-[#87CEEB] hover:bg-[#87CEEB] hover:bg-opacity-10 active:bg-opacity-20 focus:ring-[#87CEEB]',
    text: 'text-[#228B22] hover:bg-[#228B22] hover:bg-opacity-10 active:bg-opacity-20 focus:ring-[#228B22]',
    emergency: 'bg-[#FF4040] hover:bg-[#FF5A5A] active:bg-[#CC3333] text-white focus:ring-[#FF4040] shadow-sm hover:shadow'
  };
  const sizeStyles = {
    xs: 'text-xs py-1 px-2 gap-1',
    sm: 'text-sm py-1.5 px-3 gap-1.5',
    md: 'text-base py-2.5 px-4 gap-2',
    lg: 'text-lg py-3 px-6 gap-2'
  };
  const widthStyle = fullWidth ? 'w-full' : '';
  const disabledStyle = disabled || loading ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer';
  return <button type={type} onClick={onClick} disabled={disabled || loading} className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${disabledStyle} ${className}`}>
      {loading ? <span className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </span> : <>
          {icon && iconPosition === 'left' && <span className="flex items-center justify-center">{icon}</span>}
          <span>{children}</span>
          {icon && iconPosition === 'right' && <span className="flex items-center justify-center">{icon}</span>}
        </>}
    </button>;
};