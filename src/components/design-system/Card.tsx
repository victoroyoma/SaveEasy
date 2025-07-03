import React from 'react';
export type CardVariant = 'default' | 'elevated' | 'bordered' | 'highlight' | 'savings' | 'literacy' | 'group' | 'loan' | 'marketplace' | 'challenge' | 'emergency';
interface CardProps {
  variant?: CardVariant;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  footer?: React.ReactNode;
}
export const Card: React.FC<CardProps> = ({
  variant = 'default',
  children,
  className = '',
  onClick,
  title,
  subtitle,
  icon,
  footer
}) => {
  const baseStyles = 'rounded-lg p-4 transition-all duration-200';
  const variantStyles = {
    default: 'bg-white border border-gray-200',
    elevated: 'bg-white shadow-md hover:shadow-lg',
    bordered: 'bg-white border-2 border-gray-200',
    highlight: 'bg-white border border-l-4 border-l-[#228B22] shadow-sm',
    savings: 'bg-gradient-to-br from-[#1A6B1A] to-[#228B22] text-white',
    literacy: 'bg-white border-l-4 border-l-[#FFD700]',
    group: 'bg-white border-l-4 border-l-[#87CEEB]',
    loan: 'bg-white border border-[#87CEEB] border-opacity-50',
    marketplace: 'bg-white shadow-sm hover:shadow',
    challenge: 'bg-white border-l-4 border-l-[#FFD700] shadow-sm',
    emergency: 'bg-white border-l-4 border-l-[#FF4040]'
  };
  const clickableStyles = onClick ? 'cursor-pointer hover:shadow-md active:scale-[0.99] transition-all' : '';
  return <div className={`${baseStyles} ${variantStyles[variant]} ${clickableStyles} ${className}`} onClick={onClick}>
      {(title || icon) && <div className="flex items-center mb-3">
          {icon && <div className="mr-3">{icon}</div>}
          <div>
            {title && <h3 className="font-medium text-inherit">{title}</h3>}
            {subtitle && <p className="text-sm opacity-80">{subtitle}</p>}
          </div>
        </div>}
      {children}
      {footer && <div className="mt-4 pt-3 border-t border-gray-200">{footer}</div>}
    </div>;
};