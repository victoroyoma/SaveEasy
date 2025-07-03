import { mockApi } from './mockApi';
import { useAppActions } from '../context/AppContext';
import { Transaction } from '../types';

// Comprehensive Investor Demo Service
export class InvestorDemoService {
  private actions: ReturnType<typeof useAppActions>;

  constructor(actions: ReturnType<typeof useAppActions>) {
    this.actions = actions;
  }

  // ===== CORE SAVINGS FUNCTIONS =====

  // Simulate savings deposit with realistic scenarios
  async simulateDeposit(amount: number, goalId?: string, scenario: 'salary' | 'bonus' | 'freelance' | 'business' = 'salary'): Promise<boolean> {
    try {
      const descriptions = {
        salary: 'Monthly salary savings',
        bonus: 'Year-end bonus deposit',
        freelance: 'Freelance project payment',
        business: 'Business profit savings'
      };

      const result = await mockApi.savings.deposit(amount, goalId);
      if (result.success && result.data) {
        // Update transaction description
        result.data.description = descriptions[scenario];
        
        this.actions.addTransaction(result.data);
        this.actions.updateUser({ totalSavings: 25000 + amount });
        
        await this.sendNotification(
          'Deposit Successful',
          `₦${amount.toLocaleString()} deposited successfully from ${scenario}`,
          'success'
        );

        return true;
      }
      return false;
    } catch (error) {
      console.error('Deposit simulation failed:', error);
      return false;
    }
  }

  // Simulate savings withdrawal with different purposes
  async simulateWithdrawal(amount: number, purpose: 'emergency' | 'investment' | 'education' | 'business' = 'emergency'): Promise<boolean> {
    try {
      const descriptions = {
        emergency: 'Emergency medical expense',
        investment: 'Investment opportunity',
        education: 'School fees payment',
        business: 'Business capital'
      };

      const result = await mockApi.savings.withdraw(amount, descriptions[purpose]);
      if (result.success && result.data) {
        this.actions.addTransaction(result.data);
        this.actions.updateUser({ totalSavings: Math.max(0, 25000 - amount) });
        
        await this.sendNotification(
          'Withdrawal Processed',
          `₦${amount.toLocaleString()} withdrawn for ${purpose}`,
          'info'
        );

        return true;
      }
      return false;
    } catch (error) {
      console.error('Withdrawal simulation failed:', error);
      return false;
    }
  }

  // Access emergency fund with realistic scenarios
  async accessEmergencyFund(amount: number, emergency: 'medical' | 'car_repair' | 'job_loss' | 'family'): Promise<boolean> {
    try {
      const reasons = {
        medical: 'Hospital bill payment',
        car_repair: 'Urgent car repairs',
        job_loss: 'Temporary income loss',
        family: 'Family emergency'
      };

      const result = await mockApi.savings.accessEmergencyFund(amount, reasons[emergency]);
      if (result.success && result.data) {
        this.actions.addTransaction(result.data);
        this.actions.updateUser({ emergencyFund: Math.max(0, 5000 - amount) });
        
        await this.sendNotification(
          'Emergency Fund Accessed',
          `₦${amount.toLocaleString()} accessed for ${reasons[emergency]}`,
          'warning'
        );

        return true;
      }
      return false;
    } catch (error) {
      console.error('Emergency fund access failed:', error);
      return false;
    }
  }

  // Create realistic savings goals
  async createSavingsGoal(
    name: string, 
    amount: number, 
    category: 'emergency' | 'education' | 'business' | 'housing' | 'other',
    autoSave: boolean = true
  ): Promise<boolean> {
    try {
      const result = await mockApi.savings.createGoal({
        name,
        targetAmount: amount,
        category,
        frequency: 'monthly',
        autoSave,
        deadline: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1 year from now
      });

      if (result.success && result.data) {
        this.actions.addSavingsGoal(result.data);
        
        await this.sendNotification(
          'Savings Goal Created',
          `${name} goal created - ₦${amount.toLocaleString()} target`,
          'success'
        );

        return true;
      }
      return false;
    } catch (error) {
      console.error('Goal creation failed:', error);
      return false;
    }
  }

  // ===== GROUP SAVINGS FUNCTIONS =====

