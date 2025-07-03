import { ReactNode } from "react";

// Data Management and Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  joinDate: string;
  totalSavings: number;
  emergencyFund: number;
  hasPin: boolean;
  notifications: boolean;
  offlineMode: boolean;
  // Enhanced features
  creditScore?: number;
  riskProfile?: 'conservative' | 'moderate' | 'aggressive';
  monthlyIncome?: number;
  verificationStatus?: 'unverified' | 'basic' | 'premium';
  referralCode?: string;
  totalReferrals?: number;
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: string;
  category: 'emergency' | 'education' | 'business' | 'housing' | 'other';
  frequency: 'daily' | 'weekly' | 'monthly';
  autoSave: boolean;
  createdAt: string;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'bill_payment' | 'group_contribution' | 'goal_contribution';
  amount: number;
  description: string;
  date: string;
  category: string;
  goalId?: string;
  groupId?: string;
  status: 'completed' | 'pending' | 'failed';
  method: 'bank_transfer' | 'card' | 'cash' | 'mobile_money';
}

export interface Group {
  id: string;
  name: string;
  members: GroupMember[];
  contributionAmount: number;
  frequency: 'weekly' | 'monthly';
  nextContribution: string;
  totalPool: number;
  adminId: string;
  rules: string;
  isActive: boolean;
  createdAt: string;
}

export interface GroupMember {
  id: string;
  name: string;
  joinDate: string;
  totalContributions: number;
  status: 'active' | 'inactive';
  hasContributedThisCycle: boolean;
}

export interface BillPayment {
  id: string;
  type: 'airtime' | 'data' | 'electricity' | 'cable_tv' | 'water' | 'internet';
  provider: string;
  accountNumber: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  reference: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  date: string;
  read: boolean;
  actionUrl?: string;
}

export interface LiteracyModule {
  id: string;
  title: string;
  description: string;
  content: string;
  duration: number; // in minutes
  progress: number;
  completed: boolean;
  locked: boolean;
  category: 'budgeting' | 'saving' | 'investing' | 'business' | 'debt';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  points: number;
}

export interface Challenge {
  name: ReactNode;
  progress: number;
  currentDay: ReactNode;
  totalDays: ReactNode;
  savedAmount(savedAmount: any): import("react").ReactNode;
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  duration: number; // in days
  reward: number;
  participants: number;
  isActive: boolean;
  category: 'daily' | 'weekly' | 'monthly';
}

export interface Analytics {
  totalSavings: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savingsRate: number;
  topSpendingCategories: Array<{
    category: string;
    amount: number;
    percentage: number;
  }>;
  savingsGrowth: Array<{
    month: string;
    amount: number;
  }>;
  goalProgress: Array<{
    goalName: string;
    progress: number;
  }>;
}

// NEW ENHANCED TYPES

export interface AIAssistant {
  id: string;
  userId: string;
  conversations: AIConversation[];
  insights: AIInsight[];
  recommendations: AIRecommendation[];
}

export interface AIConversation {
  id: string;
  timestamp: string;
  userMessage: string;
  aiResponse: string;
  category: 'savings' | 'budgeting' | 'investments' | 'general';
}

export interface AIInsight {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: string;
  actionable: boolean;
  createdAt: string;
}

export interface AIRecommendation {
  id: string;
  title: string;
  description: string;
  expectedBenefit: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  priority: number;
  createdAt: string;
}

export interface Budget {
  id: string;
  userId: string;
  name: string;
  totalAmount: number;
  period: 'weekly' | 'monthly' | 'yearly';
  categories: BudgetCategory[];
  startDate: string;
  endDate: string;
  isActive: boolean;
  autoTrack: boolean;
}

export interface BudgetCategory {
  id: string;
  name: string;
  allocatedAmount: number;
  spentAmount: number;
  color: string;
  icon: string;
  isEssential: boolean;
}

export interface Investment {
  id: string;
  userId: string;
  type: 'stocks' | 'bonds' | 'mutual_funds' | 'crypto' | 'real_estate' | 'treasury_bills';
  name: string;
  symbol?: string;
  amount: number;
  units: number;
  purchasePrice: number;
  currentPrice: number;
  purchaseDate: string;
  platform: string;
  status: 'active' | 'sold' | 'pending';
  dividends?: InvestmentDividend[];
}

export interface InvestmentDividend {
  id: string;
  amount: number;
  date: string;
  type: 'dividend' | 'interest' | 'capital_gains';
}

export interface Portfolio {
  id: string;
  userId: string;
  name: string;
  totalValue: number;
  dayChange: number;
  dayChangePercentage: number;
  totalGain: number;
  totalGainPercentage: number;
  investments: Investment[];
  assetAllocation: AssetAllocation[];
}

export interface AssetAllocation {
  type: string;
  percentage: number;
  value: number;
  color: string;
}

