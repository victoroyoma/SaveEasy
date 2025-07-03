import { mockApi } from './mockApi';
import { useAppActions } from '../context/AppContext';

// Demo service to showcase all features
export class DemoService {
  private actions: ReturnType<typeof useAppActions>;

  constructor(actions: ReturnType<typeof useAppActions>) {
    this.actions = actions;
  }

  // Run a complete demo flow
  async runCompleteDemo(): Promise<void> {
    console.log('🚀 Starting SaveEasy Demo...');
    
    try {
      // 1. Savings Demo
      await this.demonstrateSavings();
      
      // 2. Group Savings Demo
      await this.demonstrateGroupSavings();
      
      // 3. Bill Payment Demo
      await this.demonstrateBillPayments();
      
      // 4. Investment Demo
      await this.demonstrateInvestments();
      
      // 5. Loan Demo
      await this.demonstrateLoans();
      
      // 6. AI Assistant Demo
      await this.demonstrateAI();
      
      // 7. Marketplace Demo
      await this.demonstrateMarketplace();
      
      // 8. Crypto Demo
      await this.demonstrateCrypto();

      console.log('✅ Demo completed successfully!');
      
      // Send completion notification
      await this.sendDemoNotification('Demo Completed', 'Welcome to SaveEasy! All features have been demonstrated.', 'success');
      
    } catch (error) {
      console.error('❌ Demo failed:', error);
    }
  }

  // Demonstrate savings features
  private async demonstrateSavings(): Promise<void> {
    console.log('💰 Demonstrating Savings Features...');
    
    // Create a savings goal
    const goalResult = await mockApi.savings.createGoal({
      name: 'Vacation Fund',
      targetAmount: 50000,
      category: 'other',
      frequency: 'monthly',
      autoSave: true
    });

    if (goalResult.success && goalResult.data) {
      this.actions.addSavingsGoal(goalResult.data);
      await this.sendDemoNotification('New Goal Created', 'Vacation Fund goal created successfully!', 'success');
    }

    // Make a deposit
    const depositResult = await mockApi.savings.deposit(5000, goalResult.data?.id);
    if (depositResult.success && depositResult.data) {
      this.actions.addTransaction(depositResult.data);
      await this.sendDemoNotification('Deposit Successful', '₦5,000 deposited to your Vacation Fund!', 'success');
    }

    // Access emergency fund
    const emergencyResult = await mockApi.savings.accessEmergencyFund(2000, 'Medical emergency');
    if (emergencyResult.success && emergencyResult.data) {
      this.actions.addTransaction(emergencyResult.data);
      await this.sendDemoNotification('Emergency Fund Accessed', '₦2,000 withdrawn for medical emergency', 'warning');
    }
  }

  // Demonstrate group savings
  private async demonstrateGroupSavings(): Promise<void> {
    console.log('👥 Demonstrating Group Savings...');
    
    // Join a group
    const joinResult = await mockApi.groups.joinGroup('demo-group-1');
    if (joinResult.success) {
      await this.sendDemoNotification('Group Joined', 'Welcome to the Tech Professionals group!', 'success');
    }

    // Make group contribution
    const contributionResult = await mockApi.groups.contribute('demo-group-1', 1500);
    if (contributionResult.success && contributionResult.data) {
      this.actions.addTransaction(contributionResult.data);
      await this.sendDemoNotification('Group Contribution', '₦1,500 contributed to Tech Professionals group', 'success');
    }
  }

  // Demonstrate bill payments
  private async demonstrateBillPayments(): Promise<void> {
    console.log('📱 Demonstrating Bill Payments...');
    
    // Pay airtime
    const airtimeResult = await mockApi.bills.payBill({
      type: 'airtime',
      provider: 'MTN',
      accountNumber: '08012345678',
      amount: 1000
    });

    if (airtimeResult.success && airtimeResult.data) {
      this.actions.addBillPayment(airtimeResult.data);
      this.actions.addTransaction({
        id: Date.now().toString(),
        type: 'bill_payment',
        amount: 1000,
        description: 'MTN Airtime',
        date: new Date().toISOString(),
        category: 'telecommunications',
        status: 'completed',
        method: 'mobile_money'
      });
      await this.sendDemoNotification('Bill Payment', 'MTN airtime payment successful!', 'success');
    }

    // Pay electricity bill
    const electricityResult = await mockApi.bills.payBill({
      type: 'electricity',
      provider: 'Ikeja Electric',
      accountNumber: '1234567890',
      amount: 3500
    });

    if (electricityResult.success && electricityResult.data) {
      this.actions.addBillPayment(electricityResult.data);
      this.actions.addTransaction({
        id: (Date.now() + 1).toString(),
        type: 'bill_payment',
        amount: 3500,
        description: 'Electricity Bill',
        date: new Date().toISOString(),
        category: 'utilities',
        status: 'completed',
        method: 'bank_transfer'
      });
      await this.sendDemoNotification('Bill Payment', 'Electricity bill payment successful!', 'success');
    }
  }

