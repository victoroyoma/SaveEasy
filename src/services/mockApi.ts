import { 
  SavingsGoal, 
  Transaction, 
  Group, 
  BillPayment, 
  Notification, 
  Investment, 
  Loan, 
  MarketplaceItem, 
  CryptoTransaction,
  Budget,
  AIConversation
} from '../types';
import { generateReference } from '../data/mockData';

// Simulate API delay
const delay = (ms: number = 1000) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API Response type
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message: string;
  error?: string;
}

// Core Banking Functions
export const mockSavingsApi = {
  // Deposit money to savings
  deposit: async (amount: number, goalId?: string): Promise<ApiResponse<Transaction>> => {
    await delay(1500);
    
    if (amount <= 0) {
      return {
        success: false,
        message: 'Invalid amount',
        error: 'Amount must be greater than 0'
      };
    }

    const transaction: Transaction = {
      id: Date.now().toString(),
      type: goalId ? 'goal_contribution' : 'deposit',
      amount,
      description: goalId ? 'Goal contribution' : 'Savings deposit',
      date: new Date().toISOString(),
      category: 'savings',
      goalId,
      status: 'completed',
      method: 'bank_transfer'
    };

    return {
      success: true,
      data: transaction,
      message: `Successfully deposited ${amount} naira`
    };
  },

  // Withdraw money from savings
  withdraw: async (amount: number, reason: string): Promise<ApiResponse<Transaction>> => {
    await delay(1500);
    
    if (amount <= 0) {
      return {
        success: false,
        message: 'Invalid amount',
        error: 'Amount must be greater than 0'
      };
    }

    // Simulate insufficient funds check
    if (amount > 50000) {
      return {
        success: false,
        message: 'Insufficient funds',
        error: 'Withdrawal amount exceeds available balance'
      };
    }

    const transaction: Transaction = {
      id: Date.now().toString(),
      type: 'withdrawal',
      amount,
      description: reason || 'Savings withdrawal',
      date: new Date().toISOString(),
      category: 'withdrawal',
      status: 'completed',
      method: 'bank_transfer'
    };

    return {
      success: true,
      data: transaction,
      message: `Successfully withdrew ${amount} naira`
    };
  },

  // Create savings goal
  createGoal: async (goalData: Partial<SavingsGoal>): Promise<ApiResponse<SavingsGoal>> => {
    await delay(1000);

    const goal: SavingsGoal = {
      id: Date.now().toString(),
      name: goalData.name || 'New Goal',
      targetAmount: goalData.targetAmount || 0,
      currentAmount: 0,
      deadline: goalData.deadline,
      category: goalData.category || 'other',
      frequency: goalData.frequency || 'monthly',
      autoSave: goalData.autoSave || false,
      createdAt: new Date().toISOString()
    };

    return {
      success: true,
      data: goal,
      message: 'Savings goal created successfully'
    };
  },

  // Access emergency fund
  accessEmergencyFund: async (amount: number, reason: string): Promise<ApiResponse<Transaction>> => {
    await delay(2000);

    if (amount <= 0) {
      return {
        success: false,
        message: 'Invalid amount',
        error: 'Amount must be greater than 0'
      };
    }

    // Simulate emergency fund limit
    if (amount > 5000) {
      return {
        success: false,
        message: 'Emergency fund limit exceeded',
        error: 'Maximum emergency withdrawal is 5,000 naira'
      };
    }

    const transaction: Transaction = {
      id: Date.now().toString(),
      type: 'withdrawal',
      amount,
      description: `Emergency: ${reason}`,
      date: new Date().toISOString(),
      category: 'emergency',
      status: 'completed',
      method: 'bank_transfer'
    };

    return {
      success: true,
      data: transaction,
      message: `Emergency fund accessed successfully`
    };
  }
};

