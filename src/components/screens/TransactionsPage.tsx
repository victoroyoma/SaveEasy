import React from 'react';
import { Card } from '../design-system/Card';
import { Button } from '../design-system/Button';
import { Icon } from '../design-system/Icon';
import { Badge } from '../design-system/Badge';
import { useAppContext } from '../../context/AppContext';
import { formatCurrency } from '../../data/mockData';

export const TransactionsPage: React.FC = () => {
  const { state } = useAppContext();
  const { transactions, savingsGoals, groups } = state;

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

  const getRelatedName = (transaction: any) => {
    if (transaction.goalId) {
      const goal = savingsGoals.find(g => g.id === transaction.goalId);
      return goal?.name || 'Unknown Goal';
    }
    if (transaction.groupId) {
      const group = groups.find(g => g.id === transaction.groupId);
      return group?.name || 'Unknown Group';
    }
    return null;
  };

  const groupedTransactions = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date).toDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(transaction);
    return acc;
  }, {} as Record<string, typeof transactions>);

  return (
    <div className="p-4 space-y-6">
      <Card className="bg-[#228B22] text-white">
        <div className="flex items-center">
          <div className="bg-white bg-opacity-20 p-3 rounded-lg mr-3">
            <Icon name="bills" color="white" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold">Transaction History</h2>
            <p className="text-sm opacity-90">Track all your financial activities</p>
          </div>
        </div>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3">
        <Card variant="elevated">
          <div className="text-center">
            <h3 className="text-sm text-gray-600 mb-1">This Month</h3>
            <p className="text-lg font-bold text-green-600">
              {formatCurrency(
                transactions
                  .filter(t => new Date(t.date).getMonth() === new Date().getMonth() && t.type === 'deposit')
                  .reduce((sum, t) => sum + t.amount, 0)
              )}
            </p>
            <p className="text-xs text-gray-500">Income</p>
          </div>
        </Card>
        <Card variant="elevated">
          <div className="text-center">
            <h3 className="text-sm text-gray-600 mb-1">This Month</h3>
            <p className="text-lg font-bold text-red-600">
              {formatCurrency(
                transactions
                  .filter(t => new Date(t.date).getMonth() === new Date().getMonth() && 
                    ['withdrawal', 'bill_payment'].includes(t.type))
                  .reduce((sum, t) => sum + t.amount, 0)
              )}
            </p>
            <p className="text-xs text-gray-500">Expenses</p>
          </div>
        </Card>
      </div>

      {/* Filter Options */}
      <Card>
        <h3 className="font-medium mb-3">Filter Transactions</h3>
        <div className="flex flex-wrap gap-2">
          {['All', 'Deposits', 'Withdrawals', 'Bills', 'Groups', 'Goals'].map(filter => (
            <Button key={filter} variant="outline" size="sm">
              {filter}
            </Button>
          ))}
        </div>
      </Card>

      {/* Transactions List */}
      <div className="space-y-4">
        {Object.entries(groupedTransactions)
          .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
          .map(([date, dayTransactions]) => (
            <div key={date}>
              <h3 className="font-medium text-gray-700 mb-2 sticky top-0 bg-gray-50 py-1 px-2 rounded">
                {new Date(date).toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </h3>
              <Card>
                <div className="space-y-3">
                  {dayTransactions.map((transaction, index) => (
                    <div key={transaction.id} className={`flex items-center ${index > 0 ? 'pt-3 border-t border-gray-100' : ''}`}>
                      <div 
                        className="p-2.5 rounded-full mr-3 flex items-center justify-center"
                        style={{ backgroundColor: `${getTransactionColor(transaction.type)}15` }}
                      >
                        <Icon 
                          name={getTransactionIcon(transaction.type) as any} 
                          color={getTransactionColor(transaction.type)} 
                          size={20} 
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">
                          {transaction.description}
                        </h4>
                        <div className="flex items-center space-x-2">
                          <p className="text-xs text-gray-500">
                            {new Date(transaction.date).toLocaleTimeString('en-US', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                          {getRelatedName(transaction) && (
                            <Badge text={getRelatedName(transaction)!} size="xs" variant="secondary" />
                          )}
                          <Badge 
                            text={transaction.status} 
                            size="xs" 
                            variant={
                              transaction.status === 'completed' ? 'success' :
                              transaction.status === 'pending' ? 'secondary' : 'emergency'
                            } 
                          />
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${
                          transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === 'deposit' ? '+' : '-'}
                          {formatCurrency(transaction.amount)}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">
                          {transaction.method.replace('_', ' ')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          ))}
      </div>

      {/* Export Options */}
      <Card variant="elevated">
        <div className="text-center">
          <h3 className="font-medium mb-2">Export Transactions</h3>
          <p className="text-sm text-gray-600 mb-4">
            Download your transaction history for record keeping
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
  );
};