  // Demonstrate investments
  private async demonstrateInvestments(): Promise<void> {
    console.log('📈 Demonstrating Investments...');
    
    // Buy treasury bills
    const tbillResult = await mockApi.investments.buyInvestment({
      type: 'treasury_bills',
      name: 'Nigerian Treasury Bills - 91 Days',
      amount: 10000,
      units: 1,
      purchasePrice: 10000,
      platform: 'SaveEasy Invest'
    });

    if (tbillResult.success) {
      await this.sendDemoNotification('Investment Purchase', 'Treasury Bills purchased successfully! Expected return: 8.5% APY', 'success');
    }

    // Buy mutual fund
    const mutualFundResult = await mockApi.investments.buyInvestment({
      type: 'mutual_funds',
      name: 'Stanbic IBTC Balanced Fund',
      amount: 5000,
      units: 50,
      purchasePrice: 100,
      platform: 'SaveEasy Invest'
    });

    if (mutualFundResult.success) {
      await this.sendDemoNotification('Investment Purchase', 'Mutual Fund investment successful!', 'success');
    }
  }

  // Demonstrate loans
  private async demonstrateLoans(): Promise<void> {
    console.log('💳 Demonstrating Loans...');
    
    // Apply for personal loan
    const loanResult = await mockApi.loans.applyForLoan({
      type: 'personal',
      amount: 25000,
      term: 6,
      purpose: 'Business expansion'
    });

    if (loanResult.success) {
      await this.sendDemoNotification('Loan Application', 'Loan application submitted! You will hear from us within 24 hours.', 'info');
    } else {
      await this.sendDemoNotification('Loan Application', loanResult.message, 'warning');
    }
  }

  // Demonstrate AI assistant
  private async demonstrateAI(): Promise<void> {
    console.log('🤖 Demonstrating AI Assistant...');
    
    // Chat with AI
    const chatResult = await mockApi.ai.chat('How can I improve my savings rate?');
    if (chatResult.success && chatResult.data) {
      await this.sendDemoNotification('AI Assistant', 'AI has provided personalized financial advice!', 'info');
    }

    // Get insights
    const insightsResult = await mockApi.ai.getInsights();
    if (insightsResult.success && insightsResult.data) {
      await this.sendDemoNotification('AI Insights', `New insight: ${insightsResult.data[0]}`, 'info');
    }
  }

  // Demonstrate marketplace
  private async demonstrateMarketplace(): Promise<void> {
    console.log('🛒 Demonstrating Marketplace...');
    
    // List an item
    const listResult = await mockApi.marketplace.listItem({
      title: 'iPhone 13 Pro Max',
      description: 'Excellent condition, barely used. Comes with original box and accessories.',
      price: 350000,
      category: 'electronics',
      condition: 'used',
      location: 'Lagos, Victoria Island'
    });

    if (listResult.success) {
      await this.sendDemoNotification('Item Listed', 'Your iPhone has been listed on the marketplace!', 'success');
    }
  }

  // Demonstrate crypto features
  private async demonstrateCrypto(): Promise<void> {
    console.log('₿ Demonstrating Crypto Features...');
    
    // Buy Bitcoin
    const btcResult = await mockApi.crypto.buyCrypto('BTC', 50000);
    if (btcResult.success) {
      await this.sendDemoNotification('Crypto Purchase', 'Bitcoin purchase successful! Welcome to the future of money.', 'success');
    }

    // Buy USDT for stable savings
    const usdtResult = await mockApi.crypto.buyCrypto('USDT', 25000);
    if (usdtResult.success) {
      await this.sendDemoNotification('Stable Crypto', 'USDT purchased for stable crypto savings!', 'success');
    }
  }

