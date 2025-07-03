import React, { useState } from 'react';
import { Card } from '../design-system/Card';
import { Button } from '../design-system/Button';
import { Icon } from '../design-system/Icon';
import { Badge } from '../design-system/Badge';
import { ProgressBar } from '../design-system/ProgressBar';
import { formatCurrency } from '../../data/mockData';

interface CryptoCurrency {
  symbol: string;
  name: string;
  amount: number;
  usdValue: number;
  nairaValue: number;
  change24h: number;
  change24hPercentage: number;
  icon: string;
}

interface CryptoTransaction {
  id: string;
  type: 'buy' | 'sell' | 'send' | 'receive' | 'stake' | 'unstake';
  currency: string;
  amount: number;
  usdValue: number;
  nairaValue: number;
  fee: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

export const CryptoPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'trade' | 'staking' | 'learn'>('portfolio');
  const [selectedCrypto, setSelectedCrypto] = useState<string>('BTC');

  const portfolio: CryptoCurrency[] = [
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      amount: 0.0003,
      usdValue: 21,
      nairaValue: 31500,
      change24h: 1.5,
      change24hPercentage: 2.3,
      icon: 'crypto'
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      amount: 0.015,
      usdValue: 28,
      nairaValue: 42000,
      change24h: -0.8,
      change24hPercentage: -1.2,
      icon: 'crypto'
    },
    {
      symbol: 'USDT',
      name: 'Tether USD',
      amount: 50,
      usdValue: 50,
      nairaValue: 75000,
      change24h: 0,
      change24hPercentage: 0.1,
      icon: 'savings'
    },
    {
      symbol: 'BNB',
      name: 'Binance Coin',
      amount: 0.2,
      usdValue: 48,
      nairaValue: 72000,
      change24h: 3.2,
      change24hPercentage: 4.5,
      icon: 'crypto'
    }
  ];

  const availableCryptos = [
    { symbol: 'BTC', name: 'Bitcoin', price: 70000, change: 2.3 },
    { symbol: 'ETH', name: 'Ethereum', price: 1800, change: -1.2 },
    { symbol: 'ADA', name: 'Cardano', price: 0.35, change: 5.8 },
    { symbol: 'SOL', name: 'Solana', price: 145, change: 8.2 },
    { symbol: 'DOT', name: 'Polkadot', price: 5.2, change: -2.1 },
    { symbol: 'MATIC', name: 'Polygon', price: 0.68, change: 3.4 }
  ];

  const transactions: CryptoTransaction[] = [
    {
      id: '1',
      type: 'buy',
      currency: 'BTC',
      amount: 0.0001,
      usdValue: 7,
      nairaValue: 10500,
      fee: 0.5,
      date: '2025-07-01',
      status: 'completed'
    },
    {
      id: '2',
      type: 'stake',
      currency: 'ETH',
      amount: 0.01,
      usdValue: 18,
      nairaValue: 27000,
      fee: 0,
      date: '2025-06-28',
      status: 'completed'
    },
    {
      id: '3',
      type: 'receive',
      currency: 'USDT',
      amount: 25,
      usdValue: 25,
      nairaValue: 37500,
      fee: 0,
      date: '2025-06-25',
      status: 'completed'
    }
  ];

  const stakingOptions = [
    {
      currency: 'ETH',
      apy: 4.5,
      minAmount: 0.01,
      lockPeriod: 30,
      description: 'Ethereum 2.0 staking with flexible withdrawal'
    },
    {
      currency: 'ADA',
      apy: 5.2,
      minAmount: 10,
      lockPeriod: 0,
      description: 'Cardano staking with no lock period'
    },
    {
      currency: 'SOL',
      apy: 6.8,
      minAmount: 1,
      lockPeriod: 7,
      description: 'Solana staking with weekly epochs'
    }
  ];

  const totalPortfolioUSD = portfolio.reduce((sum, crypto) => sum + crypto.usdValue, 0);
  const totalPortfolioNaira = portfolio.reduce((sum, crypto) => sum + crypto.nairaValue, 0);
  const totalChange24h = portfolio.reduce((sum, crypto) => sum + crypto.change24h, 0);

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'buy': return 'savings';
      case 'sell': return 'bills';
      case 'send': return 'community';
      case 'receive': return 'goals';
      case 'stake': return 'budgeting';
      case 'unstake': return 'emergency';
      default: return 'crypto';
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-black bg-opacity-10 p-3 rounded-lg mr-3">
              <Icon name="crypto" color="black" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Crypto Wallet</h2>
              <p className="text-sm opacity-90">Manage your digital assets</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Portfolio Overview */}
      <Card>
        <h3 className="font-medium mb-4">Portfolio Overview</h3>
        <div className="text-center mb-4">
          <div className="text-3xl font-bold text-gray-800 mb-1">
            ${totalPortfolioUSD.toFixed(2)}
          </div>
          <div className="text-lg text-gray-600 mb-2">
            {formatCurrency(totalPortfolioNaira)}
          </div>
          <div className={`text-sm ${totalChange24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {totalChange24h >= 0 ? '+' : ''}${totalChange24h.toFixed(2)} (24h)
          </div>
        </div>

        <div className="space-y-3">
          {portfolio.map((crypto) => (
            <div key={crypto.symbol} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="bg-yellow-100 p-2 rounded-lg mr-3">
                  <Icon name={crypto.icon as any} color="#FFD700" size={20} />
                </div>
                <div>
                  <h4 className="font-medium">{crypto.symbol}</h4>
                  <p className="text-sm text-gray-600">{crypto.name}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">${crypto.usdValue.toFixed(2)}</div>
                <div className="text-sm text-gray-600">{crypto.amount} {crypto.symbol}</div>
                <div className={`text-xs ${crypto.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {crypto.change24h >= 0 ? '+' : ''}{crypto.change24hPercentage}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Tab Navigation */}
      <div className="flex rounded-lg overflow-hidden border border-gray-200">
        {[
          { key: 'portfolio', label: 'Portfolio' },
          { key: 'trade', label: 'Trade' },
          { key: 'staking', label: 'Staking' },
          { key: 'learn', label: 'Learn' }
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
          {/* Recent Transactions */}
          <div>
            <h3 className="font-medium mb-3">Recent Transactions</h3>
            <div className="space-y-3">
              {transactions.map((tx) => (
                <Card key={tx.id}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-gray-100 p-2 rounded-lg mr-3">
                        <Icon name={getTransactionIcon(tx.type) as any} color="#333333" size={20} />
                      </div>
                      <div>
                        <h4 className="font-medium capitalize">{tx.type} {tx.currency}</h4>
                        <p className="text-sm text-gray-600">
                          {new Date(tx.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${tx.usdValue.toFixed(2)}</div>
                      <div className="text-sm text-gray-600">{tx.amount} {tx.currency}</div>
                      <Badge 
                        text={tx.status} 
                        variant={tx.status === 'completed' ? 'success' : 'secondary'}
                        size="xs"
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Button variant="primary" className="h-12">
              <Icon name="savings" size={20} className="mr-2" />
              Buy Crypto
            </Button>
            <Button variant="outline" className="h-12">
              <Icon name="community" size={20} className="mr-2" />
              Send Crypto
            </Button>
          </div>
        </div>
      )}

      {activeTab === 'trade' && (
        <div className="space-y-6">
          {/* Trading Interface */}
          <Card>
            <h3 className="font-medium mb-4">Buy/Sell Crypto</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Cryptocurrency
                </label>
                <select 
                  value={selectedCrypto}
                  onChange={(e) => setSelectedCrypto(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#FFD700] focus:border-[#FFD700]"
                >
                  {availableCryptos.map((crypto) => (
                    <option key={crypto.symbol} value={crypto.symbol}>
                      {crypto.symbol} - {crypto.name} (${crypto.price})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount (USD)
                  </label>
                  <input 
                    type="number" 
                    placeholder="50"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#FFD700] focus:border-[#FFD700]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estimated {selectedCrypto}
                  </label>
                  <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100">
                    0.0007 {selectedCrypto}
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button className="flex-1">
                  Buy {selectedCrypto}
                </Button>
                <Button variant="outline" className="flex-1">
                  Sell {selectedCrypto}
                </Button>
              </div>
            </div>
          </Card>

          {/* Market Prices */}
          <div>
            <h3 className="font-medium mb-3">Market Prices</h3>
            <div className="space-y-2">
              {availableCryptos.map((crypto) => (
                <Card key={crypto.symbol}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-yellow-100 p-2 rounded-lg mr-3">
                        <Icon name="crypto" color="#FFD700" size={20} />
                      </div>
                      <div>
                        <h4 className="font-medium">{crypto.symbol}</h4>
                        <p className="text-sm text-gray-600">{crypto.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${crypto.price}</div>
                      <div className={`text-sm ${crypto.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {crypto.change >= 0 ? '+' : ''}{crypto.change}%
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'staking' && (
        <div className="space-y-6">
          {/* Current Stakes */}
          <Card>
            <h3 className="font-medium mb-4">Your Staked Assets</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-lg mr-3">
                    <Icon name="crypto" color="#228B22" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium">ETH Staking</h4>
                    <p className="text-sm text-gray-600">0.01 ETH • 4.5% APY</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-green-600">+$0.12</div>
                  <div className="text-sm text-gray-600">Rewards earned</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Available Staking Options */}
          <div>
            <h3 className="font-medium mb-3">Available Staking</h3>
            <div className="space-y-4">
              {stakingOptions.map((option, index) => (
                <Card key={index}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-3 rounded-lg mr-3">
                        <Icon name="crypto" color="#87CEEB" size={24} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{option.currency} Staking</h4>
                        <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 mt-2">
                          <span>APY: {option.apy}%</span>
                          <span>Min: {option.minAmount} {option.currency}</span>
                          <span>Lock: {option.lockPeriod} days</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Stake Now
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Staking Rewards Calculator */}
          <Card variant="elevated" className="bg-blue-50 border-l-4 border-blue-500">
            <div className="flex">
              <div className="mr-3">
                <Icon name="budgeting" color="#87CEEB" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium mb-2">Staking Calculator</h4>
                <p className="text-sm text-gray-700 mb-3">
                  Calculate your potential staking rewards
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">If you stake 1 ETH:</span>
                    <div className="font-medium">Monthly: $3.38</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Annual rewards:</span>
                    <div className="font-medium">$40.50</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'learn' && (
        <div className="space-y-6">
          {/* Crypto Education */}
          <div>
            <h3 className="font-medium mb-3">Crypto Education</h3>
            <div className="space-y-3">
              {[
                {
                  title: 'What is Bitcoin?',
                  description: 'Learn the basics of the world\'s first cryptocurrency',
                  duration: '5 min',
                  progress: 100,
                  level: 'Beginner'
                },
                {
                  title: 'Understanding Blockchain',
                  description: 'How blockchain technology works',
                  duration: '8 min',
                  progress: 60,
                  level: 'Beginner'
                },
                {
                  title: 'DeFi Basics',
                  description: 'Introduction to decentralized finance',
                  duration: '12 min',
                  progress: 0,
                  level: 'Intermediate'
                },
                {
                  title: 'Crypto Security',
                  description: 'Keep your crypto assets safe',
                  duration: '10 min',
                  progress: 0,
                  level: 'Important'
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

          {/* Security Tips */}
          <Card variant="elevated" className="bg-red-50 border-l-4 border-red-500">
            <div className="flex">
              <div className="mr-3">
                <Icon name="emergency" color="#FF4040" />
              </div>
              <div>
                <h4 className="font-medium mb-2">Security Best Practices</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Never share your private keys or seed phrases</li>
                  <li>• Always verify wallet addresses before sending</li>
                  <li>• Use hardware wallets for large amounts</li>
                  <li>• Enable 2FA on all crypto accounts</li>
                  <li>• Be wary of phishing websites and emails</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
