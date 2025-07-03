import React, { useState } from 'react';
import { Card } from '../design-system/Card';
import { Button } from '../design-system/Button';
import { Icon } from '../design-system/Icon';
import { Badge } from '../design-system/Badge';
import { ProgressBar } from '../design-system/ProgressBar';
import { formatCurrency } from '../../data/mockData';

interface Loan {
  id: string;
  type: 'personal' | 'business' | 'emergency' | 'education';
  amount: number;
  interestRate: number;
  term: number; // in months
  monthlyPayment: number;
  remainingBalance: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'paid_off' | 'defaulted' | 'pending_approval';
  lender: string;
  purpose: string;
  nextPaymentDate: string;
}

export const LoanPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'apply' | 'history'>('active');
  const [showLoanCalculator, setShowLoanCalculator] = useState(false);

  const activeLoans: Loan[] = [
    {
      id: '1',
      type: 'education',
      amount: 150000,
      interestRate: 12,
      term: 24,
      monthlyPayment: 7500,
      remainingBalance: 98000,
      startDate: '2024-01-15',
      endDate: '2026-01-15',
      status: 'active',
      lender: 'SaveEasy Microfinance',
      purpose: 'School fees payment',
      nextPaymentDate: '2025-08-01'
    },
    {
      id: '2',
      type: 'business',
      amount: 80000,
      interestRate: 15,
      term: 12,
      monthlyPayment: 7500,
      remainingBalance: 45000,
      startDate: '2024-06-01',
      endDate: '2025-06-01',
      status: 'active',
      lender: 'Quick Credit Limited',
      purpose: 'Business expansion',
      nextPaymentDate: '2025-08-01'
    }
  ];

  const loanOptions = [
    {
      type: 'personal',
      name: 'Personal Loan',
      description: 'Quick cash for personal needs',
      maxAmount: 200000,
      interestRate: '10-15%',
      maxTerm: 24,
      requirements: ['Steady income', 'Valid ID', 'Bank statement'],
      processingTime: '24 hours'
    },
    {
      type: 'business',
      name: 'Business Loan',
      description: 'Grow your business with flexible terms',
      maxAmount: 500000,
      interestRate: '12-18%',
      maxTerm: 36,
      requirements: ['Business registration', 'Financial records', 'Collateral'],
      processingTime: '3-5 days'
    },
    {
      type: 'emergency',
      name: 'Emergency Loan',
      description: 'Instant loan for urgent situations',
      maxAmount: 50000,
      interestRate: '8-12%',
      maxTerm: 6,
      requirements: ['Valid ID', 'Phone verification'],
      processingTime: '1 hour'
    },
    {
      type: 'education',
      name: 'Education Loan',
      description: 'Invest in your future with education financing',
      maxAmount: 300000,
      interestRate: '8-12%',
      maxTerm: 48,
      requirements: ['Admission letter', 'Guarantor', 'Valid ID'],
      processingTime: '5-7 days'
    }
  ];

  const calculateLoanProgress = (loan: Loan) => {
    const totalPaid = loan.amount - loan.remainingBalance;
    return (totalPaid / loan.amount) * 100;
  };

  const getLoanIcon = (type: string) => {
    switch (type) {
      case 'personal': return 'profile';
      case 'business': return 'budgeting';
      case 'emergency': return 'emergency';
      case 'education': return 'literacy';
      default: return 'bills';
    }
  };

  const totalDebt = activeLoans.reduce((sum, loan) => sum + loan.remainingBalance, 0);
  const monthlyPayments = activeLoans.reduce((sum, loan) => sum + loan.monthlyPayment, 0);

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-[#FF4040] to-[#FF6B6B] text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-white bg-opacity-20 p-3 rounded-lg mr-3">
              <Icon name="bills" color="white" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Loan Management</h2>
              <p className="text-sm opacity-90">Manage your loans responsibly</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card variant="elevated">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600 mb-1">
              {formatCurrency(totalDebt)}
            </div>
            <p className="text-sm text-gray-600">Total Debt</p>
          </div>
        </Card>
        <Card variant="elevated">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">
              {formatCurrency(monthlyPayments)}
            </div>
            <p className="text-sm text-gray-600">Monthly Payments</p>
          </div>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="flex rounded-lg overflow-hidden border border-gray-200">
        {[
          { key: 'active', label: 'Active Loans' },
          { key: 'apply', label: 'Apply for Loan' },
          { key: 'history', label: 'History' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex-1 py-2 text-sm font-medium ${
              activeTab === tab.key
                ? 'bg-[#FF4040] text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'active' && (
        <div className="space-y-6">
          {/* Active Loans */}
          <div>
            <h3 className="font-medium mb-3">Your Active Loans</h3>
            {activeLoans.length > 0 ? (
              <div className="space-y-4">
                {activeLoans.map((loan) => (
                  <Card key={loan.id}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="bg-gray-100 p-2 rounded-lg mr-3">
                          <Icon name={getLoanIcon(loan.type) as any} color="#333333" size={20} />
                        </div>
                        <div>
                          <h4 className="font-medium capitalize">{loan.type} Loan</h4>
                          <p className="text-sm text-gray-600">{loan.purpose}</p>
                          <p className="text-xs text-gray-500">{loan.lender}</p>
                        </div>
                      </div>
                      <Badge 
                        text={loan.status.replace('_', ' ')} 
                        variant="success"
                        size="sm"
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Remaining Balance</span>
                        <span className="font-medium">{formatCurrency(loan.remainingBalance)}</span>
                      </div>
                      
                      <ProgressBar 
                        progress={calculateLoanProgress(loan)}
                        color="#228B22"
                        size="md"
                      />
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Monthly Payment</span>
                          <div className="font-medium">{formatCurrency(loan.monthlyPayment)}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Next Payment</span>
                          <div className="font-medium">{new Date(loan.nextPaymentDate).toLocaleDateString()}</div>
                        </div>
                      </div>

                      <div className="flex space-x-2 pt-2">
                        <Button variant="primary" size="sm" className="flex-1">
                          Make Payment
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="text-center py-6">
                <div className="mb-3 flex justify-center">
                  <Icon name="bills" size={40} color="#87CEEB" />
                </div>
                <h4 className="font-medium mb-1">No Active Loans</h4>
                <p className="text-sm text-gray-600 mb-4">
                  You don't have any active loans at the moment
                </p>
                <Button onClick={() => setActiveTab('apply')}>
                  Apply for Loan
                </Button>
              </Card>
            )}
          </div>

          {/* Payment Reminder */}
          <Card variant="elevated" className="bg-yellow-50 border-l-4 border-yellow-500">
            <div className="flex">
              <div className="mr-3">
                <Icon name="notifications" color="#FFD700" />
              </div>
              <div>
                <h4 className="font-medium mb-2">Payment Reminder</h4>
                <p className="text-sm text-gray-700 mb-3">
                  You have 2 loan payments due in the next 7 days totaling {formatCurrency(monthlyPayments)}.
                </p>
                <Button variant="outline" size="sm">
                  Set Auto-Pay
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'apply' && (
        <div className="space-y-6">
          {/* Loan Calculator */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Loan Calculator</h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowLoanCalculator(!showLoanCalculator)}
              >
                {showLoanCalculator ? 'Hide' : 'Show'} Calculator
              </Button>
            </div>

            {showLoanCalculator && (
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Loan Amount
                    </label>
                    <input 
                      type="number" 
                      placeholder="₦50,000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Interest Rate (%)
                    </label>
                    <input 
                      type="number" 
                      placeholder="12"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Term (months)
                    </label>
                    <input 
                      type="number" 
                      placeholder="24"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Monthly Payment
                    </label>
                    <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100">
                      ₦2,400
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>

          {/* Available Loan Products */}
          <div>
            <h3 className="font-medium mb-3">Available Loan Products</h3>
            <div className="space-y-4">
              {loanOptions.map((option, index) => (
                <Card key={index}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <div className="bg-gray-100 p-3 rounded-lg mr-3">
                        <Icon name={getLoanIcon(option.type) as any} color="#333333" size={24} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{option.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                        
                        <div className="grid grid-cols-2 gap-4 text-xs text-gray-500 mt-3">
                          <div>
                            <span className="font-medium">Max Amount:</span> {formatCurrency(option.maxAmount)}
                          </div>
                          <div>
                            <span className="font-medium">Interest:</span> {option.interestRate}
                          </div>
                          <div>
                            <span className="font-medium">Max Term:</span> {option.maxTerm} months
                          </div>
                          <div>
                            <span className="font-medium">Processing:</span> {option.processingTime}
                          </div>
                        </div>

                        <div className="mt-3">
                          <span className="text-xs font-medium text-gray-700">Requirements:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {option.requirements.map((req, i) => (
                              <Badge key={i} text={req} variant="secondary" size="xs" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button variant="primary" size="sm">
                      Apply Now
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Credit Score */}
          <Card variant="elevated" className="bg-blue-50 border-l-4 border-blue-500">
            <div className="flex">
              <div className="mr-3">
                <Icon name="budgeting" color="#87CEEB" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium mb-2">Your Credit Score</h4>
                <div className="flex items-center mb-2">
                  <div className="text-2xl font-bold text-blue-600 mr-3">750</div>
                  <div>
                    <Badge text="Good" variant="success" size="sm" />
                    <p className="text-xs text-gray-600 mt-1">Excellent loan eligibility</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Improve Score
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="space-y-4">
          <h3 className="font-medium">Loan History</h3>
          
          {/* Previous Loans */}
          <div className="space-y-3">
            {[
              {
                id: '3',
                type: 'personal',
                amount: 30000,
                status: 'paid_off',
                completedDate: '2024-05-15',
                lender: 'SaveEasy Microfinance'
              },
              {
                id: '4',
                type: 'emergency',
                amount: 15000,
                status: 'paid_off',
                completedDate: '2024-03-20',
                lender: 'Quick Credit Limited'
              }
            ].map((loan) => (
              <Card key={loan.id}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-gray-100 p-2 rounded-lg mr-3">
                      <Icon name={getLoanIcon(loan.type) as any} color="#333333" size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium capitalize">{loan.type} Loan</h4>
                      <p className="text-sm text-gray-600">{loan.lender}</p>
                      <p className="text-xs text-gray-500">
                        Completed: {new Date(loan.completedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatCurrency(loan.amount)}</div>
                    <Badge 
                      text="Paid Off" 
                      variant="success"
                      size="sm"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Export History */}
          <Card variant="elevated">
            <div className="text-center">
              <h3 className="font-medium mb-2">Export Loan History</h3>
              <p className="text-sm text-gray-600 mb-4">
                Download your complete loan history for your records
              </p>
              <div className="flex space-x-2">
                <Button variant="outline" fullWidth>
                  Export PDF
                </Button>
                <Button variant="outline" fullWidth>
                  Export CSV
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
