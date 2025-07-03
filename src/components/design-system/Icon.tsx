import React, { Component } from 'react';
import { PiggyBank, BookOpen, Users, Receipt, BarChart3, CloudOff, Target, Bell, User, Home, Coins, HandCoins, ShoppingCart, Trophy, LifeBuoy } from 'lucide-react';
export type IconType = 'savings' | 'literacy' | 'community' | 'bills' | 'budgeting' | 'offline' | 'goals' | 'notifications' | 'profile' | 'home' | 'crypto' | 'loans' | 'marketplace' | 'challenges' | 'emergency';
interface IconProps {
  name: IconType;
  size?: number;
  color?: string;
  className?: string;
  variant?: 'default' | 'monochrome';
}
export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color,
  className = '',
  variant = 'default'
}) => {
  // Default colors based on icon type
  const getDefaultColor = () => {
    switch (name) {
      case 'savings':
      case 'budgeting':
      case 'goals':
      case 'home':
        return '#228B22';
      // Forest Green
      case 'literacy':
      case 'challenges':
      case 'crypto':
        return '#FFD700';
      // Golden Yellow
      case 'community':
      case 'bills':
      case 'profile':
      case 'notifications':
      case 'offline':
      case 'marketplace':
      case 'loans':
        return '#87CEEB';
      // Sky Blue
      case 'emergency':
        return '#FF4040';
      // Coral Red
      default:
        return '#87CEEB';
      // Default to Sky Blue
    }
  };
  // Use provided color or default color based on variant
  const iconColor = color || (variant === 'monochrome' ? '#555555' : getDefaultColor());
  const iconMap = {
    savings: PiggyBank,
    literacy: BookOpen,
    community: Users,
    bills: Receipt,
    budgeting: BarChart3,
    offline: CloudOff,
    goals: Target,
    notifications: Bell,
    profile: User,
    home: Home,
    crypto: Coins,
    loans: HandCoins,
    marketplace: ShoppingCart,
    challenges: Trophy,
    emergency: LifeBuoy
  };
  const IconComponent = iconMap[name];
  if (!IconComponent) {
    return null;
  }
  return <IconComponent size={size} color={iconColor} className={className} />;
};