  // Helper method to send notifications
  private async sendDemoNotification(title: string, message: string, type: 'info' | 'success' | 'warning' | 'error'): Promise<void> {
    const notificationResult = await mockApi.notifications.sendNotification({
      title,
      message,
      type
    });

    if (notificationResult.success && notificationResult.data) {
      this.actions.addNotification(notificationResult.data);
    }
  }

  // Simulate realistic user interactions
  async simulateUserFlow(): Promise<void> {
    console.log('👤 Simulating Realistic User Flow...');

    // Morning routine: Check balance and pay bills
    await this.demonstrateBillPayments();
    
    // Lunch break: Make a savings deposit
    setTimeout(async () => {
      const result = await mockApi.savings.deposit(2000);
      if (result.success && result.data) {
        this.actions.addTransaction(result.data);
        await this.sendDemoNotification('Daily Savings', 'Lunch money saved! ₦2,000 added to savings.', 'success');
      }
    }, 3000);

    // Evening: Check AI insights and investments
    setTimeout(async () => {
      await this.demonstrateAI();
      await this.demonstrateInvestments();
    }, 6000);

    // Weekend: Marketplace activity
    setTimeout(async () => {
      await this.demonstrateMarketplace();
    }, 9000);
  }

  // Showcase advanced features for investors
  async showcaseInvestorFeatures(): Promise<void> {
    console.log('🏆 Showcasing Advanced Features for Investors...');

    // 1. Voice Banking Demo
    const voiceResult = await mockApi.voice.processVoiceCommand('What is my current balance?');
    if (voiceResult.success) {
      await this.sendDemoNotification('Voice Banking', 'Voice command processed successfully!', 'success');
    }

    // 2. Budget Management
    const budgetResult = await mockApi.budget.createBudget({
      name: 'July Budget',
      totalAmount: 75000,
      period: 'monthly'
    });
    if (budgetResult.success) {
      await this.sendDemoNotification('Budget Created', 'Monthly budget set up successfully!', 'success');
    }

    // 3. Automated Savings
    setTimeout(async () => {
      await mockApi.savings.deposit(1000);
      await this.sendDemoNotification('Auto-Save', 'Automated daily savings: ₦1,000 saved!', 'info');
    }, 2000);

    // 4. Group Challenge Participation
    setTimeout(async () => {
      await this.sendDemoNotification('Challenge Completed', 'Congratulations! You completed the 30-Day Savings Challenge!', 'success');
    }, 4000);

    // 5. Financial Health Score Update
    setTimeout(async () => {
      await this.sendDemoNotification('Health Score', 'Your financial health score improved to 8.5/10!', 'success');
    }, 6000);
  }

  // Comprehensive investor presentation scenarios
  async runInvestorPresentation(): Promise<void> {
    console.log('🎯 Running Investor Presentation Demo...');
    
    // Scenario 1: Young Professional
    await this.simulateYoungProfessional();
    
    // Scenario 2: Small Business Owner  
    await this.simulateSmallBusinessOwner();
    
    // Scenario 3: University Student
    await this.simulateUniversityStudent();
    
    // Show platform metrics
    await this.displayPlatformMetrics();
  }

  private async simulateYoungProfessional(): Promise<void> {
    console.log('👩‍💼 Simulating Young Professional (Sarah, 28)...');
    
    // Emergency fund setup
    const emergencyGoal = await mockApi.savings.createGoal({
      name: 'Emergency Fund',
      targetAmount: 50000,
      category: 'emergency',
      frequency: 'monthly',
      autoSave: true
    });
    
    if (emergencyGoal.success && emergencyGoal.data) {
      this.actions.addSavingsGoal(emergencyGoal.data);
      await this.sendDemoNotification('Professional Setup', 'Emergency fund goal created - ₦50,000 target', 'success');
    }

    // Auto-save setup
    await mockApi.savings.deposit(2000, emergencyGoal.data?.id);
    await this.sendDemoNotification('Auto-Save', 'Monthly auto-save: ₦2,000 deposited', 'info');

    // Investment in mutual funds
    await mockApi.investments.buyInvestment({
      type: 'mutual_funds',
      name: 'ARM Aggressive Growth Fund',
      amount: 15000,
      units: 150,
      purchasePrice: 100
    });
    await this.sendDemoNotification('Investment', 'Mutual fund investment: ₦15,000 invested', 'success');

    // AI budget optimization
    await mockApi.ai.chat('How can I optimize my monthly budget?');
    await this.sendDemoNotification('AI Advice', 'AI suggested budget optimization strategies', 'info');
  }