// Group Savings Functions
export const mockGroupApi = {
  // Join a savings group
  joinGroup: async (_groupId: string): Promise<ApiResponse<Group>> => {
    await delay(2000);

    // Simulate group capacity check
    if (Math.random() < 0.1) {
      return {
        success: false,
        message: 'Group is full',
        error: 'This group has reached maximum capacity'
      };
    }

    return {
      success: true,
      message: 'Successfully joined the group! Welcome aboard.',
    };
  },

  // Create a new group
  createGroup: async (groupData: Partial<Group>): Promise<ApiResponse<Group>> => {
    await delay(1500);

    const group: Group = {
      id: Date.now().toString(),
      name: groupData.name || 'New Group',
      members: [],
      contributionAmount: groupData.contributionAmount || 1000,
      frequency: groupData.frequency || 'monthly',
      nextContribution: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      totalPool: 0,
      adminId: '1', // Current user
      rules: groupData.rules || 'Standard group rules apply',
      isActive: true,
      createdAt: new Date().toISOString()
    };

    return {
      success: true,
      data: group,
      message: 'Group created successfully'
    };
  },

  // Make group contribution
  contribute: async (groupId: string, amount: number): Promise<ApiResponse<Transaction>> => {
    await delay(1500);

    const transaction: Transaction = {
      id: Date.now().toString(),
      type: 'group_contribution',
      amount,
      description: 'Group contribution',
      date: new Date().toISOString(),
      category: 'group_savings',
      groupId,
      status: 'completed',
      method: 'mobile_money'
    };

    return {
      success: true,
      data: transaction,
      message: 'Contribution made successfully'
    };
  }
};

// Bill Payment Functions
export const mockBillApi = {
  // Pay bills (airtime, data, electricity, etc.)
  payBill: async (billData: Partial<BillPayment>): Promise<ApiResponse<BillPayment>> => {
    await delay(2500);

    // Simulate payment failure
    if (Math.random() < 0.05) {
      return {
        success: false,
        message: 'Payment failed',
        error: 'Network error. Please try again.'
      };
    }

    const payment: BillPayment = {
      id: Date.now().toString(),
      type: billData.type || 'airtime',
      provider: billData.provider || '',
      accountNumber: billData.accountNumber || '',
      amount: billData.amount || 0,
      status: 'completed',
      date: new Date().toISOString(),
      reference: generateReference()
    };

    return {
      success: true,
      data: payment,
      message: 'Bill payment successful'
    };
  },

  // Set up automatic bill payments
  setupAutoPay: async (_billData: Partial<BillPayment>, frequency: 'weekly' | 'monthly'): Promise<ApiResponse<void>> => {
    await delay(1000);

    return {
      success: true,
      message: `Auto-pay setup successful for ${frequency} payments`
    };
  }
};

// Investment Functions
export const mockInvestmentApi = {
  // Buy investment
  buyInvestment: async (investmentData: Partial<Investment>): Promise<ApiResponse<Investment>> => {
    await delay(2000);

    const investment: Investment = {
      id: Date.now().toString(),
      userId: '1',
      type: investmentData.type || 'stocks',
      name: investmentData.name || 'Investment',
      amount: investmentData.amount || 0,
      units: investmentData.units || 1,
      purchasePrice: investmentData.purchasePrice || investmentData.amount || 0,
      currentPrice: investmentData.purchasePrice || investmentData.amount || 0,
      purchaseDate: new Date().toISOString(),
      platform: investmentData.platform || 'SaveEasy Invest',
      status: 'active'
    };

    return {
      success: true,
      data: investment,
      message: 'Investment purchased successfully'
    };
  },

  // Sell investment
  sellInvestment: async (_investmentId: string): Promise<ApiResponse<Transaction>> => {
    await delay(2000);

    const transaction: Transaction = {
      id: Date.now().toString(),
      type: 'deposit',
      amount: Math.floor(Math.random() * 5000) + 1000, // Random profit/loss
      description: 'Investment sale proceeds',
      date: new Date().toISOString(),
      category: 'investment',
      status: 'completed',
      method: 'bank_transfer'
    };

    return {
      success: true,
      data: transaction,
      message: 'Investment sold successfully'
    };
  }
};