  // Join a savings group with different scenarios
  async joinSavingsGroup(groupType: 'professional' | 'community' | 'family' | 'business'): Promise<boolean> {
    try {
      const groups = {
        professional: { id: 'tech-professionals', name: 'Tech Professionals Network' },
        community: { id: 'market-traders', name: 'Market Traders Association' },
        family: { id: 'extended-family', name: 'Extended Family Support' },
        business: { id: 'business-owners', name: 'Small Business Owners Circle' }
      };

      const group = groups[groupType];
      const result = await mockApi.groups.joinGroup(group.id);
      
      if (result.success) {
        await this.sendNotification(
          'Group Joined',
          `Successfully joined ${group.name}!`,
          'success'
        );

        // Simulate immediate contribution
        setTimeout(() => {
          this.contributeToGroup(group.id, 1000);
        }, 2000);

        return true;
      }
      return false;
    } catch (error) {
      console.error('Group joining failed:', error);
      return false;
    }
  }

  // Make group contribution
  async contributeToGroup(groupId: string, amount: number): Promise<boolean> {
    try {
      const result = await mockApi.groups.contribute(groupId, amount);
      if (result.success && result.data) {
        this.actions.addTransaction(result.data);
        
        await this.sendNotification(
          'Group Contribution',
          `₦${amount.toLocaleString()} contributed to savings group`,
          'success'
        );

        return true;
      }
      return false;
    } catch (error) {
      console.error('Group contribution failed:', error);
      return false;
    }
  }

  // Create a new savings group
  async createSavingsGroup(name: string, contributionAmount: number, frequency: 'weekly' | 'monthly'): Promise<boolean> {
    try {
      const result = await mockApi.groups.createGroup({
        name,
        contributionAmount,
        frequency,
        rules: `${frequency} contributions of ₦${contributionAmount.toLocaleString()}. Consistent participation required.`
      });

      if (result.success) {
        await this.sendNotification(
          'Group Created',
          `${name} savings group created successfully!`,
          'success'
        );

        return true;
      }
      return false;
    } catch (error) {
      console.error('Group creation failed:', error);
      return false;
    }
  }

  // ===== BILL PAYMENT FUNCTIONS =====

  // Pay different types of bills
  async payBill(
    type: 'airtime' | 'data' | 'electricity' | 'cable_tv' | 'water' | 'internet',
    provider: string,
    accountNumber: string,
    amount: number
  ): Promise<boolean> {
    try {
      const result = await mockApi.bills.payBill({
        type,
        provider,
        accountNumber,
        amount
      });

      if (result.success && result.data) {
        this.actions.addBillPayment(result.data);
        this.actions.addTransaction({
          id: Date.now().toString(),
          type: 'bill_payment',
          amount,
          description: `${type.toUpperCase()} - ${provider}`,
          date: new Date().toISOString(),
          category: 'utilities',
          status: 'completed',
          method: 'mobile_money'
        });

        await this.sendNotification(
          'Bill Payment',
          `${type.toUpperCase()} payment successful - ₦${amount.toLocaleString()}`,
          'success'
        );

        return true;
      }
      return false;
    } catch (error) {
      console.error('Bill payment failed:', error);
      return false;
    }
  }

  // Setup automatic bill payments
  async setupAutoPay(billType: string, frequency: 'weekly' | 'monthly'): Promise<boolean> {
    try {
      const result = await mockApi.bills.setupAutoPay({}, frequency);
      if (result.success) {
        await this.sendNotification(
          'Auto-Pay Setup',
          `${billType} auto-pay configured for ${frequency} payments`,
          'info'
        );
        return true;
      }
      return false;
    } catch (error) {
      console.error('Auto-pay setup failed:', error);
      return false;
    }
  }

  // ===== INVESTMENT FUNCTIONS =====

  // Buy different types of investments
  async buyInvestment(
    type: 'stocks' | 'bonds' | 'mutual_funds' | 'treasury_bills' | 'real_estate',
    name: string,
    amount: number
  ): Promise<boolean> {
    try {
      const result = await mockApi.investments.buyInvestment({
        type,
        name,
        amount,
        units: amount / 100, // Mock unit calculation
        purchasePrice: 100,
        platform: 'SaveEasy Invest'
      });

      if (result.success && result.data) {
        await this.sendNotification(
          'Investment Purchase',
          `${name} purchased successfully - ₦${amount.toLocaleString()}`,
          'success'
        );

        return true;
      }
      return false;
    } catch (error) {
      console.error('Investment purchase failed:', error);
      return false;
    }
  }