export interface Loan {
  id: string;
  userId: string;
  type: 'personal' | 'business' | 'emergency' | 'education';
  amount: number;
  interestRate: number;
  term: number; // in months
  monthlyPayment: number;
  remainingBalance: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'paid_off' | 'defaulted' | 'pending_approval';
  lender: string;
  purpose: string;
  collateral?: string;
  payments: LoanPayment[];
}

export interface LoanPayment {
  id: string;
  amount: number;
  date: string;
  principalAmount: number;
  interestAmount: number;
  remainingBalance: number;
  status: 'completed' | 'pending' | 'overdue';
}

export interface CryptoWallet {
  id: string;
  userId: string;
  walletAddress: string;
  balance: CryptoCurrency[];
  transactions: CryptoTransaction[];
  stakingRewards: StakingReward[];
}

export interface CryptoCurrency {
  symbol: string;
  name: string;
  amount: number;
  usdValue: number;
  nairaValue: number;
  change24h: number;
  change24hPercentage: number;
}

export interface CryptoTransaction {
  id: string;
  type: 'buy' | 'sell' | 'send' | 'receive' | 'stake' | 'unstake';
  currency: string;
  amount: number;
  usdValue: number;
  nairaValue: number;
  fee: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  txHash?: string;
}

export interface StakingReward {
  id: string;
  currency: string;
  amount: number;
  usdValue: number;
  date: string;
  stakingPeriod: number;
  apy: number;
}

export interface SecuritySettings {
  id: string;
  userId: string;
  biometricEnabled: boolean;
  twoFactorEnabled: boolean;
  transactionPin: boolean;
  sessionTimeout: number;
  allowedDevices: string[];
  loginAttempts: number;
  lastLoginAt: string;
  securityQuestions: SecurityQuestion[];
}

export interface SecurityQuestion {
  id: string;
  question: string;
  hashedAnswer: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  category: 'savings' | 'learning' | 'social' | 'investment' | 'budget';
  requirement: string;
  isUnlocked: boolean;
  unlockedAt?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface SocialProfile {
  id: string;
  userId: string;
  displayName: string;
  bio: string;
  avatar: string;
  level: number;
  points: number;
  achievements: Achievement[];
  followers: string[];
  following: string[];
  posts: SocialPost[];
  privacy: 'public' | 'friends' | 'private';
}

export interface SocialPost {
  id: string;
  userId: string;
  content: string;
  type: 'achievement' | 'tip' | 'goal' | 'general';
  likes: string[];
  comments: SocialComment[];
  createdAt: string;
  isPublic: boolean;
}

export interface SocialComment {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
  likes: string[];
}

export interface MarketplaceItem {
  id: string;
  sellerId: string;
  title: string;
  description: string;
  price: number;
  category: 'electronics' | 'fashion' | 'food' | 'services' | 'education';
  images: string[];
  location: string;
  condition: 'new' | 'used' | 'refurbished';
  status: 'available' | 'sold' | 'reserved';
  createdAt: string;
  views: number;
  favorites: string[];
  paymentMethods: ('cash' | 'bank_transfer' | 'mobile_money' | 'crypto')[];
}

export interface MarketplaceOrder {
  id: string;
  buyerId: string;
  sellerId: string;
  itemId: string;
  quantity: number;
  totalAmount: number;
  paymentMethod: string;
  deliveryAddress: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  messages: OrderMessage[];
}

export interface OrderMessage {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'location';
}

export interface VoiceCommand {
  id: string;
  userId: string;
  command: string;
  response: string;
  action: string;
  timestamp: string;
  success: boolean;
}

export interface AccessibilitySettings {
  id: string;
  userId: string;
  fontSize: 'small' | 'medium' | 'large' | 'extra_large';
  highContrast: boolean;
  voiceNavigation: boolean;
  screenReader: boolean;
  reducedMotion: boolean;
  language: string;
  currency: string;
}

export interface DataExport {
  id: string;
  userId: string;
  type: 'transactions' | 'budget' | 'investments' | 'complete';
  format: 'pdf' | 'csv' | 'excel' | 'json';
  dateRange: {
    start: string;
    end: string;
  };
  status: 'pending' | 'completed' | 'failed';
  downloadUrl?: string;
  createdAt: string;
  expiresAt: string;
}

export interface FinancialGoal {
  id: string;
  userId: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  category: 'short_term' | 'medium_term' | 'long_term';
  priority: 'low' | 'medium' | 'high';
  milestones: GoalMilestone[];
  autoContribute: boolean;
  contributionAmount?: number;
  contributionFrequency?: 'daily' | 'weekly' | 'monthly';
  status: 'active' | 'paused' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface GoalMilestone {
  id: string;
  title: string;
  targetAmount: number;
  targetDate: string;
  isCompleted: boolean;
  completedAt?: string;
  reward?: string;
}