// Loan Functions
export const mockLoanApi = {
  // Apply for loan
  applyForLoan: async (loanData: Partial<Loan>): Promise<ApiResponse<Loan>> => {
    await delay(3000);

    // Simulate credit check
    if (Math.random() < 0.3) {
      return {
        success: false,
        message: 'Loan application declined',
        error: 'Credit score does not meet minimum requirements'
      };
    }

    const loan: Loan = {
      id: Date.now().toString(),
      userId: '1',
      type: loanData.type || 'personal',
      amount: loanData.amount || 0,
      interestRate: 15, // 15% annual rate
      term: loanData.term || 12,
      monthlyPayment: ((loanData.amount || 0) * 1.15) / (loanData.term || 12),
      remainingBalance: (loanData.amount || 0) * 1.15,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + (loanData.term || 12) * 30 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'pending_approval',
      lender: 'SaveEasy Loans',
      purpose: loanData.purpose || 'Personal use',
      payments: []
    };

    return {
      success: true,
      data: loan,
      message: 'Loan application submitted successfully. You will be notified within 24 hours.'
    };
  },

  // Make loan payment
  makeLoanPayment: async (_loanId: string, amount: number): Promise<ApiResponse<Transaction>> => {
    await delay(1500);

    const transaction: Transaction = {
      id: Date.now().toString(),
      type: 'withdrawal',
      amount,
      description: 'Loan repayment',
      date: new Date().toISOString(),
      category: 'loan_payment',
      status: 'completed',
      method: 'bank_transfer'
    };

    return {
      success: true,
      data: transaction,
      message: 'Loan payment successful'
    };
  }
};

// Crypto Functions
export const mockCryptoApi = {
  // Buy cryptocurrency
  buyCrypto: async (symbol: string, amount: number): Promise<ApiResponse<CryptoTransaction>> => {
    await delay(2000);

    const cryptoTransaction: CryptoTransaction = {
      id: Date.now().toString(),
      type: 'buy',
      currency: symbol,
      amount: amount / 50000, // Mock conversion rate
      usdValue: amount / 1500, // USD equivalent
      nairaValue: amount,
      fee: amount * 0.015, // 1.5% fee
      date: new Date().toISOString(),
      status: 'completed',
      txHash: `0x${Math.random().toString(16).substr(2, 40)}`
    };

    return {
      success: true,
      data: cryptoTransaction,
      message: `Successfully purchased ${symbol}`
    };
  },

  // Sell cryptocurrency
  sellCrypto: async (symbol: string, amount: number): Promise<ApiResponse<CryptoTransaction>> => {
    await delay(2000);

    const cryptoTransaction: CryptoTransaction = {
      id: Date.now().toString(),
      type: 'sell',
      currency: symbol,
      amount,
      usdValue: amount * 50000 / 1500, // Mock conversion
      nairaValue: amount * 50000,
      fee: amount * 50000 * 0.015,
      date: new Date().toISOString(),
      status: 'completed',
      txHash: `0x${Math.random().toString(16).substr(2, 40)}`
    };

    return {
      success: true,
      data: cryptoTransaction,
      message: `Successfully sold ${symbol}`
    };
  }
};

// Marketplace Functions
export const mockMarketplaceApi = {
  // List item for sale
  listItem: async (itemData: Partial<MarketplaceItem>): Promise<ApiResponse<MarketplaceItem>> => {
    await delay(1500);

    const item: MarketplaceItem = {
      id: Date.now().toString(),
      sellerId: '1',
      title: itemData.title || 'New Item',
      description: itemData.description || '',
      price: itemData.price || 0,
      category: itemData.category || 'electronics',
      images: itemData.images || [],
      location: itemData.location || 'Lagos, Nigeria',
      condition: itemData.condition || 'used',
      status: 'available',
      createdAt: new Date().toISOString(),
      views: 0,
      favorites: [],
      paymentMethods: ['cash', 'bank_transfer', 'mobile_money']
    };

    return {
      success: true,
      data: item,
      message: 'Item listed successfully'
    };
  },

  // Buy item
  buyItem: async (_itemId: string, _quantity: number): Promise<ApiResponse<void>> => {
    await delay(2000);

    return {
      success: true,
      message: 'Purchase initiated. Seller has been notified.'
    };
  }
};

