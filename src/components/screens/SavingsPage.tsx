import React, { useState } from 'react';
import { Card } from '../design-system/Card';
import { Button } from '../design-system/Button';
import { ProgressBar } from '../design-system/ProgressBar';
import { Icon } from '../design-system/Icon';
import { Badge } from '../design-system/Badge';
import { useAppContext, useAppActions } from '../../context/AppContext';
import { mockApi } from '../../services/mockApi';

export const SavingsPage: React.FC = () => {
  const { state } = useAppContext();
  const actions = useAppActions();
  const [amount, setAmount] = useState('100');
  const [savingsType, setSavingsType] = useState('regular');
  const [selectedGoal, setSelectedGoal] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawReason, setWithdrawReason] = useState('emergency');
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  
  const presetAmounts = ['50', '100', '200', '500'];

  const handleSaveMoney = async () => {
    if (!amount || parseFloat(amount) <= 0) return;
    
    setIsProcessing(true);
    setSuccessMessage('');
    
    try {
      const goalId = selectedGoal && selectedGoal !== 'new' ? selectedGoal : undefined;
      const result = await mockApi.savings.deposit(parseFloat(amount), goalId);
      
      if (result.success && result.data) {
        actions.addTransaction(result.data);
        
        // Update user's total savings
        actions.updateUser({
          totalSavings: state.user.totalSavings + parseFloat(amount)
        });
        
        // Add success notification
        actions.addNotification({
          id: Date.now().toString(),
          title: 'Savings Successful',
          message: `₦${amount} has been saved successfully!`,
          type: 'success',
          date: new Date().toISOString(),
          read: false
        });
        
        setSuccessMessage(`Successfully saved ₦${amount}!`);
        setAmount('100');
      }
    } catch (error) {
      console.error('Savings error:', error);
      actions.addNotification({
        id: Date.now().toString(),
        title: 'Savings Failed',
        message: 'There was an error processing your savings. Please try again.',
        type: 'error',
        date: new Date().toISOString(),
        read: false
      });
    } finally {
      setIsProcessing(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  // Handle withdrawal with mock API
  const handleWithdrawal = async () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) return;
    
    setIsProcessing(true);
    
    try {
      const result = await mockApi.savings.withdraw(parseFloat(withdrawAmount), withdrawReason);
      
      if (result.success && result.data) {
        actions.addTransaction(result.data);
        
        // Update user's total savings
        actions.updateUser({
          totalSavings: Math.max(0, state.user.totalSavings - parseFloat(withdrawAmount))
        });
        
        // Add notification
        actions.addNotification({
          id: Date.now().toString(),
          title: 'Withdrawal Successful',
          message: `₦${withdrawAmount} withdrawn successfully for ${withdrawReason}`,
          type: 'info',
          date: new Date().toISOString(),
          read: false
        });
        
        setSuccessMessage(`Successfully withdrew ₦${withdrawAmount}!`);
        setWithdrawAmount('');
        setShowWithdrawModal(false);
      }
    } catch (error) {
      console.error('Withdrawal error:', error);
      actions.addNotification({
        id: Date.now().toString(),
        title: 'Withdrawal Failed',
        message: 'Unable to process withdrawal. Please try again.',
        type: 'error',
        date: new Date().toISOString(),
        read: false
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return <div className="p-4 space-y-6">
      <Card className="text-center">
        <div className="mb-4 flex justify-center">
          <Icon name="savings" size={40} color="#228B22" />
        </div>
        <h2 className="text-xl font-bold mb-1">Save Money</h2>
        <p className="text-sm text-gray-600 mb-4">
          Start small, save regularly, achieve your goals
        </p>
        {/* Savings Type Toggle */}
        <div className="flex rounded-lg overflow-hidden border border-gray-200 mb-4">
          <button onClick={() => setSavingsType('regular')} className={`flex-1 py-2 text-sm font-medium ${savingsType === 'regular' ? 'bg-[#228B22] text-white' : 'bg-white text-gray-600'}`}>
            Regular Savings
          </button>
          <button onClick={() => setSavingsType('crypto')} className={`flex-1 py-2 text-sm font-medium ${savingsType === 'crypto' ? 'bg-[#FFD700] text-[#333333]' : 'bg-white text-gray-600'}`}>
            <div className="flex items-center justify-center gap-1">
              <Icon name="crypto" size={16} color={savingsType === 'crypto' ? '#333333' : '#999999'} />
              <span>Crypto</span>
            </div>
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
            How much do you want to save?
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              {savingsType === 'regular' ? '₦' : '$'}
            </span>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md focus:ring-[#228B22] focus:border-[#228B22] text-xl" />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {presetAmounts.map(preset => <button key={preset} onClick={() => setAmount(preset)} className={`flex-1 py-2 px-3 rounded-md border ${amount === preset ? 'border-[#228B22] bg-[#228B22] bg-opacity-10 text-[#228B22]' : 'border-gray-300 text-gray-700'}`}>
              {savingsType === 'regular' ? '₦' : '$'}
              {preset}
            </button>)}
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
              Select a savings goal
            </label>
            <select 
              value={selectedGoal}
              onChange={(e) => setSelectedGoal(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-[#228B22] focus:border-[#228B22]"
            >
              <option value="">Select a goal (optional)</option>
              {state.savingsGoals.map(goal => (
                <option key={goal.id} value={goal.id}>{goal.name}</option>
              ))}
              <option value="new">Create New Goal</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
              How often?
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Daily', 'Weekly', 'Monthly'].map(frequency => <button key={frequency} className="py-2 px-3 rounded-md border border-gray-300 text-gray-700 hover:border-[#228B22] hover:bg-[#228B22] hover:bg-opacity-5">
                  {frequency}
                </button>)}
            </div>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <Icon name="goals" color="#059669" size={16} className="mr-2" />
              <span className="text-sm text-green-800">{successMessage}</span>
            </div>
          </div>
        )}

        <Button 
          className="w-full mt-6" 
          onClick={handleSaveMoney}
          disabled={isProcessing || !amount || parseFloat(amount) <= 0}
        >
          {isProcessing ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Processing...
            </div>
          ) : (
            `Save ₦${amount}`
          )}
        </Button>
        {savingsType === 'crypto' && <p className="text-xs text-gray-500 mt-2">
            Crypto savings are secured using stablecoins (USDT) with 3% annual
            yield
          </p>}
      </Card>
      <div>
        <h3 className="font-medium mb-2">Your Saving Goals</h3>
        <div className="space-y-3">
          <Card variant="highlight">
            <div className="flex items-center mb-2">
              <div className="bg-[#FFD700] bg-opacity-20 p-2 rounded-lg mr-3">
                <Icon name="goals" color="#FFD700" />
              </div>
              <div className="flex-1">
                <div className="flex items-center">
                  <h4 className="font-medium">School Fees</h4>
                  <Badge text="On Track" variant="success" size="xs" className="ml-2" />
                </div>
                <p className="text-xs text-gray-600">Due in 2 months</p>
              </div>
            </div>
            <div className="mb-1">
              <ProgressBar progress={50} variant="savings" showValue={true} currentValue={15000} targetValue={30000} />
            </div>
          </Card>
          <Card variant="highlight">
            <div className="flex items-center mb-2">
              <div className="bg-[#228B22] bg-opacity-20 p-2 rounded-lg mr-3">
                <Icon name="goals" color="#228B22" />
              </div>
              <div className="flex-1">
                <div className="flex items-center">
                  <h4 className="font-medium">Business Growth</h4>
                  <Badge text="New" variant="secondary" size="xs" className="ml-2" />
                </div>
                <p className="text-xs text-gray-600">No deadline</p>
              </div>
            </div>
            <div className="mb-1">
              <ProgressBar progress={20} variant="savings" showValue={true} currentValue={5000} targetValue={25000} />
            </div>
          </Card>
        </div>
      </div>
      <Card variant="elevated" className="bg-[#87CEEB] bg-opacity-10 border-l-4 border-[#87CEEB]">
        <div className="flex">
          <div className="mr-3">
            <Icon name="literacy" color="#87CEEB" />
          </div>
          <div>
            <h4 className="font-medium">Savings Tip</h4>
            <p className="text-sm">
              Save at least 10% of your income before spending on other things.
            </p>
            <Button variant="text" size="sm" className="mt-1 p-0">
              Learn More
            </Button>
          </div>
        </div>
      </Card>

      {/* Withdrawal Section */}
      <Card className="border-l-4 border-orange-500">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium">Need to Withdraw?</h3>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowWithdrawModal(true)}
          >
            Withdraw Funds
          </Button>
        </div>
        <p className="text-sm text-gray-600 mb-2">
          Access your savings when you need them most
        </p>
        <div className="text-xs text-gray-500">
          Available balance: ₦{state.user.totalSavings.toLocaleString()}
        </div>
      </Card>

      {/* Withdrawal Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Withdraw Funds</h3>
              <button 
                onClick={() => setShowWithdrawModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Withdrawal Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₦</span>
                  <input 
                    type="number" 
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter amount"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason for Withdrawal
                </label>
                <select 
                  value={withdrawReason}
                  onChange={(e) => setWithdrawReason(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="emergency">Emergency</option>
                  <option value="education">Education</option>
                  <option value="business">Business Investment</option>
                  <option value="health">Health/Medical</option>
                  <option value="family">Family Support</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="flex gap-3 pt-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowWithdrawModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleWithdrawal}
                  disabled={isProcessing || !withdrawAmount}
                  className="flex-1 bg-orange-500 hover:bg-orange-600"
                >
                  {isProcessing ? 'Processing...' : 'Withdraw'}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>;
};