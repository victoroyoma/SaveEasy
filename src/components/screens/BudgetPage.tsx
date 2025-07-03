import React, { useState } from 'react';
import { Card } from '../design-system/Card';
import { Button } from '../design-system/Button';
import { Icon } from '../design-system/Icon';
import { Badge } from '../design-system/Badge';
import { ProgressBar } from '../design-system/ProgressBar';
import { formatCurrency } from '../../data/mockData';

interface BudgetCategory {
  id: string;
  name: string;
  allocatedAmount: number;
  spentAmount: number;
  color: string;
  icon: string;
  isEssential: boolean;
}

export const BudgetPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'categories' | 'insights'>('overview');
  const [showCreateBudget, setShowCreateBudget] = useState(false);

  const currentBudget = {
    id: '1',
    name: 'Monthly Budget - July 2025',
    totalAmount: 80000,
    spentAmount: 52000,
    period: 'monthly' as const,
    daysLeft: 8
  };

  const categories: BudgetCategory[] = [
    {
      id: '1',
      name: 'Food & Groceries',
      allocatedAmount: 25000,
      spentAmount: 18500,
      color: '#228B22',
      icon: 'bills',
      isEssential: true
    },
    {
      id: '2',
      name: 'Transportation',
      allocatedAmount: 15000,
      spentAmount: 12000,
      color: '#87CEEB',
      icon: 'community',
      isEssential: true
    },
    {
      id: '3',
      name: 'Entertainment',
      allocatedAmount: 10000,
      spentAmount: 12000,
      color: '#FFD700',
      icon: 'challenges',
      isEssential: false
    },
    {
      id: '4',
      name: 'Shopping',
      allocatedAmount: 8000,
      spentAmount: 4500,
      color: '#FF4040',
      icon: 'marketplace',
      isEssential: false
    },
    {
      id: '5',
      name: 'Bills & Utilities',
      allocatedAmount: 20000,
      spentAmount: 19000,
      color: '#8A2BE2',
      icon: 'bills',
      isEssential: true
    },
    {
      id: '6',
      name: 'Savings',
      allocatedAmount: 20000,
      spentAmount: 15000,
      color: '#32CD32',
      icon: 'savings',
      isEssential: true
    }
  ];

  const getSpendingStatus = (spent: number, allocated: number) => {
    const percentage = (spent / allocated) * 100;
    if (percentage > 100) return { status: 'over', color: '#FF4040' };
    if (percentage > 80) return { status: 'warning', color: '#FFD700' };
    return { status: 'good', color: '#228B22' };
  };

  const totalSpent = categories.reduce((sum, cat) => sum + cat.spentAmount, 0);
  const totalAllocated = categories.reduce((sum, cat) => sum + cat.allocatedAmount, 0);
  const remainingBudget = totalAllocated - totalSpent;

  const insights = [
    {
      type: 'warning',
      title: 'Over Budget Alert',
      description: 'You\'ve exceeded your Entertainment budget by ₦2,000',
      action: 'Adjust spending'
    },
    {
      type: 'info',
      title: 'Savings Opportunity',
      description: 'You\'re under budget in Shopping by ₦3,500',
      action: 'Add to savings'
    },
    {
      type: 'success',
      title: 'Good Progress',
      description: 'Your essential expenses are well managed',
      action: 'Keep it up'
    }
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-[#228B22] to-[#2EA62E] text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-white bg-opacity-20 p-3 rounded-lg mr-3">
              <Icon name="budgeting" color="white" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Budget Manager</h2>
              <p className="text-sm opacity-90">Track and control your spending</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-white text-white hover:bg-white hover:text-green-600"
            onClick={() => setShowCreateBudget(true)}
          >
            Create Budget
          </Button>
        </div>
      </Card>

      {/* Tab Navigation */}
      <div className="flex rounded-lg overflow-hidden border border-gray-200">
        {[
          { key: 'overview', label: 'Overview' },
          { key: 'categories', label: 'Categories' },
          { key: 'insights', label: 'Insights' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex-1 py-2 text-sm font-medium ${
              activeTab === tab.key
                ? 'bg-[#228B22] text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Budget Overview */}
          <Card>
            <h3 className="font-medium mb-4">Budget Overview</h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800 mb-1">
                  {formatCurrency(remainingBudget)}
                </div>
                <p className="text-sm text-gray-600">Remaining this month</p>
              </div>
              
              <ProgressBar 
                progress={(totalSpent / totalAllocated) * 100} 
                color={remainingBudget < 0 ? '#FF4040' : '#228B22'}
                size="lg"
                showValue={true}
                currentValue={totalSpent}
                targetValue={totalAllocated}
              />

              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <div className="font-medium text-gray-800">{formatCurrency(totalAllocated)}</div>
                  <div className="text-gray-600">Budgeted</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">{formatCurrency(totalSpent)}</div>
                  <div className="text-gray-600">Spent</div>
                </div>
                <div>
                  <div className="font-medium text-gray-800">{currentBudget.daysLeft} days</div>
                  <div className="text-gray-600">Remaining</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card variant="elevated">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {categories.filter(c => getSpendingStatus(c.spentAmount, c.allocatedAmount).status === 'good').length}
                </div>
                <p className="text-sm text-gray-600">Categories on track</p>
              </div>
            </Card>
            <Card variant="elevated">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 mb-1">
                  {categories.filter(c => getSpendingStatus(c.spentAmount, c.allocatedAmount).status === 'over').length}
                </div>
                <p className="text-sm text-gray-600">Over budget</p>
              </div>
            </Card>
          </div>

          {/* Top Categories */}
          <Card>
            <h3 className="font-medium mb-3">Top Spending Categories</h3>
            <div className="space-y-3">
              {categories
                .sort((a, b) => b.spentAmount - a.spentAmount)
                .slice(0, 3)
                .map((category) => {
                  const status = getSpendingStatus(category.spentAmount, category.allocatedAmount);
                  return (
                    <div key={category.id} className="flex items-center">
                      <div 
                        className="p-2 rounded-lg mr-3"
                        style={{ backgroundColor: `${category.color}20` }}
                      >
                        <Icon name={category.icon as any} color={category.color} size={20} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{category.name}</h4>
                        <div className="text-sm text-gray-600">
                          {formatCurrency(category.spentAmount)} of {formatCurrency(category.allocatedAmount)}
                        </div>
                      </div>
                      <Badge 
                        text={`${Math.round((category.spentAmount / category.allocatedAmount) * 100)}%`}
                        variant={status.status === 'over' ? 'secondary' : 'success'}
                        size="sm"
                      />
                    </div>
                  );
                })}
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'categories' && (
        <div className="space-y-4">
          {categories.map((category) => {
            const status = getSpendingStatus(category.spentAmount, category.allocatedAmount);
            const percentage = Math.min((category.spentAmount / category.allocatedAmount) * 100, 100);
            
            return (
              <Card key={category.id}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div 
                      className="p-2 rounded-lg mr-3"
                      style={{ backgroundColor: `${category.color}20` }}
                    >
                      <Icon name={category.icon as any} color={category.color} size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium">{category.name}</h4>
                      <div className="flex items-center text-sm text-gray-600">
                        {category.isEssential && (
                          <Badge text="Essential" variant="success" size="xs" className="mr-2" />
                        )}
                        <span>{formatCurrency(category.spentAmount)} of {formatCurrency(category.allocatedAmount)}</span>
                      </div>
                    </div>
                  </div>
                  <Badge 
                    text={status.status === 'over' ? 'Over' : status.status === 'warning' ? 'Warning' : 'Good'}
                    variant={status.status === 'over' ? 'secondary' : 'success'}
                    size="sm"
                  />
                </div>
                
                <ProgressBar 
                  progress={percentage}
                  color={status.color}
                  size="md"
                />
                
                <div className="flex justify-between items-center mt-2 text-sm">
                  <span className="text-gray-600">
                    Remaining: {formatCurrency(Math.max(0, category.allocatedAmount - category.spentAmount))}
                  </span>
                  <span style={{ color: status.color }}>
                    {Math.round(percentage)}%
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {activeTab === 'insights' && (
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <Card 
              key={index}
              className={`border-l-4 ${
                insight.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
                insight.type === 'info' ? 'border-blue-500 bg-blue-50' :
                'border-green-500 bg-green-50'
              }`}
            >
              <div className="flex items-start">
                <div className="mr-3">
                  <Icon 
                    name="notifications"
                    color={
                      insight.type === 'warning' ? '#FFD700' :
                      insight.type === 'info' ? '#87CEEB' :
                      '#228B22'
                    }
                    size={20}
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{insight.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    {insight.action}
                  </Button>
                </div>
              </div>
            </Card>
          ))}

          {/* Budget Tips */}
          <Card variant="elevated" className="bg-blue-50 border-l-4 border-blue-500">
            <div className="flex">
              <div className="mr-3">
                <Icon name="literacy" color="#87CEEB" />
              </div>
              <div>
                <h4 className="font-medium mb-2">Budget Tips</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings</li>
                  <li>• Review and adjust your budget weekly</li>
                  <li>• Set up automatic transfers for savings</li>
                  <li>• Track every expense, no matter how small</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Create Budget Modal would go here */}
      {showCreateBudget && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <h3 className="font-medium mb-4">Create New Budget</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Budget Name
                </label>
                <input 
                  type="text" 
                  placeholder="e.g., Monthly Budget - August 2025"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#228B22] focus:border-[#228B22]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Amount
                </label>
                <input 
                  type="number" 
                  placeholder="₦80,000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#228B22] focus:border-[#228B22]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Period
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#228B22] focus:border-[#228B22]">
                  <option>Monthly</option>
                  <option>Weekly</option>
                  <option>Yearly</option>
                </select>
              </div>
              <div className="flex space-x-2 pt-4">
                <Button className="flex-1">Create Budget</Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowCreateBudget(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