// AI Assistant Functions
export const mockAIApi = {
  // Chat with AI assistant
  chat: async (message: string): Promise<ApiResponse<AIConversation>> => {
    await delay(1500);

    const responses = [
      'Based on your spending patterns, I recommend setting aside 20% of your income for savings. This will help you reach your goals faster.',
      'Your financial health looks good! Consider diversifying your investments to reduce risk.',
      'I notice you spend a lot on entertainment. Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings.',
      'Great progress on your emergency fund! Once you reach your target, consider investing in low-risk options.',
      'Your group savings are performing well. This shows excellent financial discipline.',
      'Consider automating your savings to make it easier to reach your goals consistently.'
    ];

    const conversation: AIConversation = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      userMessage: message,
      aiResponse: responses[Math.floor(Math.random() * responses.length)],
      category: 'general'
    };

    return {
      success: true,
      data: conversation,
      message: 'AI response generated'
    };
  },

  // Get financial insights
  getInsights: async (): Promise<ApiResponse<string[]>> => {
    await delay(1000);

    const insights = [
      'You could save ₦2,000 more monthly by reducing entertainment expenses',
      'Your savings rate is above average for your income bracket',
      'Consider setting up auto-save for better consistency',
      'Emergency fund target reached! Time to focus on investments',
      'Group savings are helping you stay disciplined with money'
    ];

    return {
      success: true,
      data: insights,
      message: 'Insights generated successfully'
    };
  }
};

// Budget Functions
export const mockBudgetApi = {
  // Create budget
  createBudget: async (budgetData: Partial<Budget>): Promise<ApiResponse<Budget>> => {
    await delay(1000);

    const budget: Budget = {
      id: Date.now().toString(),
      userId: '1',
      name: budgetData.name || 'Monthly Budget',
      totalAmount: budgetData.totalAmount || 50000,
      period: budgetData.period || 'monthly',
      categories: budgetData.categories || [],
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      isActive: true,
      autoTrack: budgetData.autoTrack || false
    };

    return {
      success: true,
      data: budget,
      message: 'Budget created successfully'
    };
  },

  // Track expense
  trackExpense: async (_categoryId: string, _amount: number, _description: string): Promise<ApiResponse<void>> => {
    await delay(500);

    return {
      success: true,
      message: 'Expense tracked successfully'
    };
  }
};

// Notification Functions
export const mockNotificationApi = {
  // Send notification
  sendNotification: async (notification: Partial<Notification>): Promise<ApiResponse<Notification>> => {
    await delay(500);

    const newNotification: Notification = {
      id: Date.now().toString(),
      title: notification.title || 'Notification',
      message: notification.message || '',
      type: notification.type || 'info',
      date: new Date().toISOString(),
      read: false,
      actionUrl: notification.actionUrl
    };

    return {
      success: true,
      data: newNotification,
      message: 'Notification sent'
    };
  }
};

// Voice Banking Functions
export const mockVoiceApi = {
  // Process voice command
  processVoiceCommand: async (command: string): Promise<ApiResponse<string>> => {
    await delay(1000);

    const commandLower = command.toLowerCase();
    let response = '';

    if (commandLower.includes('balance')) {
      response = 'Your current savings balance is 25,000 naira.';
    } else if (commandLower.includes('save') || commandLower.includes('deposit')) {
      response = 'I can help you save money. How much would you like to save?';
    } else if (commandLower.includes('bill') || commandLower.includes('pay')) {
      response = 'I can help you pay bills. Which service would you like to pay for?';
    } else if (commandLower.includes('goal')) {
      response = 'Your School Fees goal is 50% complete. You have saved 25,000 out of 50,000 naira.';
    } else {
      response = 'I understand you want to manage your finances. Could you be more specific about what you need help with?';
    }

    return {
      success: true,
      data: response,
      message: 'Voice command processed'
    };
  }
};