  private async simulateSmallBusinessOwner(): Promise<void> {
    console.log('👨‍💼 Simulating Small Business Owner (Ahmed, 35)...');
    
    // Business loan application
    const loanResult = await mockApi.loans.applyForLoan({
      type: 'business',
      amount: 500000,
      term: 12,
      purpose: 'Inventory expansion'
    });
    
    if (loanResult.success) {
      await this.sendDemoNotification('Business Loan', 'Loan application submitted: ₦500,000', 'info');
    }

    // Marketplace listing
    await mockApi.marketplace.listItem({
      title: 'Office Furniture Set',
      description: 'Complete office setup for small business',
      price: 75000,
      category: 'electronics',
      condition: 'used'
    });
    await this.sendDemoNotification('Marketplace', 'Business item listed for ₦75,000', 'success');

    // Employee group savings
    await mockApi.groups.createGroup({
      name: 'Ahmed\'s Business Team',
      contributionAmount: 5000,
      frequency: 'monthly',
      rules: 'Monthly contribution for team projects'
    });
    await this.sendDemoNotification('Group Created', 'Employee savings group established', 'success');

    // Business bill payments
    await mockApi.bills.payBill({
      type: 'electricity',
      provider: 'Ikeja Electric',
      accountNumber: 'BIZ1234567890',
      amount: 15000
    });
    await this.sendDemoNotification('Business Bills', 'Office electricity bill paid: ₦15,000', 'success');
  }

  private async simulateUniversityStudent(): Promise<void> {
    console.log('🎓 Simulating University Student (Kemi, 22)...');
    
    // Family group for school fees
    await mockApi.groups.joinGroup('family-education-fund');
    await this.sendDemoNotification('Family Group', 'Joined family education savings group', 'success');

    // Textbook marketplace sale
    await mockApi.marketplace.listItem({
      title: 'Engineering Textbooks - Final Year',
      description: 'Complete set of final year engineering books',
      price: 25000,
      category: 'education',
      condition: 'used'
    });
    await this.sendDemoNotification('Student Income', 'Textbooks listed for ₦25,000', 'success');

    // Voice banking demo
    await mockApi.voice.processVoiceCommand('Check my school fees savings goal');
    await this.sendDemoNotification('Voice Banking', 'Voice command processed successfully', 'success');

    // Financial education
    await mockApi.ai.chat('Teach me about investment basics for students');
    await this.sendDemoNotification('AI Tutor', 'AI provided investment education for students', 'info');

    // Small crypto purchase
    await mockApi.crypto.buyCrypto('USDT', 5000);
    await this.sendDemoNotification('Crypto Learning', 'First crypto purchase: ₦5,000 USDT', 'success');
  }

  private async displayPlatformMetrics(): Promise<void> {
    console.log('📊 Displaying Platform Metrics...');
    
    const metrics = [
      'Platform Metrics Updated: 500K+ users onboarded',
      'AUM Growth: ₦2.5B total assets under management', 
      'Transaction Volume: ₦500M+ monthly transactions',
      'User Engagement: 85% monthly retention rate',
      'Revenue Streams: 15+ active revenue channels',
      'Market Expansion: 5 African countries live',
      'AI Interactions: 1M+ monthly AI conversations',
      'Group Savings: 50K+ active savings groups'
    ];

    for (let i = 0; i < metrics.length; i++) {
      setTimeout(async () => {
        await this.sendDemoNotification('Platform Metrics', metrics[i], 'info');
      }, i * 1000);
    }
  }