  // Sell investment
  async sellInvestment(investmentId: string, investmentName: string): Promise<boolean> {
    try {
      const result = await mockApi.investments.sellInvestment(investmentId);
      if (result.success && result.data) {
        this.actions.addTransaction(result.data);
        
        await this.sendNotification(
          'Investment Sold',
          `${investmentName} sold successfully`,
          'success'
        );

        return true;
      }
      return false;
    } catch (error) {
      console.error('Investment sale failed:', error);
      return false;
    }
  }

  // ===== LOAN FUNCTIONS =====

  // Apply for different types of loans
  async applyForLoan(
    type: 'personal' | 'business' | 'emergency' | 'education',
    amount: number,
    term: number,
    purpose: string
  ): Promise<boolean> {
    try {
      const result = await mockApi.loans.applyForLoan({
        type,
        amount,
        term,
        purpose
      });

      if (result.success) {
        await this.sendNotification(
          'Loan Application',
          `${type} loan application submitted - ₦${amount.toLocaleString()}`,
          'info'
        );
        return true;
      } else {
        await this.sendNotification(
          'Loan Application',
          result.message,
          'warning'
        );
        return false;
      }
    } catch (error) {
      console.error('Loan application failed:', error);
      return false;
    }
  }

  // Make loan payment
  async makeLoanPayment(loanId: string, amount: number): Promise<boolean> {
    try {
      const result = await mockApi.loans.makeLoanPayment(loanId, amount);
      if (result.success && result.data) {
        this.actions.addTransaction(result.data);
        
        await this.sendNotification(
          'Loan Payment',
          `Loan payment successful - ₦${amount.toLocaleString()}`,
          'success'
        );

        return true;
      }
      return false;
    } catch (error) {
      console.error('Loan payment failed:', error);
      return false;
    }
  }

  // ===== AI ASSISTANT FUNCTIONS =====

  // Chat with AI for different scenarios
  async chatWithAI(scenario: 'budgeting' | 'savings' | 'investment' | 'debt'): Promise<boolean> {
    try {
      const queries = {
        budgeting: 'How can I better manage my monthly budget?',
        savings: 'What\'s the best way to increase my savings rate?',
        investment: 'Should I start investing with my current income?',
        debt: 'How can I pay off my debts faster?'
      };

      const result = await mockApi.ai.chat(queries[scenario]);
      if (result.success && result.data) {
        await this.sendNotification(
          'AI Assistant',
          'AI provided personalized financial advice!',
          'info'
        );
        return true;
      }
      return false;
    } catch (error) {
      console.error('AI chat failed:', error);
      return false;
    }
  }

  // Get financial insights
  async getFinancialInsights(): Promise<boolean> {
    try {
      const result = await mockApi.ai.getInsights();
      if (result.success && result.data) {
        await this.sendNotification(
          'Financial Insights',
          `New insight: ${result.data[0]}`,
          'info'
        );
        return true;
      }
      return false;
    } catch (error) {
      console.error('Insights generation failed:', error);
      return false;
    }
  }

  // ===== CRYPTO FUNCTIONS =====

  // Buy cryptocurrency
  async buyCrypto(symbol: string, amount: number): Promise<boolean> {
    try {
      const result = await mockApi.crypto.buyCrypto(symbol, amount);
      if (result.success && result.data) {
        await this.sendNotification(
          'Crypto Purchase',
          `${symbol} purchased successfully - ₦${amount.toLocaleString()}`,
          'success'
        );
        return true;
      }
      return false;
    } catch (error) {
      console.error('Crypto purchase failed:', error);
      return false;
    }
  }

  // Sell cryptocurrency
  async sellCrypto(symbol: string, amount: number): Promise<boolean> {
    try {
      const result = await mockApi.crypto.sellCrypto(symbol, amount);
      if (result.success && result.data) {
        await this.sendNotification(
          'Crypto Sale',
          `${symbol} sold successfully - ₦${(amount * 50000).toLocaleString()}`,
          'success'
        );
        return true;
      }
      return false;
    } catch (error) {
      console.error('Crypto sale failed:', error);
      return false;
    }
  }

  // ===== MARKETPLACE FUNCTIONS =====

