import React, { useState } from 'react';
import { Card } from '../design-system/Card';
import { Button } from '../design-system/Button';
import { Icon } from '../design-system/Icon';
import { Badge } from '../design-system/Badge';
import { useAppContext, useAppActions } from '../../context/AppContext';

export const NotificationsPage: React.FC = () => {
  const { state } = useAppContext();
  const actions = useAppActions();
  const { notifications } = state;

  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.read)
    : notifications;

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    actions.markNotificationRead(id);
  };

  const handleMarkAllAsRead = () => {
    notifications.filter(n => !n.read).forEach(n => {
      actions.markNotificationRead(n.id);
    });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return 'goals';
      case 'warning': return 'emergency';
      case 'error': return 'emergency';
      default: return 'notifications';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return '#228B22';
      case 'warning': return '#FFD700';
      case 'error': return '#FF4040';
      default: return '#87CEEB';
    }
  };

  return (
    <div className="p-4 space-y-6">
      <Card className="bg-[#87CEEB] text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-white bg-opacity-20 p-3 rounded-lg mr-3">
              <Icon name="notifications" color="white" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Notifications</h2>
              <p className="text-sm opacity-90">Stay updated with your activities</p>
            </div>
          </div>
          {unreadCount > 0 && (
            <Badge text={unreadCount.toString()} variant="emergency" />
          )}
        </div>
      </Card>

      {/* Filter and Actions */}
      <Card>
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <Button
              variant={filter === 'all' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              All ({notifications.length})
            </Button>
            <Button
              variant={filter === 'unread' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter('unread')}
            >
              Unread ({unreadCount})
            </Button>
          </div>
          {unreadCount > 0 && (
            <Button variant="text" size="sm" onClick={handleMarkAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
      </Card>

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <Card className="text-center py-8">
          <div className="mb-4 flex justify-center">
            <Icon name="notifications" size={48} color="#87CEEB" />
          </div>
          <h3 className="font-medium mb-2">No notifications</h3>
          <p className="text-sm text-gray-600">
            {filter === 'unread' 
              ? "You're all caught up! No unread notifications." 
              : "You don't have any notifications yet."}
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredNotifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`cursor-pointer transition-all ${
                !notification.read ? 'border-l-4 border-l-[#87CEEB] bg-blue-50' : ''
              }`}
              onClick={() => handleMarkAsRead(notification.id)}
            >
              <div className="flex items-start">
                <div 
                  className="p-2.5 rounded-full mr-3 flex items-center justify-center"
                  style={{ backgroundColor: `${getNotificationColor(notification.type)}15` }}
                >
                  <Icon 
                    name={getNotificationIcon(notification.type) as any} 
                    color={getNotificationColor(notification.type)} 
                    size={20} 
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className={`font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                        {notification.title}
                      </h4>
                      <p className={`text-sm mt-1 ${!notification.read ? 'text-gray-700' : 'text-gray-600'}`}>
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(notification.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {!notification.read && (
                        <div className="w-2 h-2 bg-[#87CEEB] rounded-full"></div>
                      )}
                      <Badge 
                        text={notification.type} 
                        size="xs" 
                        variant={
                          notification.type === 'success' ? 'success' :
                          notification.type === 'warning' ? 'secondary' :
                          notification.type === 'error' ? 'emergency' : 'primary'
                        }
                      />
                    </div>
                  </div>
                  {notification.actionUrl && (
                    <div className="mt-3">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Notification Settings */}
      <Card>
        <h3 className="font-medium mb-3">Notification Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Goal Achievements</p>
              <p className="text-sm text-gray-600">Get notified when you reach savings milestones</p>
            </div>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-[#228B22] transition-colors">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Group Reminders</p>
              <p className="text-sm text-gray-600">Reminders for group contributions</p>
            </div>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-[#228B22] transition-colors">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Bill Reminders</p>
              <p className="text-sm text-gray-600">Reminders for upcoming bill payments</p>
            </div>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Learning Updates</p>
              <p className="text-sm text-gray-600">New courses and educational content</p>
            </div>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-[#228B22] transition-colors">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Security Alerts</p>
              <p className="text-sm text-gray-600">Important security notifications</p>
            </div>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-[#228B22] transition-colors">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
            </button>
          </div>
        </div>
      </Card>

      {/* Push Notification Setup */}
      <Card variant="elevated" className="bg-yellow-50 border-l-4 border-yellow-500">
        <div className="flex">
          <div className="mr-3">
            <Icon name="notifications" color="#FFD700" />
          </div>
          <div>
            <h4 className="font-medium mb-2">Enable Push Notifications</h4>
            <p className="text-sm text-gray-700 mb-3">
              Get real-time alerts even when the app is closed. Stay on top of your financial goals!
            </p>
            <Button variant="secondary" size="sm">
              Enable Notifications
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
