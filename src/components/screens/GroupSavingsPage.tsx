import React, { useState } from 'react';
import { Card } from '../design-system/Card';
import { Button } from '../design-system/Button';
import { Badge } from '../design-system/Badge';
import { Icon } from '../design-system/Icon';
import { useAppActions } from '../../context/AppContext';
import { mockApi } from '../../services/mockApi';

export const GroupSavingsPage: React.FC = () => {
  const [isJoining, setIsJoining] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const actions = useAppActions();

  // Handle joining a savings group
  const handleJoinGroup = async (group: any) => {
    setIsJoining(true);
    
    try {
      const result = await mockApi.groups.joinGroup(group.id || 'group-' + Date.now());
      
      if (result.success) {
        // Add success notification
        actions.addNotification({
          id: Date.now().toString(),
          title: 'Group Joined Successfully!',
          message: `Welcome to ${group.name}! Your first contribution is due ${group.frequency.toLowerCase()}.`,
          type: 'success',
          date: new Date().toISOString(),
          read: false
        });
        
        // Simulate adding a transaction for joining fee (if any)
        const joinTransaction = {
          id: Date.now().toString(),
          type: 'group_contribution' as const,
          amount: 100, // Small joining fee
          description: `Joined ${group.name} savings group`,
          date: new Date().toISOString(),
          category: 'group_savings' as const,
          status: 'completed' as const,
          method: 'mobile_money' as const
        };
        
        actions.addTransaction(joinTransaction);
        setShowJoinModal(false);
        setSelectedGroup(null);
      }
    } catch (error) {
      console.error('Failed to join group:', error);
      actions.addNotification({
        id: Date.now().toString(),
        title: 'Failed to Join Group',
        message: 'Unable to join the group. Please try again later.',
        type: 'error',
        date: new Date().toISOString(),
        read: false
      });
    } finally {
      setIsJoining(false);
    }
  };
  const groups = [{
    name: 'Market Traders',
    members: 12,
    contribution: '₦1,000',
    frequency: 'Weekly',
    nextDate: 'Tomorrow',
    status: 'Up to date',
    active: true
  }, {
    name: 'Family Support',
    members: 5,
    contribution: '₦2,000',
    frequency: 'Monthly',
    nextDate: '15 days',
    status: 'Pending',
    active: true
  }];
  const popularGroups = [{
    id: 'business-owners',
    name: 'Small Business Owners',
    members: 35,
    contribution: '₦500 - ₦2,000',
    frequency: 'Weekly',
    description: 'Support your business growth with fellow entrepreneurs'
  }, {
    id: 'school-fees',
    name: 'School Fees Savings',
    members: 24,
    contribution: '₦1,000 - ₦5,000',
    frequency: 'Monthly',
    description: 'Plan ahead for your children\'s education expenses'
  }, {
    id: 'emergency-fund',
    name: 'Emergency Fund Circle',
    members: 18,
    contribution: '₦300 - ₦1,500',
    frequency: 'Weekly',
    description: 'Build a safety net together with your community'
  }];
  return <div className="p-4 space-y-6">
      <Card className="bg-[#228B22] text-white">
        <div className="flex items-center">
          <div className="bg-white bg-opacity-20 p-3 rounded-lg mr-3">
            <Icon name="community" color="white" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold">Group Savings</h2>
            <p className="text-sm opacity-90">Save together, achieve more</p>
          </div>
        </div>
      </Card>
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">Your Groups</h3>
          <Button variant="secondary" size="sm">
            Create Group
          </Button>
        </div>
        {groups.length > 0 ? <div className="space-y-3">
            {groups.map((group, index) => <Card key={index}>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <h4 className="font-medium">{group.name}</h4>
                      <Badge text={group.status === 'Up to date' ? 'Active' : 'Pending'} variant={group.status === 'Up to date' ? 'success' : 'secondary'} size="sm" className="ml-2" />
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {group.members} members • {group.contribution}{' '}
                      {group.frequency}
                    </p>
                  </div>
                </div>
                <div className="border-t border-gray-200 mt-3 pt-3">
                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      <span className="text-gray-600">Next contribution:</span>{' '}
                      <span className="font-medium">{group.nextDate}</span>
                    </div>
                    <Button variant="primary" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>)}
          </div> : <Card className="text-center py-6">
            <div className="mb-3 flex justify-center">
              <Icon name="community" size={40} color="#87CEEB" />
            </div>
            <h4 className="font-medium mb-1">No groups yet</h4>
            <p className="text-sm text-gray-600 mb-4">
              Join a group or create your own to start saving together
            </p>
            <Button>Create or Join Group</Button>
          </Card>}
      </div>
      <div>
        <h3 className="font-medium mb-2">Popular Groups</h3>
        <div className="space-y-3">
          {popularGroups.map((group, index) => <Card key={index}>
              <div>
                <h4 className="font-medium">{group.name}</h4>
                <p className="text-sm text-gray-600 mt-1">
                  {group.members} members • {group.contribution}{' '}
                  {group.frequency}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {group.description}
                </p>
              </div>
              <div className="mt-3">
                <Button 
                  variant="secondary" 
                  size="sm" 
                  fullWidth
                  onClick={() => {
                    setSelectedGroup(group);
                    setShowJoinModal(true);
                  }}
                  disabled={isJoining}
                >
                  {isJoining ? 'Joining...' : 'Request to Join'}
                </Button>
              </div>
            </Card>)}
        </div>
      </div>
      <Card variant="elevated" className="bg-[#FFD700] bg-opacity-10 border-l-4 border-[#FFD700]">
        <div className="flex">
          <div className="mr-3">
            <Icon name="literacy" color="#FFD700" />
          </div>
          <div>
            <h4 className="font-medium">About Group Savings</h4>
            <p className="text-sm">
              Group savings (Ajo/Esusu) helps members save regularly and access
              funds when needed.
            </p>
          </div>
        </div>
      </Card>
      {/* Join Group Modal */}
      {showJoinModal && selectedGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Join Savings Group</h3>
              <button 
                onClick={() => setShowJoinModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-green-50 p-3 rounded-lg">
                <h4 className="font-medium text-green-800">{selectedGroup.name}</h4>
                <p className="text-sm text-green-600 mt-1">{selectedGroup.description}</p>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Members:</span>
                  <span className="font-medium">{selectedGroup.members}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Contribution:</span>
                  <span className="font-medium">{selectedGroup.contribution}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Frequency:</span>
                  <span className="font-medium">{selectedGroup.frequency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Joining Fee:</span>
                  <span className="font-medium">₦100</span>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-3 rounded-lg">
                <p className="text-xs text-yellow-800">
                  <strong>Note:</strong> By joining this group, you agree to make regular contributions 
                  and follow the group's savings rules. Late contributions may result in penalties.
                </p>
              </div>
              
              <div className="flex gap-3 pt-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowJoinModal(false)}
                  className="flex-1"
                  disabled={isJoining}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={() => handleJoinGroup(selectedGroup)}
                  disabled={isJoining}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  {isJoining ? 'Joining...' : 'Join Group'}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>;
};