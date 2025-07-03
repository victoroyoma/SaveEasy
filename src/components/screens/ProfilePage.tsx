import React, { useState } from 'react';
import { Card } from '../design-system/Card';
import { Button } from '../design-system/Button';
import { Icon } from '../design-system/Icon';
import { Badge } from '../design-system/Badge';
import { useAppContext, useAppActions } from '../../context/AppContext';
import { formatCurrency } from '../../data/mockData';

interface ProfilePageProps {
  onNavigate?: (screen: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  const { state } = useAppContext();
  const actions = useAppActions();
  const { user, notifications } = state;
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const unreadNotifications = notifications.filter(n => !n.read).length;
  const completedModules = state.literacyModules.filter(m => m.completed).length;
  const activeChallenges = state.challenges.filter(c => c.isActive).length;

  const handleNavigation = (screen: string) => {
    if (onNavigate) {
      onNavigate(screen);
    }
  };

  const handleSave = () => {
    actions.updateUser(editedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  return (
    <div className="p-4 space-y-6">
      <Card className="bg-gradient-to-r from-[#87CEEB] to-[#A0D8F1] text-white">
        <div className="flex items-center">
          <div className="bg-white bg-opacity-20 p-3 rounded-lg mr-3">
            <Icon name="profile" color="white" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold">Profile Settings</h2>
            <p className="text-sm opacity-90">Manage your account and preferences</p>
          </div>
        </div>
      </Card>

      {/* Profile Overview */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">Personal Information</h3>
          <Button 
            variant={isEditing ? "secondary" : "outline"} 
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-[#228B22] rounded-full flex items-center justify-center mr-4">
              <span className="text-white text-xl font-bold">
                {user.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  value={editedUser.name}
                  onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
                  className="w-full font-medium text-lg border border-gray-300 rounded px-2 py-1"
                />
              ) : (
                <h3 className="font-medium text-lg">{user.name}</h3>
              )}
              <p className="text-sm text-gray-600">Member since {new Date(user.joinDate).getFullYear()}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={editedUser.email}
                  onChange={(e) => setEditedUser({...editedUser, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              ) : (
                <p className="text-gray-800">{user.email}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={editedUser.phone}
                  onChange={(e) => setEditedUser({...editedUser, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              ) : (
                <p className="text-gray-800">{user.phone}</p>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="flex space-x-2 pt-4">
              <Button onClick={handleSave} size="sm">Save Changes</Button>
              <Button variant="outline" onClick={handleCancel} size="sm">Cancel</Button>
            </div>
          )}
        </div>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-3">
        <Card variant="elevated">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(user.totalSavings)}
            </div>
            <p className="text-sm text-gray-600">Total Savings</p>
          </div>
        </Card>
        <Card variant="elevated">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(user.emergencyFund)}
            </div>
            <p className="text-sm text-gray-600">Emergency Fund</p>
          </div>
        </Card>
      </div>

      {/* Achievements */}
      <Card>
        <h3 className="font-medium mb-3">Your Achievements</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="bg-[#FFD700] bg-opacity-20 p-3 rounded-lg mb-2 mx-auto w-fit">
              <Icon name="literacy" color="#FFD700" size={24} />
            </div>
            <p className="font-medium">{completedModules}</p>
            <p className="text-xs text-gray-600">Modules Completed</p>
          </div>
          <div className="text-center">
            <div className="bg-[#228B22] bg-opacity-20 p-3 rounded-lg mb-2 mx-auto w-fit">
              <Icon name="challenges" color="#228B22" size={24} />
            </div>
            <p className="font-medium">{activeChallenges}</p>
            <p className="text-xs text-gray-600">Active Challenges</p>
          </div>
          <div className="text-center">
            <div className="bg-[#87CEEB] bg-opacity-20 p-3 rounded-lg mb-2 mx-auto w-fit">
              <Icon name="community" color="#87CEEB" size={24} />
            </div>
            <p className="font-medium">{state.groups.length}</p>
            <p className="text-xs text-gray-600">Groups Joined</p>
          </div>
        </div>
      </Card>

      {/* Features & Services */}
      <Card>
        <h3 className="font-medium mb-3">Features & Services</h3>
        <div className="space-y-3">
          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-3">
            <button 
              className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-blue-300 transition-all"
              onClick={() => handleNavigation('ai-assistant')}
            >
              <div className="bg-blue-100 p-3 rounded-lg mb-2">
                <Icon name="literacy" color="#2563EB" size={24} />
              </div>
              <span className="font-medium text-sm">AI Assistant</span>
              <span className="text-xs text-gray-600 text-center">Smart financial advice</span>
            </button>
            <button 
              className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-green-300 transition-all"
              onClick={() => handleNavigation('budget')}
            >
              <div className="bg-green-100 p-3 rounded-lg mb-2">
                <Icon name="budgeting" color="#059669" size={24} />
              </div>
              <span className="font-medium text-sm">Budget Manager</span>
              <span className="text-xs text-gray-600 text-center">Track spending</span>
            </button>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-3">
            <button 
              className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-yellow-300 transition-all"
              onClick={() => handleNavigation('investments')}
            >
              <div className="bg-yellow-100 p-3 rounded-lg mb-2">
                <Icon name="crypto" color="#D97706" size={24} />
              </div>
              <span className="font-medium text-sm">Investments</span>
              <span className="text-xs text-gray-600 text-center">Grow your wealth</span>
            </button>
            <button 
              className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-sky-300 transition-all"
              onClick={() => handleNavigation('loans')}
            >
              <div className="bg-sky-100 p-3 rounded-lg mb-2">
                <Icon name="loans" color="#0284C7" size={24} />
              </div>
              <span className="font-medium text-sm">Loans</span>
              <span className="text-xs text-gray-600 text-center">Quick financing</span>
            </button>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-2 gap-3">
            <button 
              className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-purple-300 transition-all"
              onClick={() => handleNavigation('marketplace')}
            >
              <div className="bg-purple-100 p-3 rounded-lg mb-2">
                <Icon name="marketplace" color="#7C3AED" size={24} />
              </div>
              <span className="font-medium text-sm">Marketplace</span>
              <span className="text-xs text-gray-600 text-center">Buy & sell items</span>
            </button>
            <button 
              className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-indigo-300 transition-all"
              onClick={() => handleNavigation('voice')}
            >
              <div className="bg-indigo-100 p-3 rounded-lg mb-2">
                <Icon name="notifications" color="#4F46E5" size={24} />
              </div>
              <span className="font-medium text-sm">Voice Banking</span>
              <span className="text-xs text-gray-600 text-center">Voice commands</span>
            </button>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-2 gap-3">
            <button 
              className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-amber-300 transition-all"
              onClick={() => handleNavigation('crypto')}
            >
              <div className="bg-amber-100 p-3 rounded-lg mb-2">
                <Icon name="crypto" color="#F59E0B" size={24} />
              </div>
              <span className="font-medium text-sm">Crypto Wallet</span>
              <span className="text-xs text-gray-600 text-center">Digital currency</span>
            </button>
            <button 
              className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-teal-300 transition-all"
              onClick={() => handleNavigation('groups')}
            >
              <div className="bg-teal-100 p-3 rounded-lg mb-2">
                <Icon name="community" color="#0D9488" size={24} />
              </div>
              <span className="font-medium text-sm">Group Savings</span>
              <span className="text-xs text-gray-600 text-center">Save together</span>
            </button>
          </div>

          {/* Traditional Features */}
          <div className="border-t border-gray-200 pt-3 mt-4">
            <div className="grid grid-cols-3 gap-3">
              <button 
                className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all"
                onClick={() => handleNavigation('transactions')}
              >
                <Icon name="bills" color="#6B7280" size={20} />
                <span className="text-xs font-medium mt-1">Transactions</span>
              </button>
              <button 
                className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all"
                onClick={() => handleNavigation('literacy')}
              >
                <Icon name="literacy" color="#6B7280" size={20} />
                <span className="text-xs font-medium mt-1">Learn</span>
              </button>
              <button 
                className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all"
                onClick={() => handleNavigation('analytics')}
              >
                <Icon name="budgeting" color="#6B7280" size={20} />
                <span className="text-xs font-medium mt-1">Analytics</span>
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Settings */}
      <Card>
        <h3 className="font-medium mb-3">Settings</h3>
        <div className="space-y-4">
          {/* Notifications */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Icon name="notifications" color="#87CEEB" size={20} className="mr-3" />
              <div>
                <p className="font-medium">Notifications</p>
                <p className="text-sm text-gray-600">Receive alerts and updates</p>
              </div>
            </div>
            <div className="flex items-center">
              {unreadNotifications > 0 && (
                <Badge text={unreadNotifications.toString()} size="xs" variant="emergency" className="mr-2" />
              )}
              <button
                onClick={() => actions.updateUser({ notifications: !user.notifications })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  user.notifications ? 'bg-[#228B22]' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    user.notifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Offline Mode */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Icon name="offline" color="#87CEEB" size={20} className="mr-3" />
              <div>
                <p className="font-medium">Offline Mode</p>
                <p className="text-sm text-gray-600">Save data for offline access</p>
              </div>
            </div>
            <button
              onClick={() => actions.updateUser({ offlineMode: !user.offlineMode })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                user.offlineMode ? 'bg-[#228B22]' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  user.offlineMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* PIN Security */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Icon name="emergency" color="#FF4040" size={20} className="mr-3" />
              <div>
                <p className="font-medium">PIN Security</p>
                <p className="text-sm text-gray-600">Secure your account with PIN</p>
              </div>
            </div>
            <div className="flex items-center">
              {user.hasPin && (
                <Badge text="Active" size="xs" variant="success" className="mr-2" />
              )}
              <Button variant="outline" size="sm">
                {user.hasPin ? 'Change PIN' : 'Set PIN'}
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Support & About */}
      <Card>
        <h3 className="font-medium mb-3">Support & Information</h3>
        <div className="space-y-3">
          <button className="w-full flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
            <Icon name="literacy" color="#87CEEB" size={20} className="mr-3" />
            <span className="flex-1 text-left">Help & FAQ</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          <button className="w-full flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
            <Icon name="community" color="#87CEEB" size={20} className="mr-3" />
            <span className="flex-1 text-left">Contact Support</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          <button className="w-full flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
            <Icon name="bills" color="#87CEEB" size={20} className="mr-3" />
            <span className="flex-1 text-left">Privacy Policy</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </Card>

      {/* App Version */}
      <Card variant="bordered">
        <div className="text-center text-gray-500">
          <p className="text-sm">SaveEasy Africa v2.1.0</p>
          <p className="text-xs">Made with ❤️ for financial inclusion</p>
        </div>
      </Card>
    </div>
  );
};
