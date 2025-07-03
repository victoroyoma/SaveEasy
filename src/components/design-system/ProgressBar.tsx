import React from 'react';
export type ProgressBarSize = 'xs' | 'sm' | 'md' | 'lg';
export type ProgressBarVariant = 'savings' | 'loan' | 'challenge' | 'default';
interface ProgressBarProps {
  progress: number; // 0 to 100
  size?: ProgressBarSize;
  color?: string;
  className?: string;
  showPercentage?: boolean;
  variant?: ProgressBarVariant;
  showValue?: boolean;
  currentValue?: number;
  targetValue?: number;
  currency?: string;
}
export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  size = 'md',
  color,
  className = '',
  showPercentage = false,
  variant = 'default',
  showValue = false,
  currentValue,
  targetValue,
  currency = '₦'
}) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  const sizeStyles = {
    xs: 'h-1',
    sm: 'h-2',
    md: 'h-2.5',
    lg: 'h-3'
  };
  // Determine color based on variant if not explicitly provided
  const getColor = () => {
    if (color) return color;
    switch (variant) {
      case 'savings':
        return '#228B22';
      // Forest Green
      case 'loan':
        return '#FF4040';
      // Coral Red
      case 'challenge':
        return '#FFD700';
      // Golden Yellow
      default:
        return '#228B22';
      // Default to Forest Green
    }
  };
  const barColor = getColor();
  return <div className={`w-full ${className}`}>
      {showValue && currentValue !== undefined && targetValue !== undefined && <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>
            {currency}
            {currentValue}
          </span>
          <span>{clampedProgress}% of goal</span>
          <span>
            {currency}
            {targetValue}
          </span>
        </div>}
      <div className={`w-full bg-gray-200 rounded-full ${sizeStyles[size]}`}>
        <div className="rounded-full transition-all duration-300 ease-in-out" style={{
        width: `${clampedProgress}%`,
        height: '100%',
        backgroundColor: barColor
      }} />
      </div>
      {showPercentage && !showValue && <div className="mt-1 text-xs text-right text-gray-600">
          {clampedProgress}%
        </div>}
    </div>;
};