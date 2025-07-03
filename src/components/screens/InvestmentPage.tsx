import React, { useState } from 'react';
import { Card } from '../design-system/Card';
import { Button } from '../design-system/Button';
import { Icon } from '../design-system/Icon';
import { Badge } from '../design-system/Badge';
import { ProgressBar } from '../design-system/ProgressBar';
import { formatCurrency } from '../../data/mockData';

interface Investment {
  id: string;
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
}

export const InvestmentPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'explore' | 'education'>('portfolio');

  const portfolio = {
    totalValue: 125000,
    dayChange: 2500,
    dayChangePercentage: 2.04,
    totalGain: 15000,
    totalGainPercentage: 13.64
  };

  const investments: Investment[] = [
    {
      id: '1',
      type: 'treasury_bills',
      name: 'Nigerian Treasury Bills',
      amount: 50000,
      units: 1,
      purchasePrice: 50000,
      currentPrice: 52500,
      purchaseDate: '2024-06-01',
      platform: 'Central Bank',
      status: 'active'
    },
    {
      id: '2',
      type: 'stocks',
      name: 'Dangote Cement',
      symbol: 'DANGCEM',
      amount: 30000,
      units: 100,
      purchasePrice: 300,
      currentPrice: 320,
      purchaseDate: '2024-05-15',
      platform: 'Nigerian Stock Exchange',
      status: 'active'
    },
    {
      id: '3',
      type: 'mutual_funds',
      name: 'Stanbic Money Market Fund',
      amount: 25000,
      units: 250,
      purchasePrice: 100,
      currentPrice: 108,
      purchaseDate: '2024-04-20',
      platform: 'Stanbic IBTC',
      status: 'active'
    },
    {
      id: '4',
      type: 'crypto',
      name: 'Bitcoin',
      symbol: 'BTC',
      amount: 20000,
      units: 0.0003,
      purchasePrice: 66666667,
      currentPrice: 70000000,
      purchaseDate: '2024-06-10',
      platform: 'Binance',
      status: 'active'
    }
  ];

  const investmentOptions = [
    {
      type: 'treasury_bills',
      name: 'Treasury Bills',
      description: 'Government-backed, low-risk investment',
      minAmount: 10000,
      expectedReturn: '8-12%',
      risk: 'Low',
      color: '#228B22'
    },
    {
      type: 'stocks',
      name: 'Nigerian Stocks',
      description: 'Shares in Nigerian companies',
      minAmount: 5000,
      expectedReturn: '15-25%',
      risk: 'High',
      color: '#FF4040'
    },
    {
      type: 'mutual_funds',
      name: 'Mutual Funds',
      description: 'Diversified fund management',
      minAmount: 1000,
      expectedReturn: '10-18%',
      risk: 'Medium',
      color: '#87CEEB'
    },
    {
      type: 'real_estate',
      name: 'Real Estate',
      description: 'Property investment trusts',
      minAmount: 50000,
      expectedReturn: '12-20%',
      risk: 'Medium',
      color: '#FFD700'
    }
  ];

  const getInvestmentIcon = (type: string) => {
    switch (type) {
      case 'stocks': return 'budgeting';
      case 'crypto': return 'crypto';
      case 'treasury_bills': return 'bills';
      case 'mutual_funds': return 'community';
      case 'real_estate': return 'goals';
      default: return 'savings';
    }
  };

  const assetAllocation = [
    { type: 'Treasury Bills', percentage: 40, value: 50000, color: '#228B22' },
    { type: 'Stocks', percentage: 24, value: 30000, color: '#FF4040' },
    { type: 'Mutual Funds', percentage: 20, value: 25000, color: '#87CEEB' },
    { type: 'Crypto', percentage: 16, value: 20000, color: '#FFD700' }
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-white bg-opacity-20 p-3 rounded-lg mr-3">
              <Icon name="crypto" color="white" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Investment Portfolio</h2>
              <p className="text-sm opacity-90">Grow your wealth smartly</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Tab Navigation */}
      <div className="flex rounded-lg overflow-hidden border border-gray-200">
        {[
          { key: 'portfolio', label: 'My Portfolio' },
          { key: 'explore', label: 'Explore' },
          { key: 'education', label: 'Learn' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex-1 py-2 text-sm font-medium ${
              activeTab === tab.key
                ? 'bg-[#FFD700] text-black'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'portfolio' && (
        <div className="space-y-6">
          {/* Portfolio Summary */}
          <Card>
            <h3 className="font-medium mb-4">Portfolio Overview</h3>
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-gray-800 mb-1">
                {formatCurrency(portfolio.totalValue)}
              </div>
              <div className={`text-sm ${portfolio.dayChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {portfolio.dayChange >= 0 ? '+' : ''}{formatCurrency(portfolio.dayChange)} ({portfolio.dayChange >= 0 ? '+' : ''}{portfolio.dayChangePercentage}%) today
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center text-sm">
              <div>
                <div className="font-medium text-gray-800">{formatCurrency(portfolio.totalGain)}</div>
                <div className="text-gray-600">Total Gain</div>
              </div>
              <div>
                <div className="font-medium text-gray-800">{portfolio.totalGainPercentage}%</div>
                <div className="text-gray-600">Return Rate</div>
              </div>
            </div>
          </Card>

          {/* Asset Allocation */}
          <Card>
            <h3 className="font-medium mb-4">Asset Allocation</h3>
            <div className="space-y-3">
              {assetAllocation.map((asset, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded mr-3"
                    style={{ backgroundColor: asset.color }}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{asset.type}</span>
                      <span className="text-sm text-gray-600">{asset.percentage}%</span>
                    </div>
                    <div className="text-sm text-gray-600">{formatCurrency(asset.value)}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Individual Investments */}
          <div>
            <h3 className="font-medium mb-3">Your Investments</h3>
            <div className="space-y-3">
              {investments.map((investment) => {
                const gain = (investment.currentPrice - investment.purchasePrice) * investment.units;
                const gainPercentage = ((investment.currentPrice - investment.purchasePrice) / investment.purchasePrice) * 100;
                
                return (
                  <Card key={investment.id}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-gray-100 p-2 rounded-lg mr-3">
                          <Icon name={getInvestmentIcon(investment.type) as any} color="#333333" size={20} />
                        </div>
                        <div>
                          <h4 className="font-medium">{investment.name}</h4>
                          <div className="text-sm text-gray-600">
                            {investment.symbol && `${investment.symbol} • `}
                            {investment.units} units • {investment.platform}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{formatCurrency(investment.currentPrice * investment.units)}</div>
                        <div 
                          className={`text-sm ${gain >= 0 ? 'text-green-600' : 'text-red-600'}`}
                        >
                          {gain >= 0 ? '+' : ''}{formatCurrency(gain)} ({gain >= 0 ? '+' : ''}{gainPercentage.toFixed(2)}%)
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'explore' && (
        <div className="space-y-6">
          {/* Investment Options */}
          <div>
            <h3 className="font-medium mb-3">Investment Options</h3>
            <div className="space-y-4">
              {investmentOptions.map((option, index) => (
                <Card key={index}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="p-3 rounded-lg mr-3"
                        style={{ backgroundColor: `${option.color}20` }}
                      >
                        <Icon name={getInvestmentIcon(option.type) as any} color={option.color} size={24} />
                      </div>
                      <div>
                        <h4 className="font-medium">{option.name}</h4>
                        <p className="text-sm text-gray-600">{option.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                          <span>Min: {formatCurrency(option.minAmount)}</span>
                          <span>Return: {option.expectedReturn}</span>
                          <Badge 
                            text={option.risk} 
                            size="xs" 
                            variant={option.risk === 'Low' ? 'success' : 'secondary'}
                          />
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Invest
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Market Insights */}
          <Card variant="elevated" className="bg-blue-50 border-l-4 border-blue-500">
            <div className="flex">
              <div className="mr-3">
                <Icon name="budgeting" color="#87CEEB" />
              </div>
              <div>
                <h4 className="font-medium mb-2">Market Insights</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Nigerian stocks are showing positive momentum this quarter</li>
                  <li>• Treasury Bills offering attractive rates due to economic policy</li>
                  <li>• Consider diversifying with international exposure</li>
                  <li>• Crypto markets remain volatile but promising long-term</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'education' && (
        <div className="space-y-6">
          {/* Investment Courses */}
          <div>
            <h3 className="font-medium mb-3">Investment Education</h3>
            <div className="space-y-3">
              {[
                {
                  title: 'Investment Basics',
                  description: 'Understanding risk, return, and diversification',
                  duration: '15 min',
                  progress: 0,
                  level: 'Beginner'
                },
                {
                  title: 'Stock Market Fundamentals',
                  description: 'How to analyze and pick stocks',
                  duration: '25 min',
                  progress: 60,
                  level: 'Intermediate'
                },
                {
                  title: 'Cryptocurrency Guide',
                  description: 'Understanding digital assets and blockchain',
                  duration: '20 min',
                  progress: 100,
                  level: 'Beginner'
                },
                {
                  title: 'Portfolio Management',
                  description: 'Building and managing a diversified portfolio',
                  duration: '30 min',
                  progress: 0,
                  level: 'Advanced'
                }
              ].map((course, index) => (
                <Card key={index}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-[#FFD700] bg-opacity-20 p-2 rounded-lg mr-3">
                        <Icon name="literacy" color="#FFD700" size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center">
                          <h4 className="font-medium">{course.title}</h4>
                          <Badge text={course.level} variant="secondary" size="xs" className="ml-2" />
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                        <div className="text-xs text-gray-500 mt-1">{course.duration}</div>
                        {course.progress > 0 && (
                          <div className="mt-2">
                            <ProgressBar progress={course.progress} size="sm" />
                          </div>
                        )}
                      </div>
                    </div>
                    <Button 
                      variant={course.progress === 100 ? "secondary" : "primary"} 
                      size="sm"
                    >
                      {course.progress === 100 ? 'Review' : course.progress > 0 ? 'Continue' : 'Start'}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Risk Assessment */}
          <Card variant="elevated" className="bg-yellow-50 border-l-4 border-yellow-500">
            <div className="flex">
              <div className="mr-3">
                <Icon name="notifications" color="#FFD700" />
              </div>
              <div>
                <h4 className="font-medium mb-2">Know Your Risk Profile</h4>
                <p className="text-sm text-gray-700 mb-3">
                  Take our risk assessment to get personalized investment recommendations.
                </p>
                <Button variant="outline" size="sm">
                  Take Assessment
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
