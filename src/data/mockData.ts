import { User, SavingsGoal, Transaction, Group, BillPayment, Notification, LiteracyModule, Challenge, Analytics } from '../types';

// Mock data for the application
export const mockUser: User = {
  id: '1',
  name: 'Adebayo Johnson',
  email: 'adebayo@example.com',
  phone: '+234 801 234 5678',
  joinDate: '2024-01-15',
  totalSavings: 25000,
  emergencyFund: 5000,
  hasPin: true,
  notifications: true,
  offlineMode: false
};

export const mockSavingsGoals: SavingsGoal[] = [
  {
    id: '1',
    name: 'School Fees',
    targetAmount: 50000,
    currentAmount: 25000,
    deadline: '2024-09-01',
    category: 'education',
    frequency: 'weekly',
    autoSave: true,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Business Growth',
    targetAmount: 100000,
    currentAmount: 15000,
    category: 'business',
    frequency: 'monthly',
    autoSave: false,
    createdAt: '2024-02-01'
  },
  {
    id: '3',
    name: 'Emergency Fund',
    targetAmount: 30000,
    currentAmount: 18000,
    category: 'emergency',
    frequency: 'weekly',
    autoSave: true,
    createdAt: '2024-01-01'
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'deposit',
    amount: 2000,
    description: 'Monthly salary savings',
    date: '2024-07-01',
    category: 'income',
    status: 'completed',
    method: 'bank_transfer'
  },
  {
    id: '2',
    type: 'goal_contribution',
    amount: 1000,
    description: 'School fees contribution',
    date: '2024-06-30',
    category: 'education',
    goalId: '1',
    status: 'completed',
    method: 'bank_transfer'
  },
  {
    id: '3',
    type: 'bill_payment',
    amount: 500,
    description: 'MTN Airtime',
    date: '2024-06-29',
    category: 'telecommunications',
    status: 'completed',
    method: 'mobile_money'
  },
  {
    id: '4',
    type: 'group_contribution',
    amount: 1000,
    description: 'Market Traders Group',
    date: '2024-06-28',
    category: 'group_savings',
    groupId: '1',
    status: 'completed',
    method: 'cash'
  },
  {
    id: '5',
    type: 'withdrawal',
    amount: 3000,
    description: 'Emergency medical expense',
    date: '2024-06-25',
    category: 'health',
    status: 'completed',
    method: 'bank_transfer'
  }
];

export const mockGroups: Group[] = [
  {
    id: '1',
    name: 'Market Traders',
    members: [
      { id: '1', name: 'Adebayo Johnson', joinDate: '2024-01-15', totalContributions: 12000, status: 'active', hasContributedThisCycle: true },
      { id: '2', name: 'Fatima Abdullahi', joinDate: '2024-01-20', totalContributions: 11000, status: 'active', hasContributedThisCycle: true },
      { id: '3', name: 'Chike Okafor', joinDate: '2024-02-01', totalContributions: 10000, status: 'active', hasContributedThisCycle: false },
    ],
    contributionAmount: 1000,
    frequency: 'weekly',
    nextContribution: '2024-07-08',
    totalPool: 156000,
    adminId: '2',
    rules: 'Weekly contributions of ₦1,000. Missing 2 consecutive payments results in temporary suspension.',
    isActive: true,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Family Support',
    members: [
      { id: '1', name: 'Adebayo Johnson', joinDate: '2024-03-01', totalContributions: 8000, status: 'active', hasContributedThisCycle: false },
      { id: '4', name: 'Amina Hassan', joinDate: '2024-03-01', totalContributions: 8000, status: 'active', hasContributedThisCycle: true },
      { id: '5', name: 'Tunde Adeleke', joinDate: '2024-03-15', totalContributions: 6000, status: 'active', hasContributedThisCycle: true },
    ],
    contributionAmount: 2000,
    frequency: 'monthly',
    nextContribution: '2024-08-01',
    totalPool: 44000,
    adminId: '1',
    rules: 'Monthly contributions of ₦2,000. Family members only.',
    isActive: true,
    createdAt: '2024-03-01'
  }
];

export const mockBillPayments: BillPayment[] = [
  {
    id: '1',
    type: 'airtime',
    provider: 'MTN',
    accountNumber: '08012345678',
    amount: 500,
    status: 'completed',
    date: '2024-06-29',
    reference: 'MTN123456789'
  },
  {
    id: '2',
    type: 'electricity',
    provider: 'Ikeja Electric',
    accountNumber: '1234567890',
    amount: 2000,
    status: 'completed',
    date: '2024-06-25',
    reference: 'IKEDC987654321'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Goal Achievement',
    message: 'Congratulations! You\'ve reached 50% of your School Fees goal.',
    type: 'success',
    date: '2024-07-01',
    read: false
  },
  {
    id: '2',
    title: 'Group Contribution Due',
    message: 'Your Market Traders group contribution of ₦1,000 is due tomorrow.',
    type: 'warning',
    date: '2024-07-01',
    read: false
  },
  {
    id: '3',
    title: 'New Literacy Module',
    message: 'Understanding Investments module is now available!',
    type: 'info',
    date: '2024-06-30',
    read: true
  }
];