  // List item for sale
  async listMarketplaceItem(
    title: string,
    price: number,
    category: 'education' | 'electronics' | 'fashion' | 'food' | 'services',
    condition: 'new' | 'used' | 'refurbished'
  ): Promise<boolean> {
    try {
      const result = await mockApi.marketplace.listItem({
        title,
        price,
        category,
        condition,
        description: `High quality ${title.toLowerCase()} in ${condition} condition`,
        location: 'Lagos, Nigeria'
      });

      if (result.success) {
        await this.sendNotification(
          'Item Listed',
          `${title} listed for ₦${price.toLocaleString()}`,
          'success'
        );
        return true;
      }
      return false;
    } catch (error) {
      console.error('Item listing failed:', error);
      return false;
    }
  }

  // Buy marketplace item
  async buyMarketplaceItem(itemId: string, itemName: string, price: number): Promise<boolean> {
    try {
      const result = await mockApi.marketplace.buyItem(itemId, 1);
      if (result.success) {
        await this.sendNotification(
          'Purchase Initiated',
          `Purchase of ${itemName} initiated - ₦${price.toLocaleString()}`,
          'success'
        );
        return true;
      }
      return false;
    } catch (error) {
      console.error('Item purchase failed:', error);
      return false;
    }
  }

  // ===== VOICE BANKING FUNCTIONS =====

  // Process voice commands
  async processVoiceCommand(command: string): Promise<boolean> {
    try {
      const result = await mockApi.voice.processVoiceCommand(command);
      if (result.success && result.data) {
        await this.sendNotification(
          'Voice Banking',
          'Voice command processed successfully',
          'success'
        );
        return true;
      }
      return false;
    } catch (error) {
      console.error('Voice command failed:', error);
      return false;
    }
  }

  // ===== COMPREHENSIVE DEMO SCENARIOS =====

  // Young Professional Scenario
  async runYoungProfessionalDemo(): Promise<void> {
    console.log('🎯 Running Young Professional Demo...');
    
    // 1. Setup emergency fund
    await this.createSavingsGoal('Emergency Fund', 50000, 'emergency');
    await this.simulateDeposit(5000, undefined, 'salary');
    
    // 2. Join professional group
    await this.joinSavingsGroup('professional');
    
    // 3. Pay bills
    await this.payBill('airtime', 'MTN', '08012345678', 1000);
    await this.payBill('data', 'MTN', '08012345678', 2000);
    
    // 4. Start investing
    await this.buyInvestment('mutual_funds', 'ARM Aggressive Growth Fund', 10000);
    
    // 5. Get AI advice
    await this.chatWithAI('budgeting');
  }

  // Small Business Owner Scenario
  async runBusinessOwnerDemo(): Promise<void> {
    console.log('🏢 Running Business Owner Demo...');
    
    // 1. Apply for business loan
    await this.applyForLoan('business', 200000, 12, 'Inventory expansion');
    
    // 2. Create employee group
    await this.createSavingsGroup('Business Team Savings', 3000, 'monthly');
    
    // 3. Pay business bills
    await this.payBill('electricity', 'Ikeja Electric', 'BIZ123456', 8000);
    await this.payBill('internet', 'Spectranet', 'SPE789012', 5000);
    
    // 4. List business items
    await this.listMarketplaceItem('Office Equipment Set', 45000, 'electronics', 'used');
    
    // 5. Investment for business growth
    await this.buyInvestment('treasury_bills', '91-Day Treasury Bills', 50000);
  }

  // University Student Scenario
  async runStudentDemo(): Promise<void> {
    console.log('🎓 Running Student Demo...');
    
    // 1. Join family education group
    await this.joinSavingsGroup('family');
    
    // 2. Create school fees goal
    await this.createSavingsGoal('School Fees', 80000, 'education');
    
    // 3. List textbooks for sale
    await this.listMarketplaceItem('Engineering Textbooks', 15000, 'education', 'used');
    
    // 4. Small crypto investment
    await this.buyCrypto('USDT', 3000);
    
    // 5. Voice banking demo
    await this.processVoiceCommand('Check my school fees savings goal');
    
    // 6. Pay student bills
    await this.payBill('airtime', 'Glo', '08098765432', 500);
  }

