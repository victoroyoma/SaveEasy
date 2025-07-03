import React, { useState } from 'react';
import { Card } from '../design-system/Card';
import { Button } from '../design-system/Button';
import { Icon } from '../design-system/Icon';
import { Badge } from '../design-system/Badge';
import { useAppContext, useAppActions } from '../../context/AppContext';
import { formatCurrency, networkProviders, electricityProviders, cableTvProviders } from '../../data/mockData';
import { mockApi } from '../../services/mockApi';

export const BillPaymentsPage: React.FC = () => {
  const { state } = useAppContext();
  const actions = useAppActions();
  const [selectedBillType, setSelectedBillType] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    accountNumber: '',
    amount: '',
    provider: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [] = useState(state.billPayments);

  const billTypes = [
    { name: 'Airtime', icon: 'bills', color: '#228B22' },
    { name: 'Data', icon: 'bills', color: '#87CEEB' },
    { name: 'Electricity', icon: 'bills', color: '#FFD700' },
    { name: 'Cable TV', icon: 'bills', color: '#FF4040' },
    { name: 'Water', icon: 'bills', color: '#87CEEB' },
    { name: 'Internet', icon: 'bills', color: '#228B22' }
  ];

  const getProviders = () => {
    switch (selectedBillType?.toLowerCase()) {
      case 'airtime':
      case 'data':
        return networkProviders;
      case 'electricity':
        return electricityProviders;
      case 'cable tv':
        return cableTvProviders;
      case 'internet':
        return ['Spectranet', 'Smile', 'Swift', 'Airtel 4G'];
      case 'water':
        return ['Lagos Water', 'Kaduna Water', 'Kano Water'];
      default:
        return [];
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    return formData.accountNumber && formData.amount && formData.provider && 
           parseFloat(formData.amount) > 0;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);
    
    try {
      // Use mock API for bill payment
      const result = await mockApi.bills.payBill({
        type: selectedBillType?.toLowerCase().replace(' ', '_') as any,
        provider: formData.provider,
        accountNumber: formData.accountNumber,
        amount: parseFloat(formData.amount)
      });

      if (result.success && result.data) {
        actions.addBillPayment(result.data);
        
        // Add transaction record
        actions.addTransaction({
          id: (Date.now() + 1).toString(),
          type: 'bill_payment',
          amount: parseFloat(formData.amount),
          description: `${selectedBillType} - ${formData.provider}`,
          date: new Date().toISOString(),
          category: 'utilities',
          status: 'completed',
          method: 'mobile_money'
        });

        // Add success notification
        actions.addNotification({
          id: Date.now().toString(),
          title: 'Payment Successful',
          message: result.message,
          type: 'success',
          date: new Date().toISOString(),
          read: false
        });

        setFormData({ accountNumber: '', amount: '', provider: '' });
        setSelectedBillType(null);
      } else {
        // Handle payment failure
        actions.addNotification({
          id: Date.now().toString(),
          title: 'Payment Failed',
          message: result.message || 'Payment could not be processed',
          type: 'error',
          date: new Date().toISOString(),
          read: false
        });
      }
    } catch (error) {
      console.error('Payment error:', error);
      actions.addNotification({
        id: Date.now().toString(),
        title: 'Payment Error',
        message: 'Network error. Please try again.',
        type: 'error',
        date: new Date().toISOString(),
        read: false
      });
    } finally {
      setIsProcessing(false);
    }
  };
  return <div className="p-4 space-y-6">
      <Card className="bg-[#87CEEB] text-[#333333]">
        <div className="flex items-center">
          <div className="bg-white bg-opacity-20 p-3 rounded-lg mr-3">
            <Icon name="bills" color="#333333" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold">Pay Bills</h2>
            <p className="text-sm opacity-90">Quick and convenient payments</p>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <Card>
        <h3 className="font-medium mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="flex items-center justify-center py-4">
            <Icon name="bills" size={20} className="mr-2" />
            <span>Pay Again</span>
          </Button>
          <Button variant="outline" className="flex items-center justify-center py-4">
            <Icon name="notifications" size={20} className="mr-2" />
            <span>Set Reminders</span>
          </Button>
        </div>
      </Card>
      
      <div>
        <h3 className="font-medium mb-2">Select Bill Type</h3>
        <div className="grid grid-cols-2 gap-3">
          {billTypes.map(bill => <Card 
              key={bill.name} 
              className={`flex flex-col items-center py-4 cursor-pointer transition-all hover:shadow-md ${
                selectedBillType === bill.name ? 'border-2 border-[#87CEEB] bg-blue-50' : ''
              }`} 
              onClick={() => setSelectedBillType(bill.name)}
            >
              <div 
                className="p-3 rounded-full mb-2"
                style={{ backgroundColor: `${bill.color}20` }}
              >
                <Icon name={bill.icon as any} color={bill.color} />
              </div>
              <span className="font-medium">{bill.name}</span>
            </Card>)}
        </div>
      </div>

      {selectedBillType && <Card>
          <h3 className="font-medium mb-3">Pay {selectedBillType}</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {selectedBillType === 'Airtime' || selectedBillType === 'Data' ? 'Phone Number' : 
                 selectedBillType === 'Electricity' ? 'Meter Number' :
                 selectedBillType === 'Cable TV' ? 'Decoder Number' :
                 selectedBillType === 'Water' ? 'Account Number' : 'Account Number'}
              </label>
              <input 
                type="text" 
                placeholder={`Enter ${selectedBillType === 'Airtime' || selectedBillType === 'Data' ? 'phone number' : 'account number'}`}
                value={formData.accountNumber}
                onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#87CEEB] focus:border-[#87CEEB]" 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  ₦
                </span>
                <input 
                  type="number" 
                  placeholder="Enter amount" 
                  value={formData.amount}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-[#87CEEB] focus:border-[#87CEEB]" 
                />
              </div>
              {selectedBillType === 'Airtime' && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {[100, 200, 500, 1000].map(amount => (
                    <button
                      key={amount}
                      onClick={() => handleInputChange('amount', amount.toString())}
                      className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:border-[#87CEEB] hover:bg-blue-50"
                    >
                      ₦{amount}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Provider
              </label>
              <select 
                value={formData.provider}
                onChange={(e) => handleInputChange('provider', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#87CEEB] focus:border-[#87CEEB]"
              >
                <option value="">Select provider</option>
                {getProviders().map(provider => (
                  <option key={provider} value={provider}>{provider}</option>
                ))}
              </select>
            </div>

            {/* Transaction Fee Notice */}
            {parseFloat(formData.amount) > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex items-center">
                  <Icon name="notifications" color="#FFD700" size={16} className="mr-2" />
                  <span className="text-sm text-yellow-800">
                    Transaction fee: ₦10 will be added to your payment
                  </span>
                </div>
              </div>
            )}
            
            <Button 
              className="w-full" 
              disabled={!validateForm() || isProcessing}
              onClick={handlePayment}
              loading={isProcessing}
            >
              {isProcessing ? 'Processing...' : `Pay ${formData.amount ? formatCurrency(parseFloat(formData.amount) + 10) : 'Bill'}`}
            </Button>
          </div>
        </Card>}
      
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">Recent Payments</h3>
          <Button variant="text" size="sm">View All</Button>
        </div>
        <Card>
          <div className="space-y-3">
            {state.billPayments.slice(0, 3).map((payment, index) => (
              <div key={payment.id} className={`flex items-center ${index > 0 ? 'pt-3 border-t border-gray-100' : ''}`}>
                <div className="bg-gray-100 p-2 rounded-lg mr-3">
                  <Icon name="bills" color="#333333" size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium capitalize">
                    {payment.type.replace('_', ' ')} - {payment.provider}
                  </h4>
                  <p className="text-xs text-gray-600">
                    {payment.accountNumber} • {new Date(payment.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatCurrency(payment.amount)}</p>
                  <Badge 
                    text={payment.status} 
                    size="xs" 
                    variant={payment.status === 'completed' ? 'success' : 'secondary'} 
                  />
                </div>
              </div>
            ))}
            {state.billPayments.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                <Icon name="bills" size={32} color="#ccc" className="mx-auto mb-2" />
                <p className="text-sm">No recent payments</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Bill Reminders */}
      <Card variant="elevated" className="bg-blue-50 border-l-4 border-blue-500">
        <div className="flex">
          <div className="mr-3">
            <Icon name="notifications" color="#87CEEB" />
          </div>
          <div>
            <h4 className="font-medium mb-2">Never Miss a Payment</h4>
            <p className="text-sm text-gray-700 mb-3">
              Set up automatic reminders for your monthly bills and never pay late fees again.
            </p>
            <Button variant="secondary" size="sm">
              Set Up Reminders
            </Button>
          </div>
        </div>
      </Card>
    </div>;
};