export const mockLiteracyModules: LiteracyModule[] = [
  {
    id: '1',
    title: 'Budgeting Basics',
    description: 'Learn how to create and stick to a budget',
    content: 'Comprehensive guide to budgeting...',
    duration: 5,
    progress: 100,
    completed: true,
    locked: false,
    category: 'budgeting',
    difficulty: 'beginner',
    points: 100
  },
  {
    id: '2',
    title: 'Saving Strategies',
    description: 'Simple techniques to save money daily',
    content: 'Effective saving strategies...',
    duration: 8,
    progress: 60,
    completed: false,
    locked: false,
    category: 'saving',
    difficulty: 'beginner',
    points: 150
  },
  {
    id: '3',
    title: 'Understanding Loans',
    description: 'What you need to know before borrowing',
    content: 'Loan fundamentals...',
    duration: 10,
    progress: 0,
    completed: false,
    locked: true,
    category: 'debt',
    difficulty: 'intermediate',
    points: 200
  },
  {
    id: '4',
    title: 'Investment Basics',
    description: 'Introduction to growing your money',
    content: 'Investment fundamentals...',
    duration: 12,
    progress: 0,
    completed: false,
    locked: true,
    category: 'investing',
    difficulty: 'intermediate',
    points: 250
  }
];

export const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Jollof Savings Sprint',
    description: 'Save ₦100 daily for 30 days',
    targetAmount: 3000,
    currentAmount: 2400,
    duration: 30,
    reward: 300,
    participants: 1247,
    isActive: true,
    category: 'daily',
    name: undefined,
    progress: 0,
    currentDay: undefined,
    totalDays: undefined,
    savedAmount: function (_savedAmount: any): import("react").ReactNode {
      throw new Error('Function not implemented.');
    }
  },
  {
    id: '2',
    title: 'Emergency Fund Builder',
    description: 'Build an emergency fund of ₦10,000 in 3 months',
    targetAmount: 10000,
    currentAmount: 6500,
    duration: 90,
    reward: 1000,
    participants: 892,
    isActive: true,
    category: 'monthly',
    name: undefined,
    progress: 0,
    currentDay: undefined,
    totalDays: undefined,
    savedAmount: function (_savedAmount: any): import("react").ReactNode {
      throw new Error('Function not implemented.');
    }
  }
];

export const mockAnalytics: Analytics = {
  totalSavings: 45000,
  monthlyIncome: 75000,
  monthlyExpenses: 60000,
  savingsRate: 20,
  topSpendingCategories: [
    { category: 'Food & Dining', amount: 25000, percentage: 42 },
    { category: 'Transportation', amount: 15000, percentage: 25 },
    { category: 'Bills & Utilities', amount: 12000, percentage: 20 },
    { category: 'Entertainment', amount: 8000, percentage: 13 }
  ],
  savingsGrowth: [
    { month: 'Jan', amount: 5000 },
    { month: 'Feb', amount: 8000 },
    { month: 'Mar', amount: 12000 },
    { month: 'Apr', amount: 18000 },
    { month: 'May', amount: 25000 },
    { month: 'Jun', amount: 35000 },
    { month: 'Jul', amount: 45000 }
  ],
  goalProgress: [
    { goalName: 'School Fees', progress: 50 },
    { goalName: 'Business Growth', progress: 15 },
    { goalName: 'Emergency Fund', progress: 60 }
  ]
};

// Provider utilities
export const networkProviders = ['MTN', 'Airtel', 'Glo', '9Mobile'];
export const electricityProviders = ['Ikeja Electric', 'Eko Electric', 'Port Harcourt Electric', 'Abuja Electric', 'Kano Electric'];
export const cableTvProviders = ['DStv', 'GOtv', 'StarTimes', 'Strong'];
export const internetProviders = ['Spectranet', 'Smile', 'Swift', 'Airtel 4G'];

// Utility functions
export const formatCurrency = (amount: number, currency: string = '₦'): string => {
  return `${currency}${amount.toLocaleString()}`;
};

export const calculateSavingsRate = (savings: number, income: number): number => {
  return Math.round((savings / income) * 100);
};

export const getDaysUntilDeadline = (deadline: string): number => {
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const diffTime = deadlineDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const generateReference = (): string => {
  return 'SE' + Date.now().toString() + Math.random().toString(36).substr(2, 4).toUpperCase();
};