  // Emergency Response Scenario
  async runEmergencyScenario(): Promise<void> {
    console.log('🚨 Running Emergency Scenario...');
    
    // 1. Medical emergency
    await this.accessEmergencyFund(3000, 'medical');
    
    // 2. Additional withdrawal
    await this.simulateWithdrawal(5000, 'emergency');
    
    // 3. Loan application for emergency
    await this.applyForLoan('emergency', 15000, 6, 'Medical treatment');
    
    // 4. Get AI advice for recovery
    await this.chatWithAI('savings');
  }

  // Wealth Building Scenario
  async runWealthBuildingDemo(): Promise<void> {
    console.log('💎 Running Wealth Building Demo...');
    
    // 1. Large deposit
    await this.simulateDeposit(25000, undefined, 'bonus');
    
    // 2. Diversified investments
    await this.buyInvestment('stocks', 'MTN Nigeria Shares', 15000);
    await this.buyInvestment('bonds', 'Federal Government Bonds', 20000);
    await this.buyInvestment('real_estate', 'Real Estate Investment Trust', 30000);
    
    // 3. Crypto portfolio
    await this.buyCrypto('BTC', 10000);
    await this.buyCrypto('ETH', 8000);
    
    // 4. High-value marketplace activity
    await this.listMarketplaceItem('Investment Property Share', 500000, 'services', 'new');
  }

  // ===== UTILITY FUNCTIONS =====

