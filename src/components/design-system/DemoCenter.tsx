import React, { useState } from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { Icon } from './Icon';
import { Badge } from './Badge';
import { LoadingSpinner } from './LoadingSpinner';
import { useAppActions } from '../../context/AppContext';
import { DemoService } from '../../services/demoService';
import { InvestorDemoService, quickInvestorDemo } from '../../services/investorDemoService';

export const DemoCenter: React.FC = () => {
  const [isRunningDemo, setIsRunningDemo] = useState(false);
  const [demoProgress, setDemoProgress] = useState<string>('');
  const actions = useAppActions();

  const runFullDemo = async () => {
    setIsRunningDemo(true);
    setDemoProgress('Initializing demo...');
    
    try {
      const demoService = new DemoService(actions);
      
      setDemoProgress('Running savings demo...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setDemoProgress('Demonstrating group savings...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setDemoProgress('Processing bill payments...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setDemoProgress('Showcasing investments...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setDemoProgress('Testing AI assistant...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setDemoProgress('Finalizing demo...');
      await demoService.runCompleteDemo();
      
      setDemoProgress('Demo completed successfully!');
      
    } catch (error) {
      setDemoProgress('Demo failed. Please try again.');
      console.error('Demo error:', error);
    } finally {
      setTimeout(() => {
        setIsRunningDemo(false);
        setDemoProgress('');
      }, 2000);
    }
  };

  const runQuickDemo = async (demoType: string) => {
    setIsRunningDemo(true);
    
    try {
      switch (demoType) {
        case 'savings':
          await quickInvestorDemo.quickSavings(actions, 5000);
          break;
        case 'withdrawal':
          await quickInvestorDemo.quickWithdrawal(actions, 2000);
          break;
        case 'emergency':
          await quickInvestorDemo.quickEmergency(actions, 3000);
          break;
        case 'group':
          await quickInvestorDemo.quickGroupJoin(actions);
          break;
        case 'bills':
          await quickInvestorDemo.quickBillPay(actions);
          break;
        case 'ai':
          await quickInvestorDemo.quickAI(actions);
          break;
        case 'investment':
          await quickInvestorDemo.quickInvestment(actions);
          break;
        case 'crypto':
          await quickInvestorDemo.quickCrypto(actions);
          break;
        case 'marketplace':
          await quickInvestorDemo.quickMarketplace(actions);
          break;
        case 'loan':
          await quickInvestorDemo.quickLoan(actions);
          break;
        case 'enhanced-deposit':
          await quickInvestorDemo.quickEnhancedDeposit(actions, 5000, 'salary');
          break;
        case 'enhanced-withdrawal':
          await quickInvestorDemo.quickEnhancedWithdrawal(actions, 3000, 'emergency');
          break;
        case 'enhanced-emergency':
          await quickInvestorDemo.quickEmergencyAccess(actions, 4000, 'medical');
          break;
        case 'enhanced-group':
          await quickInvestorDemo.quickEnhancedGroupJoin(actions, 'professional');
          break;
      }
    } catch (error) {
      console.error('Quick demo error:', error);
    } finally {
      setIsRunningDemo(false);
    }
  };

  const runScenarioDemo = async (scenario: string) => {
    setIsRunningDemo(true);
    setDemoProgress(`Running ${scenario} scenario...`);
    
    try {
      const investorDemo = new InvestorDemoService(actions);
      
      switch (scenario) {
        case 'young-professional':
          await investorDemo.runYoungProfessionalDemo();
          break;
        case 'business-owner':
          await investorDemo.runBusinessOwnerDemo();
          break;
        case 'student':
          await investorDemo.runStudentDemo();
          break;
        case 'emergency':
          await investorDemo.runEmergencyScenario();
          break;
        case 'wealth-building':
          await investorDemo.runWealthBuildingDemo();
          break;
      }
      
      setDemoProgress(`${scenario} scenario completed successfully!`);
    } catch (error) {
      setDemoProgress(`${scenario} scenario failed. Please try again.`);
      console.error('Scenario demo error:', error);
    } finally {
      setTimeout(() => {
        setIsRunningDemo(false);
        setDemoProgress('');
      }, 2000);
    }
  };

  // Comprehensive scenario demos
  const runRealisticScenario = async (scenarioType: string) => {
    setIsRunningDemo(true);
    setDemoProgress(`Running ${scenarioType} scenario...`);
    
    try {
      const demoService = new InvestorDemoService(actions);
      
      switch (scenarioType) {
        case 'young-professional':
          setDemoProgress('Setting up young professional savings...');
          await demoService.simulateDeposit(5000, undefined, 'salary');
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          setDemoProgress('Creating emergency fund...');
          await demoService.createSavingsGoal('Emergency Fund', 30000, 'emergency');
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          setDemoProgress('Joining professional network...');
          await demoService.joinSavingsGroup('professional');
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          setDemoProgress('Making first investment...');
          await demoService.buyInvestment('treasury_bills', 'Treasury Bills', 10000);
          break;
          
        case 'emergency-access':
          setDemoProgress('Simulating medical emergency...');
          await demoService.accessEmergencyFund(3000, 'medical');
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          setDemoProgress('Quick loan application...');
          await demoService.applyForLoan('emergency', 15000, 6, 'Medical bills');
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          setDemoProgress('Replenishing emergency fund...');
          await demoService.simulateDeposit(2000, undefined, 'bonus');
          break;
          
        case 'business-growth':
          setDemoProgress('Business profit savings...');
          await demoService.simulateDeposit(8000, undefined, 'business');
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          setDemoProgress('Creating business expansion goal...');
          await demoService.createSavingsGoal('Equipment Purchase', 50000, 'business');
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          setDemoProgress('Joining business owners group...');
          await demoService.joinSavingsGroup('business');
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          setDemoProgress('Making business investment...');
          await demoService.buyInvestment('stocks', 'Small Business ETF', 12000);
          break;
          
        default:
          setDemoProgress('Running comprehensive demo...');
          await runFullDemo();
      }
      
      setDemoProgress(`${scenarioType} scenario completed successfully!`);
    } catch (error) {
      setDemoProgress('Scenario demo failed. Please try again.');
      console.error('Scenario demo error:', error);
    } finally {
      setTimeout(() => {
        setIsRunningDemo(false);
        setDemoProgress('');
      }, 2000);
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="text-center">
          <div className="bg-white bg-opacity-20 p-3 rounded-lg mb-3 mx-auto w-fit">
            <Icon name="challenges" color="white" size={32} />
          </div>
          <h1 className="text-2xl font-bold mb-2">SaveEasy Demo Center</h1>
          <p className="text-sm opacity-90">
            Experience all features in action - Perfect for investor demonstrations
          </p>
          <Badge text="Investor Ready" variant="secondary" size="sm" className="mt-2 bg-white text-purple-600" />
        </div>
      </Card>

      {/* Demo Progress */}
      {isRunningDemo && (
        <Card variant="elevated" className="bg-blue-50 border-blue-200">
          <div className="flex items-center">
            <LoadingSpinner size="sm" className="mr-3" />
            <div className="flex-1">
              <h4 className="font-medium text-blue-900">Demo in Progress</h4>
              <p className="text-sm text-blue-700">{demoProgress}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Full Demo */}
      <Card>
        <div className="text-center">
          <div className="bg-green-100 p-4 rounded-lg mb-4 mx-auto w-fit">
            <Icon name="challenges" color="#059669" size={28} />
          </div>
          <h3 className="text-lg font-bold mb-2">Complete Feature Demonstration</h3>
          <p className="text-sm text-gray-600 mb-4">
            Run a comprehensive demo showcasing all SaveEasy features including savings, 
            investments, AI assistant, group savings, bill payments, crypto, and marketplace.
          </p>
          <Button 
            onClick={runFullDemo} 
            disabled={isRunningDemo}
            className="w-full"
            size="lg"
          >
            {isRunningDemo ? 'Running Demo...' : 'Start Complete Demo'}
          </Button>
          <p className="text-xs text-gray-500 mt-2">Duration: ~30 seconds</p>
        </div>
      </Card>

      {/* Quick Demos */}
      <div>
        <h3 className="font-medium mb-3">Core Banking Functions</h3>
        <div className="grid grid-cols-2 gap-3">
          {/* Savings Demo */}
          <Card 
            variant="elevated" 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => runQuickDemo('savings')}
          >
            <div className="text-center p-3">
              <div className="bg-green-100 p-3 rounded-lg mb-2 mx-auto w-fit">
                <Icon name="savings" color="#059669" size={24} />
              </div>
              <h4 className="font-medium text-sm">Save Money</h4>
              <p className="text-xs text-gray-600">Deposit ₦5,000</p>
            </div>
          </Card>

          {/* Withdrawal Demo */}
          <Card 
            variant="elevated" 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => runQuickDemo('withdrawal')}
          >
            <div className="text-center p-3">
              <div className="bg-orange-100 p-3 rounded-lg mb-2 mx-auto w-fit">
                <Icon name="bills" color="#EA580C" size={24} />
              </div>
              <h4 className="font-medium text-sm">Withdraw</h4>
              <p className="text-xs text-gray-600">Withdraw ₦2,000</p>
            </div>
          </Card>

          {/* Emergency Fund Demo */}
          <Card 
            variant="elevated" 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => runQuickDemo('emergency')}
          >
            <div className="text-center p-3">
              <div className="bg-red-100 p-3 rounded-lg mb-2 mx-auto w-fit">
                <Icon name="emergency" color="#DC2626" size={24} />
              </div>
              <h4 className="font-medium text-sm">Emergency Fund</h4>
              <p className="text-xs text-gray-600">Access ₦3,000</p>
            </div>
          </Card>

          {/* Group Savings Demo */}
          <Card 
            variant="elevated" 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => runQuickDemo('group')}
          >
            <div className="text-center p-3">
              <div className="bg-blue-100 p-3 rounded-lg mb-2 mx-auto w-fit">
                <Icon name="community" color="#2563EB" size={24} />
              </div>
              <h4 className="font-medium text-sm">Join Group</h4>
              <p className="text-xs text-gray-600">Join savings group</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Advanced Features */}
      <div>
        <h3 className="font-medium mb-3">Advanced Features</h3>
        <div className="grid grid-cols-2 gap-3">
          {/* Bill Payment Demo */}
          <Card 
            variant="elevated" 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => runQuickDemo('bills')}
          >
            <div className="text-center p-3">
              <div className="bg-red-100 p-3 rounded-lg mb-2 mx-auto w-fit">
                <Icon name="bills" color="#DC2626" size={24} />
              </div>
              <h4 className="font-medium text-sm">Pay Bills</h4>
              <p className="text-xs text-gray-600">MTN airtime ₦1,000</p>
            </div>
          </Card>

          {/* Investment Demo */}
          <Card 
            variant="elevated" 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => runQuickDemo('investment')}
          >
            <div className="text-center p-3">
              <div className="bg-yellow-100 p-3 rounded-lg mb-2 mx-auto w-fit">
                <Icon name="crypto" color="#D97706" size={24} />
              </div>
              <h4 className="font-medium text-sm">Invest</h4>
              <p className="text-xs text-gray-600">Buy T-Bills ₦10,000</p>
            </div>
          </Card>

          {/* AI Demo */}
          <Card 
            variant="elevated" 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => runQuickDemo('ai')}
          >
            <div className="text-center p-3">
              <div className="bg-blue-100 p-3 rounded-lg mb-2 mx-auto w-fit">
                <Icon name="literacy" color="#2563EB" size={24} />
              </div>
              <h4 className="font-medium text-sm">AI Assistant</h4>
              <p className="text-xs text-gray-600">Get advice</p>
            </div>
          </Card>

          {/* Crypto Demo */}
          <Card 
            variant="elevated" 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => runQuickDemo('crypto')}
          >
            <div className="text-center p-3">
              <div className="bg-amber-100 p-3 rounded-lg mb-2 mx-auto w-fit">
                <Icon name="crypto" color="#F59E0B" size={24} />
              </div>
              <h4 className="font-medium text-sm">Crypto</h4>
              <p className="text-xs text-gray-600">Buy Bitcoin ₦5,000</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Business & Marketplace */}
      <div>
        <h3 className="font-medium mb-3">Business & Marketplace</h3>
        <div className="grid grid-cols-2 gap-3">
          {/* Marketplace Demo */}
          <Card 
            variant="elevated" 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => runQuickDemo('marketplace')}
          >
            <div className="text-center p-3">
              <div className="bg-purple-100 p-3 rounded-lg mb-2 mx-auto w-fit">
                <Icon name="marketplace" color="#7C3AED" size={24} />
              </div>
              <h4 className="font-medium text-sm">Marketplace</h4>
              <p className="text-xs text-gray-600">List smartphone</p>
            </div>
          </Card>

          {/* Loan Demo */}
          <Card 
            variant="elevated" 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => runQuickDemo('loan')}
          >
            <div className="text-center p-3">
              <div className="bg-indigo-100 p-3 rounded-lg mb-2 mx-auto w-fit">
                <Icon name="loans" color="#4F46E5" size={24} />
              </div>
              <h4 className="font-medium text-sm">Apply Loan</h4>
              <p className="text-xs text-gray-600">Personal ₦25,000</p>
            </div>
          </Card>
        </div>
      </div>

      {/* User Scenarios */}
      <div>
        <h3 className="font-medium mb-3">Investor Scenarios</h3>
        <div className="space-y-3">
          {/* Young Professional */}
          <Card 
            variant="elevated" 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => runScenarioDemo('young-professional')}
          >
            <div className="flex items-center p-4">
              <div className="bg-green-100 p-3 rounded-lg mr-4">
                <Icon name="goals" color="#059669" size={24} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">Young Professional (Sarah, 28)</h4>
                <p className="text-sm text-gray-600">Emergency fund, group savings, investments, AI budgeting</p>
              </div>
              <Badge text="Full Journey" variant="success" size="sm" />
            </div>
          </Card>

          {/* Business Owner */}
          <Card 
            variant="elevated" 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => runScenarioDemo('business-owner')}
          >
            <div className="flex items-center p-4">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <Icon name="marketplace" color="#2563EB" size={24} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">Business Owner (Ahmed, 35)</h4>
                <p className="text-sm text-gray-600">Business loans, team groups, marketplace, bill management</p>
              </div>
              <Badge text="Business Focus" variant="secondary" size="sm" />
            </div>
          </Card>

          {/* University Student */}
          <Card 
            variant="elevated" 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => runScenarioDemo('student')}
          >
            <div className="flex items-center p-4">
              <div className="bg-purple-100 p-3 rounded-lg mr-4">
                <Icon name="literacy" color="#7C3AED" size={24} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">University Student (Kemi, 22)</h4>
                <p className="text-sm text-gray-600">Family groups, textbook sales, crypto learning, voice banking</p>
              </div>
              <Badge text="Youth" variant="challenge" size="sm" />
            </div>
          </Card>
        </div>
      </div>

      {/* Realistic Scenarios */}
      <div>
        <h3 className="font-medium mb-3">Realistic User Scenarios</h3>
        <div className="space-y-3">
          <Card 
            variant="elevated" 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => runRealisticScenario('young-professional')}
          >
            <div className="flex items-center p-3">
              <div className="bg-purple-100 p-3 rounded-lg mr-3">
                <Icon name="profile" color="#8B5CF6" size={24} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm">Young Professional Journey</h4>
                <p className="text-xs text-gray-600">Salary savings → Emergency fund → Investment</p>
              </div>
            </div>
          </Card>

          <Card 
            variant="elevated" 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => runRealisticScenario('emergency-access')}
          >
            <div className="flex items-center p-3">
              <div className="bg-red-100 p-3 rounded-lg mr-3">
                <Icon name="emergency" color="#EF4444" size={24} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm">Emergency Access</h4>
                <p className="text-xs text-gray-600">Medical emergency → Fund access → Recovery</p>
              </div>
            </div>
          </Card>

          <Card 
            variant="elevated" 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => runRealisticScenario('business-growth')}
          >
            <div className="flex items-center p-3">
              <div className="bg-green-100 p-3 rounded-lg mr-3">
                <Icon name="savings" color="#10B981" size={24} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm">Business Growth</h4>
                <p className="text-xs text-gray-600">Profit savings → Goals → Group joining → Investment</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Feature Highlights */}
      <Card>
        <h3 className="font-medium mb-3">Key Features Demonstrated</h3>
        <div className="space-y-3">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            <span className="text-sm">Smart savings with goal tracking and automation</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
            <span className="text-sm">AI-powered financial insights and recommendations</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
            <span className="text-sm">Community marketplace for buying and selling</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
            <span className="text-sm">Investment portfolio with multiple asset classes</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
            <span className="text-sm">Seamless bill payments and money transfers</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
            <span className="text-sm">Voice banking and accessibility features</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-pink-500 rounded-full mr-3"></div>
            <span className="text-sm">Cryptocurrency wallet and staking rewards</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
            <span className="text-sm">Group savings (Ajo/Esusu) with social features</span>
          </div>
        </div>
      </Card>

      {/* Investment Metrics */}
      <Card variant="elevated" className="bg-gradient-to-r from-green-50 to-blue-50">
        <h3 className="font-medium mb-3">Investment-Ready Metrics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">500K+</div>
            <div className="text-sm text-gray-600">Target Users Y1</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">₦2.5B</div>
            <div className="text-sm text-gray-600">Projected AUM</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">15+</div>
            <div className="text-sm text-gray-600">Revenue Streams</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">85%</div>
            <div className="text-sm text-gray-600">User Retention</div>
          </div>
        </div>
      </Card>

      {/* Technical Stack */}
      <Card>
        <h3 className="font-medium mb-3">Technical Excellence</h3>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="bg-blue-100 p-2 rounded-lg mb-2">
              <span className="text-sm font-medium">React + TS</span>
            </div>
            <span className="text-xs text-gray-600">Frontend</span>
          </div>
          <div>
            <div className="bg-green-100 p-2 rounded-lg mb-2">
              <span className="text-sm font-medium">Node.js</span>
            </div>
            <span className="text-xs text-gray-600">Backend</span>
          </div>
          <div>
            <div className="bg-purple-100 p-2 rounded-lg mb-2">
              <span className="text-sm font-medium">AI/ML</span>
            </div>
            <span className="text-xs text-gray-600">Intelligence</span>
          </div>
        </div>
      </Card>

      {/* Call to Action */}
      <Card variant="elevated" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center">
        <h3 className="text-lg font-bold mb-2">Ready to Transform African Finance?</h3>
        <p className="text-sm opacity-90 mb-4">
          Join us in building the future of financial inclusion across Africa
        </p>
        <Button 
          variant="outline" 
          className="border-white text-white hover:bg-white hover:text-indigo-600"
          size="lg"
        >
          Partner With Us
        </Button>
      </Card>
    </div>
  );
};