  // Revenue demonstration
  async demonstrateRevenueStreams(): Promise<void> {
    console.log('💰 Demonstrating Revenue Streams...');
    
    const revenues = [
      { stream: 'Transaction Fees', amount: 125000, description: '0.5-1.5% on all transactions' },
      { stream: 'Investment Management', amount: 89000, description: '1-2% annual management fee' },
      { stream: 'Loan Interest', amount: 234000, description: '15-25% APR on loans' },
      { stream: 'Marketplace Commission', amount: 45000, description: '3-5% commission per sale' },
      { stream: 'Premium Subscriptions', amount: 78000, description: '₦500-2000/month premium features' },
      { stream: 'Crypto Trading', amount: 56000, description: '1-2% trading fees' },
      { stream: 'Bill Payment Commission', amount: 34000, description: 'Commission from service providers' },
      { stream: 'Group Administration', amount: 23000, description: '₦100/member/month for groups' }
    ];

    for (const revenue of revenues) {
      await this.sendDemoNotification(
        'Revenue Stream', 
        `${revenue.stream}: ₦${revenue.amount.toLocaleString()} - ${revenue.description}`, 
        'success'
      );
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    const totalRevenue = revenues.reduce((sum, r) => sum + r.amount, 0);
    await this.sendDemoNotification(
      'Total Monthly Revenue', 
      `₦${totalRevenue.toLocaleString()} from diversified revenue streams`, 
      'success'
    );
  }

  // Social impact demonstration
  async demonstrateSocialImpact(): Promise<void> {
    console.log('🌍 Demonstrating Social Impact...');
    
    const impacts = [
      'Financial Inclusion: 250K+ previously unbanked users',
      'Savings Culture: 300% increase in average savings rate',
      'Emergency Preparedness: 180K+ users built emergency funds', 
      'Investment Education: 150K+ users started investing',
      'Group Solidarity: 45K+ traditional savings groups digitized',
      'Youth Empowerment: 80K+ students using financial services',
      'Women Inclusion: 60% female user base in rural areas',
      'Small Business Growth: 25K+ SMEs accessed microfinance'
    ];

    for (const impact of impacts) {
      await this.sendDemoNotification('Social Impact', impact, 'info');
      await new Promise(resolve => setTimeout(resolve, 1200));
    }
  }
}

// Quick demo functions for immediate use
export const quickDemo = {
  // Quick savings demo
  savings: async (actions: ReturnType<typeof useAppActions>) => {
    const result = await mockApi.savings.deposit(5000);
    if (result.success && result.data) {
      actions.addTransaction(result.data);
      actions.addNotification({
        id: Date.now().toString(),
        title: 'Demo Deposit',
        message: '₦5,000 deposited successfully!',
        type: 'success',
        date: new Date().toISOString(),
        read: false
      });
    }
  },

  // Quick bill payment demo
  billPayment: async (actions: ReturnType<typeof useAppActions>) => {
    const result = await mockApi.bills.payBill({
      type: 'airtime',
      provider: 'MTN',
      accountNumber: '08012345678',
      amount: 1000
    });
    if (result.success && result.data) {
      actions.addBillPayment(result.data);
      actions.addNotification({
        id: Date.now().toString(),
        title: 'Demo Bill Payment',
        message: 'MTN airtime payment successful!',
        type: 'success',
        date: new Date().toISOString(),
        read: false
      });
    }
  },

  // Quick AI chat demo
  aiChat: async (actions: ReturnType<typeof useAppActions>) => {
    const result = await mockApi.ai.chat('How can I save more money?');
    if (result.success) {
      actions.addNotification({
        id: Date.now().toString(),
        title: 'AI Assistant',
        message: 'AI has provided personalized savings advice!',
        type: 'info',
        date: new Date().toISOString(),
        read: false
      });
    }
  },

  // Quick investment demo
  investment: async (actions: ReturnType<typeof useAppActions>) => {
    const result = await mockApi.investments.buyInvestment({
      type: 'treasury_bills',
      name: 'Treasury Bills',
      amount: 10000,
      units: 1,
      purchasePrice: 10000
    });
    if (result.success) {
      actions.addNotification({
        id: Date.now().toString(),
        title: 'Investment Demo',
        message: 'Treasury Bills purchased successfully!',
        type: 'success',
        date: new Date().toISOString(),
        read: false
      });
    }
  }
};

export default DemoService;
