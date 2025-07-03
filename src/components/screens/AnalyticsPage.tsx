import React from 'react';
import { Card } from '../design-system/Card';
import { Icon } from '../design-system/Icon';
import { ProgressBar } from '../design-system/ProgressBar';
import { useAppContext } from '../../context/AppContext';
import { formatCurrency } from '../../data/mockData';

export const AnalyticsPage: React.FC = () => {
  const { state } = useAppContext();
  const { analytics, savingsGoals } = state;

  const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="p-4 space-y-6">
      <Card className="bg-gradient-to-r from-[#228B22] to-[#2EA62E] text-white">
        <div className="flex items-center">
          <div className="bg-white bg-opacity-20 p-3 rounded-lg mr-3">
            <Icon name="budgeting" color="white" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold">Financial Analytics</h2>
            <p className="text-sm opacity-90">Insights into your financial health</p>
          </div>
        </div>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-3">
        <Card variant="elevated">
          <div className="text-center">
            <h3 className="text-sm text-gray-600 mb-1">Savings Rate</h3>
            <p className="text-2xl font-bold text-green-600">{analytics.savingsRate}%</p>
            <p className="text-xs text-gray-500">of income saved</p>
          </div>
        </Card>
        <Card variant="elevated">
          <div className="text-center">
            <h3 className="text-sm text-gray-600 mb-1">Total Saved</h3>
            <p className="text-2xl font-bold text-blue-600">
              {formatCurrency(analytics.totalSavings)}
            </p>
            <p className="text-xs text-gray-500">across all goals</p>
          </div>
        </Card>
      </div>

      {/* Monthly Overview */}
      <Card>
        <h3 className="font-medium mb-3">{currentMonth} Overview</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Income</span>
            <span className="font-medium text-green-600">
              {formatCurrency(analytics.monthlyIncome)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Expenses</span>
            <span className="font-medium text-red-600">
              {formatCurrency(analytics.monthlyExpenses)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Net Savings</span>
            <span className="font-medium text-blue-600">
              {formatCurrency(analytics.monthlyIncome - analytics.monthlyExpenses)}
            </span>
          </div>
          <div className="pt-2">
            <ProgressBar 
              progress={analytics.savingsRate} 
              size="md" 
              showValue={true}
              currentValue={analytics.monthlyIncome - analytics.monthlyExpenses}
              targetValue={analytics.monthlyIncome}
            />
          </div>
        </div>
      </Card>

      {/* Spending Categories */}
      <Card>
        <h3 className="font-medium mb-3">Top Spending Categories</h3>
        <div className="space-y-3">
          {analytics.topSpendingCategories.map((category, index) => (
            <div key={category.category} className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                <span className="text-sm font-medium">{index + 1}</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">{category.category}</span>
                  <span className="text-sm text-gray-600">{category.percentage}%</span>
                </div>
                <ProgressBar progress={category.percentage} size="sm" />
              </div>
              <div className="ml-3 text-right">
                <p className="text-sm font-medium">{formatCurrency(category.amount)}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Savings Growth */}
      <Card>
        <h3 className="font-medium mb-3">Savings Growth Trend</h3>
        <div className="space-y-2">
          {analytics.savingsGrowth.slice(-6).map((point) => (
            <div key={point.month} className="flex items-center">
              <span className="text-sm text-gray-600 w-12">{point.month}</span>
              <div className="flex-1 mx-3">
                <ProgressBar 
                  progress={(point.amount / Math.max(...analytics.savingsGrowth.map(p => p.amount))) * 100} 
                  size="sm" 
                  variant="savings"
                />
              </div>
              <span className="text-sm font-medium w-20 text-right">
                {formatCurrency(point.amount)}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Goal Progress */}
      <Card>
        <h3 className="font-medium mb-3">Goal Progress Summary</h3>
        <div className="space-y-3">
          {analytics.goalProgress.map((goal) => {
            const goalData = savingsGoals.find(g => g.name === goal.goalName);
            return (
              <div key={goal.goalName} className="flex items-center">
                <div className="bg-[#228B22] bg-opacity-20 p-2 rounded-lg mr-3">
                  <Icon name="goals" color="#228B22" size={16} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{goal.goalName}</span>
                    <span className="text-sm text-gray-600">{goal.progress}%</span>
                  </div>
                  <ProgressBar progress={goal.progress} size="sm" variant="savings" />
                  {goalData && (
                    <p className="text-xs text-gray-500 mt-1">
                      {formatCurrency(goalData.currentAmount)} of {formatCurrency(goalData.targetAmount)}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Financial Health Score */}
      <Card variant="highlight">
        <div className="text-center">
          <h3 className="font-medium mb-2">Financial Health Score</h3>
          <div className="mb-4">
            <div className="text-4xl font-bold text-green-600 mb-1">
              {Math.round((analytics.savingsRate + 
                (analytics.totalSavings / 10000 * 10) + 
                (savingsGoals.filter(g => g.currentAmount > 0).length * 15)) / 3)}
            </div>
            <div className="text-sm text-gray-600">out of 100</div>
          </div>
          <div className="space-y-2 text-left">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm">Active savings goals: {savingsGoals.length}</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm">Consistent saving pattern</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
              <span className="text-sm">Emergency fund: {formatCurrency(state.user.emergencyFund)}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Recommendations */}
      <Card variant="elevated" className="bg-blue-50 border-l-4 border-blue-500">
        <div className="flex">
          <div className="mr-3">
            <Icon name="literacy" color="#87CEEB" />
          </div>
          <div>
            <h4 className="font-medium mb-2">Personalized Recommendations</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              {analytics.savingsRate < 20 && (
                <li>• Try to increase your savings rate to 20% of income</li>
              )}
              {state.user.emergencyFund < 10000 && (
                <li>• Build your emergency fund to at least ₦10,000</li>
              )}
              {savingsGoals.filter(g => g.autoSave).length === 0 && (
                <li>• Enable auto-save on your goals for consistent progress</li>
              )}
              <li>• Consider joining a savings group to stay motivated</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};