// Enhanced Banking Functions with More Realistic Simulations
export const mockEnhancedApi = {
  // Enhanced deposit with different scenarios
  simulateRealisticDeposit: async (
    amount: number, 
    source: 'salary' | 'freelance' | 'business' | 'gift' | 'bonus' = 'salary',
    goalId?: string
  ): Promise<ApiResponse<Transaction>> => {
    await delay(1200 + Math.random() * 800); // Variable realistic delay
    
    if (amount <= 0) {
      return {
        success: false,
        message: 'Invalid amount',
        error: 'Amount must be greater than 0'
      };
    }

    // Simulate daily deposit limits
    if (amount > 100000) {
      return {
        success: false,
        message: 'Daily deposit limit exceeded',
        error: 'Maximum daily deposit is ₦100,000. Contact support for higher limits.'
      };
    }

    const sourceDescriptions = {
      salary: `Monthly salary deposit`,
      freelance: `Freelance project payment`,
      business: `Business revenue deposit`,
      gift: `Gift money deposit`,
      bonus: `Performance bonus deposit`
    };

    const transaction: Transaction = {
      id: `DEP_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      type: goalId ? 'goal_contribution' : 'deposit',
      amount,
      description: sourceDescriptions[source],
      date: new Date().toISOString(),
      category: 'savings',
      goalId,
      status: 'completed',
      method: amount > 50000 ? 'bank_transfer' : 'mobile_money'
    };

    return {
      success: true,
      data: transaction,
      message: `Successfully deposited ₦${amount.toLocaleString()} from ${source}`
    };
  },

  // Enhanced withdrawal with security checks
  simulateSecureWithdrawal: async (
    amount: number, 
    purpose: 'emergency' | 'investment' | 'education' | 'business' | 'bills' | 'family',
    requirePin: boolean = true
  ): Promise<ApiResponse<Transaction>> => {
    await delay(2000 + Math.random() * 1000); // Longer delay for security
    
    if (amount <= 0) {
      return {
        success: false,
        message: 'Invalid amount',
        error: 'Amount must be greater than 0'
      };
    }

    // Simulate balance check with more realistic limits
    const mockBalance = 75000; // Simulated current balance
    if (amount > mockBalance) {
      return {
        success: false,
        message: 'Insufficient funds',
        error: `Withdrawal amount (₦${amount.toLocaleString()}) exceeds available balance (₦${mockBalance.toLocaleString()})`
      };
    }

    // Simulate daily withdrawal limits
    if (amount > 50000) {
      return {
        success: false,
        message: 'Daily withdrawal limit exceeded',
        error: 'Maximum daily withdrawal is ₦50,000 for security purposes'
      };
    }

    // Simulate PIN verification delay for large amounts
    if (requirePin && amount > 10000) {
      await delay(1500); // Additional security verification time
    }

    const purposeDescriptions = {
      emergency: 'Emergency medical expense',
      investment: 'Investment opportunity',
      education: 'School fees payment',
      business: 'Business capital withdrawal',
      bills: 'Utility bills payment',
      family: 'Family support'
    };

    const transaction: Transaction = {
      id: `WTH_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      type: 'withdrawal',
      amount,
      description: purposeDescriptions[purpose],
      date: new Date().toISOString(),
      category: purpose,
      status: 'completed',
      method: amount > 20000 ? 'bank_transfer' : 'mobile_money'
    };

    return {
      success: true,
      data: transaction,
      message: `Successfully withdrew ₦${amount.toLocaleString()} for ${purpose}`
    };
  },

  // Enhanced group joining with realistic scenarios
  simulateGroupJoining: async (
    groupType: 'professional' | 'community' | 'family' | 'business' | 'student'
  ): Promise<ApiResponse<{ groupId: string; groupName: string; contributionAmount: number }>> => {
    await delay(2500 + Math.random() * 1500); // Realistic processing time
    
    const groupTemplates = {
      professional: {
        names: ['Tech Professionals Network', 'Healthcare Workers Union', 'Teachers Cooperative', 'Engineers Circle'],
        contributions: [2000, 5000, 3000, 1500],
        successRate: 0.85
      },
      community: {
        names: ['Market Traders Association', 'Neighborhood Watch Savings', 'Local Artisans Group', 'Street Vendors Union'],
        contributions: [1000, 500, 800, 1200],
        successRate: 0.75
      },
      family: {
        names: ['Extended Family Support', 'Family Investment Circle', 'Relatives Mutual Aid', 'Family Emergency Fund'],
        contributions: [2000, 3000, 1500, 2500],
        successRate: 0.95
      },
      business: {
        names: ['Small Business Owners Circle', 'Entrepreneurs Network', 'Start-up Support Group', 'Business Growth Alliance'],
        contributions: [5000, 10000, 3000, 7500],
        successRate: 0.70
      },
      student: {
        names: ['Student Savings Collective', 'Academic Support Group', 'Graduate Fund Circle', 'Education Investment Club'],
        contributions: [500, 1000, 800, 1500],
        successRate: 0.80
      }
    };

    const template = groupTemplates[groupType];
    const randomIndex = Math.floor(Math.random() * template.names.length);
    
    // Simulate application review process
    if (Math.random() > template.successRate) {
      const reasons = [
        'Group is currently at maximum capacity',
        'Application requires additional verification',
        'Group criteria not fully met',
        'Waiting list is currently full'
      ];
      
      return {
        success: false,
        message: 'Group application pending',
        error: reasons[Math.floor(Math.random() * reasons.length)]
      };
    }

    const groupData = {
      groupId: `GRP_${groupType.toUpperCase()}_${Date.now()}`,
      groupName: template.names[randomIndex],
      contributionAmount: template.contributions[randomIndex]
    };

    return {
      success: true,
      data: groupData,
      message: `Successfully joined ${groupData.groupName}! Welcome aboard.`
    };
  },

  // Emergency fund access with enhanced security
  simulateEmergencyAccess: async (
    amount: number,
    emergencyType: 'medical' | 'job_loss' | 'family_crisis' | 'natural_disaster' | 'vehicle_breakdown',
    urgencyLevel: 'low' | 'medium' | 'high' | 'critical' = 'medium'
  ): Promise<ApiResponse<Transaction>> => {
    // Processing time based on urgency
    const processingTimes = {
      critical: 500,
      high: 1000,
      medium: 2000,
      low: 3000
    };
    
    await delay(processingTimes[urgencyLevel]);
    
    if (amount <= 0) {
      return {
        success: false,
        message: 'Invalid amount',
        error: 'Amount must be greater than 0'
      };
    }

    // Emergency fund has different limits based on emergency type
    const emergencyLimits = {
      medical: 15000,
      job_loss: 10000,
      family_crisis: 8000,
      natural_disaster: 20000,
      vehicle_breakdown: 5000
    };

    const maxLimit = emergencyLimits[emergencyType];
    if (amount > maxLimit) {
      return {
        success: false,
        message: 'Emergency fund limit exceeded',
        error: `Maximum emergency withdrawal for ${emergencyType.replace('_', ' ')} is ₦${maxLimit.toLocaleString()}`
      };
    }

    const emergencyDescriptions = {
      medical: 'Emergency medical treatment',
      job_loss: 'Temporary income loss support',
      family_crisis: 'Family emergency assistance',
      natural_disaster: 'Natural disaster relief',
      vehicle_breakdown: 'Vehicle emergency repair'
    };

    const transaction: Transaction = {
      id: `EMG_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      type: 'withdrawal',
      amount,
      description: `Emergency: ${emergencyDescriptions[emergencyType]}`,
      date: new Date().toISOString(),
      category: 'emergency',
      status: 'completed',
      method: 'bank_transfer' // Emergency funds typically use faster bank transfer
    };

    return {
      success: true,
      data: transaction,
      message: `Emergency fund accessed successfully. ₦${amount.toLocaleString()} available immediately.`
    };
  }
};

// Export all API functions
export const mockApi = {
  savings: mockSavingsApi,
  groups: mockGroupApi,
  bills: mockBillApi,
  investments: mockInvestmentApi,
  loans: mockLoanApi,
  crypto: mockCryptoApi,
  marketplace: mockMarketplaceApi,
  ai: mockAIApi,
  budget: mockBudgetApi,
  notifications: mockNotificationApi,
  voice: mockVoiceApi,
  enhanced: mockEnhancedApi
};

export default mockApi;
