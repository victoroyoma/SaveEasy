import React from 'react';
export type PatternVariant = 'default' | 'solid' | 'gradient' | 'marketplace' | 'literacy' | 'savings';
interface BackgroundPatternProps {
  variant?: PatternVariant;
  className?: string;
  children?: React.ReactNode;
}
export const BackgroundPattern: React.FC<BackgroundPatternProps> = ({
  variant = 'default',
  className = '',
  children
}) => {
  let style = {};
  if (variant === 'default') {
    // Subtle Ankara-inspired pattern with geometric shapes
    style = {
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23228B22' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      backgroundColor: '#FAFAFA'
    };
  } else if (variant === 'marketplace') {
    // Marketplace pattern with more vibrant elements and Coral Red accents
    style = {
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='70' height='70' viewBox='0 0 70 70' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF4040' fill-opacity='0.05'%3E%3Cpath d='M10 10h10v10H10V10zm15 0h10v10H25V10zm15 0h10v10H40V10zM10 25h10v10H10V25zm15 0h10v10H25V25zm15 0h10v10H40V25zM10 40h10v10H10V40zm15 0h10v10H25V40zm15 0h10v10H40V40z'/%3E%3C/g%3E%3Cg fill='%23FFD700' fill-opacity='0.05'%3E%3Cpath d='M0 0h5v5H0V0zm15 0h5v5h-5V0zm15 0h5v5h-5V0zm15 0h5v5h-5V0zM0 15h5v5H0v-5zm15 0h5v5h-5v-5zm15 0h5v5h-5v-5zm15 0h5v5h-5v-5zM0 30h5v5H0v-5zm15 0h5v5h-5v-5zm15 0h5v5h-5v-5zm15 0h5v5h-5v-5z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      backgroundColor: '#FAFAFA'
    };
  } else if (variant === 'literacy') {
    // Pattern for literacy section with book-inspired elements
    style = {
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2387CEEB' fill-opacity='0.05'%3E%3Cpath d='M8 16h48v2H8v-2zm0 8h48v2H8v-2zm0 8h48v2H8v-2zm0 8h48v2H8v-2zm0 8h48v2H8v-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      backgroundColor: '#FAFAFA'
    };
  } else if (variant === 'savings') {
    // Pattern for savings section with coin-inspired elements
    style = {
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFD700' fill-opacity='0.05'%3E%3Cpath d='M30 10C16.85 10 6.18 17.58 2.8 28.36c-.35 1.12-.54 2.3-.54 3.52 0 6.52 5.33 11.84 11.9 11.84 6.56 0 11.9-5.32 11.9-11.84 0-6.52-5.34-11.84-11.9-11.84-1.24 0-2.44.2-3.56.55C14.18 15.6 21.75 12 30 12s15.82 3.6 19.3 8.59a11.9 11.9 0 0 0-3.55-.55c-6.57 0-11.9 5.32-11.9 11.84 0 6.52 5.33 11.84 11.9 11.84 6.56 0 11.9-5.32 11.9-11.84 0-1.22-.2-2.4-.55-3.52C53.82 17.58 43.15 10 30 10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      backgroundColor: '#FAFAFA'
    };
  } else if (variant === 'solid') {
    // Fallback solid background for low-bandwidth users
    style = {
      backgroundColor: '#F5F5F5'
    };
  } else if (variant === 'gradient') {
    // Subtle gradient background
    style = {
      background: 'linear-gradient(to bottom, #FAFAFA, #F0F0F0)'
    };
  }
  return <div className={`w-full h-full ${className}`} style={style}>
      {children}
    </div>;
};