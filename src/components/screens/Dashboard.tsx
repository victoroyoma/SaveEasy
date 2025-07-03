import React, { useState } from 'react';
import { Card } from '../design-system/Card';
import { Button } from '../design-system/Button';
import { ProgressBar } from '../design-system/ProgressBar';
import { Icon } from '../design-system/Icon';
import { Badge } from '../design-system/Badge';
import { NotificationBadge } from '../design-system/NotificationBadge';
import { useAppContext, useAppActions } from '../../context/AppContext';
import { formatCurrency } from '../../data/mockData';
import { quickInvestorDemo } from '../../services/investorDemoService';

interface DashboardProps {
  onNavigate?: (screen: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { state } = useAppContext();
  const actions = useAppActions();
  const [isProcessing, setIsProcessing] = useState(false);
  const { user, savingsGoals, notifications, challenges, transactions } = state;

  // Quick action handlers
  const handleQuickDeposit = async () => {
    setIsProcessing(true);
    try {
      await quickInvestorDemo.quickSavings(actions, 1000);
    } catch (error) {
      console.error('Quick deposit failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleQuickWithdraw = async () => {
    setIsProcessing(true);
    try {
      await quickInvestorDemo.quickWithdrawal(actions, 500);
    } catch (error) {
      console.error('Quick withdrawal failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  const unreadNotifications = notifications.filter(n => !n.read).length;
  const activeChallenge = challenges.find(c => c.isActive);
  const recentTransactions = transactions.slice(0, 3);
  const primaryGoal = savingsGoals.find(g => g.name === 'School Fees');

  // Helper functions for transaction display
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit': return 'savings';
      case 'withdrawal': return 'emergency';
      case 'bill_payment': return 'bills';
      case 'group_contribution': return 'community';
      case 'goal_contribution': return 'goals';
      default: return 'savings';
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'deposit': return '#228B22';
      case 'withdrawal': return '#FF4040';
      case 'bill_payment': return '#87CEEB';
      case 'group_contribution': return '#FFD700';
      case 'goal_contribution': return '#228B22';
      default: return '#87CEEB';
    }
  };

  const handleNavigation = (screen: string) => {
    if (onNavigate) {
      onNavigate(screen);
    }
  };
  return <div className="p-4 space-y-5 pb-20">
      {/* Welcome Message */}
      <div className="mb-2 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-800">
            Welcome, {user.name.split(' ')[0]}! 👋
          </h2>
          <p className="text-sm text-gray-600">
            Let's continue building your financial future
          </p>
        </div>
        {unreadNotifications > 0 && (
          <button onClick={() => handleNavigation('notifications')} className="relative">
            <Icon name="notifications" size={24} color="#87CEEB" />
            <NotificationBadge count={unreadNotifications} className="absolute -top-1 -right-1" />
          </button>
        )}
      </div>
      
      {/* Balance Card */}
      <Card variant="savings" className="overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mt-10 -mr-10"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full -mb-10 -ml-10"></div>
        <div className="text-center py-2">
          <p className="text-sm opacity-90 font-medium">Total Savings</p>
          <h2 className="text-4xl font-bold my-2">{formatCurrency(user.totalSavings)}</h2>
          {primaryGoal && (
            <div className="mb-4 mx-auto max-w-xs">
              <ProgressBar 
                progress={(primaryGoal.currentAmount / primaryGoal.targetAmount) * 100} 
                color="#FFD700" 
                size="md" 
                showValue={true} 
                currentValue={primaryGoal.currentAmount} 
                targetValue={primaryGoal.targetAmount} 
                className="mb-2" 
              />
              <p className="text-xs opacity-75">{primaryGoal.name} Progress</p>
            </div>
          )}
          <div className="flex justify-center gap-3 mt-4">
            <Button 
              variant="outline" 
              size="md" 
              className="border-white text-white hover:bg-white hover:bg-opacity-20" 
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5L12 19M12 19L18 13M12 19L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>}
              onClick={handleQuickWithdraw}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Withdraw'}
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:bg-opacity-20" 
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 19L12 5M12 5L6 11M12 5L18 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>}
              onClick={handleQuickDeposit}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Add Money'}
            </Button>
          </div>
        </div>
      </Card>
      {/* Emergency Fund */}
      <Card variant="emergency" className="flex items-center">
        <div className="mr-3">
          <Icon name="emergency" size={28} color="#FF4040" />
        </div>
        <div className="flex-1">
          <h4 className="font-medium">Emergency Fund</h4>
          <p className="text-sm text-gray-600">{formatCurrency(user.emergencyFund)} available</p>
        </div>
        <Button variant="emergency" size="sm">
          Access
        </Button>
      </Card>
      
      {/* Quick Actions */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-gray-800">Quick Actions</h3>
          <Button variant="text" size="sm" onClick={() => handleNavigation('analytics')}>
            View Analytics
          </Button>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {[{
          name: 'Save',
          icon: 'savings',
          color: '#228B22',
          screen: 'savings'
        }, {
          name: 'AI Help',
          icon: 'literacy',
          color: '#FFD700',
          screen: 'ai-assistant'
        }, {
          name: 'Budget',
          icon: 'budgeting',
          color: '#228B22',
          screen: 'budget'
        }, {
          name: 'Invest',
          icon: 'crypto',
          color: '#FFD700',
          screen: 'investments'
        }].map(action => <Card 
              key={action.name} 
              variant="elevated" 
              className="flex flex-col items-center py-4 px-2 hover:scale-[1.03] transition-transform cursor-pointer"
              onClick={() => handleNavigation(action.screen)}
            >
              <div className={`flex items-center justify-center w-12 h-12 rounded-full mb-2`} style={{
            backgroundColor: `${action.color}15`
          }}>
                <Icon name={action.icon as any} color={action.color} size={22} />
              </div>
              <span className="text-xs font-medium text-center text-gray-700">
                {action.name}
              </span>
            </Card>)}
        </div>
      </div>

      {/* Additional Features */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-gray-800">More Services</h3>
          <Button variant="text" size="sm" onClick={() => handleNavigation('profile')}>
            View All
          </Button>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {[{
          name: 'Loans',
          icon: 'loans',
          color: '#87CEEB',
          screen: 'loans'
        }, {
          name: 'Bills',
          icon: 'bills',
          color: '#FF4040',
          screen: 'bills'
        }, {
          name: 'Crypto',
          icon: 'crypto',
          color: '#FFD700',
          screen: 'crypto'
        }, {
          name: 'Voice',
          icon: 'notifications',
          color: '#87CEEB',
          screen: 'voice'
        }].map(action => <Card 
              key={action.name} 
              variant="elevated" 
              className="flex flex-col items-center py-4 px-2 hover:scale-[1.03] transition-transform cursor-pointer"
              onClick={() => handleNavigation(action.screen)}
            >
              <div className={`flex items-center justify-center w-12 h-12 rounded-full mb-2`} style={{
            backgroundColor: `${action.color}15`
          }}>
                <Icon name={action.icon as any} color={action.color} size={22} />
              </div>
              <span className="text-xs font-medium text-center text-gray-700">
                {action.name}
              </span>
            </Card>)}
        </div>
      </div>

      {/* AI Financial Insights */}
      <Card variant="elevated" className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500">
        <div className="flex items-start">
          <div className="bg-blue-100 p-3 rounded-lg mr-3">
            <Icon name="literacy" color="#2563EB" size={24} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-800">AI Financial Insight</h4>
              <Badge text="New" variant="secondary" size="xs" />
            </div>
            <p className="text-sm text-gray-700 mb-3">
              Based on your spending patterns, you could save an additional ₦3,000 monthly by optimizing bill payments and reducing unnecessary subscriptions.
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-blue-500 text-blue-600 hover:bg-blue-50"
              onClick={() => handleNavigation('ai-assistant')}
            >
              Ask AI Assistant
            </Button>
          </div>
        </div>
      </Card>

      {/* Investment Opportunity */}
      <Card variant="elevated" className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500">
        <div className="flex items-start">
          <div className="bg-green-100 p-3 rounded-lg mr-3">
            <Icon name="crypto" color="#059669" size={24} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-800">Investment Opportunity</h4>
              <Badge text="8.5% APY" variant="success" size="xs" />
            </div>
            <p className="text-sm text-gray-700 mb-3">
              Start investing with as little as ₦1,000. Diversify your portfolio with Treasury Bills, Mutual Funds, and more.
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-green-500 text-green-600 hover:bg-green-50"
              onClick={() => handleNavigation('investments')}
            >
              Start Investing
            </Button>
          </div>
        </div>
      </Card>

      {/* Savings Challenge */}
      {activeChallenge && (
        <Card variant="challenge">
          <div className="flex items-center mb-2">
            <div className="bg-[#FFD700] bg-opacity-15 p-2 rounded-lg mr-3">
              <Icon name="challenges" size={24} color="#FFD700" />
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <h4 className="font-medium">{activeChallenge.name}</h4>
                <Badge text="Active" variant="challenge" size="xs" className="ml-2" />
              </div>
              <p className="text-xs text-gray-600">{activeChallenge.description}</p>
            </div>
          </div>
          <div className="mt-2">
            <ProgressBar progress={activeChallenge.progress} variant="challenge" size="sm" />
            <div className="flex justify-between text-xs mt-1">
              <span>Day {activeChallenge.currentDay} of {activeChallenge.totalDays}</span>
              <span className="font-medium">{formatCurrency(Number(activeChallenge.savedAmount) || 0)} saved</span>
            </div>
          </div>
          <div className="mt-3 flex justify-between items-center">
            <Button 
              variant="text" 
              size="sm" 
              className="text-[#FFD700]"
              onClick={() => handleNavigation('challenges')}
            >
              View Details
            </Button>
            <Badge 
              text={`${activeChallenge.progress}% Complete`} 
              variant="secondary" 
              size="xs" 
              icon={<Icon name="goals" size={12} color="#333333" />} 
            />
          </div>
        </Card>
      )}

      {/* Marketplace Promotion */}
      <Card variant="elevated" className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500">
        <div className="flex items-start">
          <div className="bg-purple-100 p-3 rounded-lg mr-3">
            <Icon name="marketplace" color="#7C3AED" size={24} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-800">Community Marketplace</h4>
              <Badge text="Popular" variant="secondary" size="xs" />
            </div>
            <p className="text-sm text-gray-700 mb-3">
              Buy and sell items in your community. Earn money while helping others save on quality products.
            </p>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-purple-500 text-purple-600 hover:bg-purple-50 flex-1"
                onClick={() => handleNavigation('marketplace')}
              >
                Browse Items
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-purple-500 text-purple-600 hover:bg-purple-50 flex-1"
                onClick={() => handleNavigation('marketplace')}
              >
                Sell Item
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Financial Tips */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-gray-800">Financial Tips</h3>
          <a href="#" className="text-sm text-[#87CEEB] font-medium">
            See All
          </a>
        </div>
        <Card variant="literacy" className="hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="bg-[#FFD700] bg-opacity-15 p-3 rounded-full mr-3">
              <Icon name="literacy" color="#FFD700" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-800">Budget Basics</h4>
              <p className="text-sm text-gray-600">
                Learn how to manage your daily expenses
              </p>
            </div>
            <Badge text="New" variant="secondary" size="sm" />
          </div>
        </Card>
      </div>
      {/* Savings Groups */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-gray-800">Your Groups</h3>
          <a href="#" className="text-sm text-[#87CEEB] font-medium">
            See All
          </a>
        </div>
        <Card variant="group" className="hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="bg-[#87CEEB] bg-opacity-15 p-3 rounded-full mr-3">
              <Icon name="community" color="#87CEEB" />
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <h4 className="font-medium text-gray-800">Market Traders</h4>
                <NotificationBadge count={1} className="ml-2" />
              </div>
              <p className="text-sm text-gray-600">
                Next contribution: Tomorrow
              </p>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-800">₦1,000</p>
              <p className="text-xs text-gray-500">Weekly</p>
            </div>
          </div>
        </Card>
      </div>
      {/* Recent Transactions */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-gray-800">Recent Activity</h3>
          <a href="#" className="text-sm text-[#87CEEB] font-medium">
            See All
          </a>
        </div>
        <Card variant="bordered" className="divide-y divide-gray-100">
          {recentTransactions.map((transaction, index) => <div key={index} className={`flex items-center ${index > 0 ? 'pt-3 mt-3' : ''}`}>
              <div className="p-2.5 rounded-full mr-3 flex items-center justify-center" style={{
            backgroundColor: `${getTransactionColor(transaction.type)}15`
          }}>
                <Icon name={getTransactionIcon(transaction.type) as any} color={getTransactionColor(transaction.type)} size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">
                  {transaction.description}
                </h4>
                <p className="text-xs text-gray-500">{new Date(transaction.date).toLocaleDateString()}</p>
              </div>
              <p className={`font-medium ${transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'}`}>
                {transaction.type === 'deposit' ? '+' : '-'}₦{transaction.amount.toLocaleString()}
              </p>
            </div>)}
        </Card>
      </div>

      {/* Demo Access for Investors */}
      <Card variant="elevated" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-white bg-opacity-20 p-3 rounded-lg mr-3">
              <Icon name="challenges" color="white" size={24} />
            </div>
            <div>
              <h4 className="font-medium">Investor Demo</h4>
              <p className="text-sm opacity-90">Experience all features in action</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-white text-white hover:bg-white hover:text-indigo-600"
            onClick={() => handleNavigation('demo')}
          >
            Run Demo
          </Button>
        </div>
      </Card>
    </div>;
};