  // Send notification helper
  private async sendNotification(title: string, message: string, type: 'info' | 'success' | 'warning' | 'error'): Promise<void> {
    this.actions.addNotification({
      id: Date.now().toString(),
      title,
      message,
      type,
      date: new Date().toISOString(),
      read: false
    });
    
    // Small delay for realistic effect
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // Generate realistic transaction data
  generateTransactionData(type: string, amount: number): Transaction {
    return {
      id: Date.now().toString(),
      type: type as any,
      amount,
      description: `Demo ${type}`,
      date: new Date().toISOString(),
      category: 'demo',
      status: 'completed',
      method: 'mobile_money'
    };
  }
}

// Quick access functions for immediate demo use
export const quickInvestorDemo = {
  // Quick savings demo with notification
  quickSavings: async (actions: ReturnType<typeof useAppActions>, amount: number = 5000) => {
    const demo = new InvestorDemoService(actions);
    return await demo.simulateDeposit(amount, undefined, 'salary');
  },

  // Quick withdrawal demo
  quickWithdrawal: async (actions: ReturnType<typeof useAppActions>, amount: number = 2000) => {
    const demo = new InvestorDemoService(actions);
    return await demo.simulateWithdrawal(amount, 'emergency');
  },

  // Quick emergency fund access
  quickEmergency: async (actions: ReturnType<typeof useAppActions>, amount: number = 3000) => {
    const demo = new InvestorDemoService(actions);
    return await demo.accessEmergencyFund(amount, 'medical');
  },

  // Quick group joining
  quickGroupJoin: async (actions: ReturnType<typeof useAppActions>) => {
    const demo = new InvestorDemoService(actions);
    return await demo.joinSavingsGroup('professional');
  },

  // Quick bill payment
  quickBillPay: async (actions: ReturnType<typeof useAppActions>) => {
    const demo = new InvestorDemoService(actions);
    return await demo.payBill('airtime', 'MTN', '08012345678', 1000);
  },

  // Quick investment
  quickInvestment: async (actions: ReturnType<typeof useAppActions>) => {
    const demo = new InvestorDemoService(actions);
    return await demo.buyInvestment('treasury_bills', 'Treasury Bills', 10000);
  },

  // Quick AI chat
  quickAI: async (actions: ReturnType<typeof useAppActions>) => {
    const demo = new InvestorDemoService(actions);
    return await demo.chatWithAI('savings');
  },

  // Quick crypto purchase
  quickCrypto: async (actions: ReturnType<typeof useAppActions>) => {
    const demo = new InvestorDemoService(actions);
    return await demo.buyCrypto('BTC', 5000);
  },

  // Quick marketplace listing
  quickMarketplace: async (actions: ReturnType<typeof useAppActions>) => {
    const demo = new InvestorDemoService(actions);
    return await demo.listMarketplaceItem('Smartphone', 85000, 'electronics', 'used');
  },

  // Quick loan application
  quickLoan: async (actions: ReturnType<typeof useAppActions>) => {
    const demo = new InvestorDemoService(actions);
    return await demo.applyForLoan('personal', 25000, 6, 'Personal development');
  },

  // Enhanced quick demos using the new enhanced API
  quickEnhancedDeposit: async (actions: ReturnType<typeof useAppActions>, amount: number = 5000, source: 'salary' | 'freelance' | 'business' | 'gift' | 'bonus' = 'salary') => {
    try {
      const result = await mockApi.enhanced.simulateRealisticDeposit(amount, source);
      if (result.success && result.data) {
        actions.addTransaction(result.data);
        actions.updateUser({ totalSavings: 25000 + amount });
        
        actions.addNotification({
          id: Date.now().toString(),
          title: 'Enhanced Deposit',
          message: result.message,
          type: 'success',
          date: new Date().toISOString(),
          read: false
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Enhanced deposit failed:', error);
      return false;
    }
  },

  // Enhanced withdrawal demo
  quickEnhancedWithdrawal: async (actions: ReturnType<typeof useAppActions>, amount: number = 3000, purpose: 'emergency' | 'investment' | 'education' | 'business' | 'bills' | 'family' = 'emergency') => {
    try {
      const result = await mockApi.enhanced.simulateSecureWithdrawal(amount, purpose, true);
      if (result.success && result.data) {
        actions.addTransaction(result.data);
        actions.updateUser({ totalSavings: Math.max(0, 75000 - amount) });
        
        actions.addNotification({
          id: Date.now().toString(),
          title: 'Secure Withdrawal',
          message: result.message,
          type: 'info',
          date: new Date().toISOString(),
          read: false
        });
        return true;
      } else {
        actions.addNotification({
          id: Date.now().toString(),
          title: 'Withdrawal Failed',
          message: result.error || 'Unable to process withdrawal',
          type: 'error',
          date: new Date().toISOString(),
          read: false
        });
        return false;
      }
    } catch (error) {
      console.error('Enhanced withdrawal failed:', error);
      return false;
    }
  },

  // Enhanced group joining demo
  quickEnhancedGroupJoin: async (actions: ReturnType<typeof useAppActions>, groupType: 'professional' | 'community' | 'family' | 'business' | 'student' = 'professional') => {
    try {
      const result = await mockApi.enhanced.simulateGroupJoining(groupType);
      if (result.success && result.data) {
        // Add a transaction for joining fee
        const joinTransaction = {
          id: Date.now().toString(),
          type: 'group_contribution' as const,
          amount: 100,
          description: `Joined ${result.data.groupName}`,
          date: new Date().toISOString(),
          category: 'group_savings' as const,
          status: 'completed' as const,
          method: 'mobile_money' as const
        };
        
        actions.addTransaction(joinTransaction);
        
        actions.addNotification({
          id: Date.now().toString(),
          title: 'Group Joined Successfully',
          message: result.message,
          type: 'success',
          date: new Date().toISOString(),
          read: false
        });
        return true;
      } else {
        actions.addNotification({
          id: Date.now().toString(),
          title: 'Group Application Pending',
          message: result.error || 'Group application is being reviewed',
          type: 'warning',
          date: new Date().toISOString(),
          read: false
        });
        return false;
      }
    } catch (error) {
      console.error('Enhanced group join failed:', error);
      return false;
    }
  },

  // Enhanced emergency fund access demo
  quickEmergencyAccess: async (actions: ReturnType<typeof useAppActions>, amount: number = 4000, emergencyType: 'medical' | 'job_loss' | 'family_crisis' | 'natural_disaster' | 'vehicle_breakdown' = 'medical') => {
    try {
      const result = await mockApi.enhanced.simulateEmergencyAccess(amount, emergencyType, 'high');
      if (result.success && result.data) {
        actions.addTransaction(result.data);
        actions.updateUser({ emergencyFund: Math.max(0, 15000 - amount) });
        
        actions.addNotification({
          id: Date.now().toString(),
          title: 'Emergency Fund Accessed',
          message: result.message,
          type: 'warning',
          date: new Date().toISOString(),
          read: false
        });
        return true;
      } else {
        actions.addNotification({
          id: Date.now().toString(),
          title: 'Emergency Access Denied',
          message: result.error || 'Unable to access emergency fund',
          type: 'error',
          date: new Date().toISOString(),
          read: false
        });
        return false;
      }
    } catch (error) {
      console.error('Emergency access failed:', error);
      return false;
    }
  }
};

export default InvestorDemoService;
