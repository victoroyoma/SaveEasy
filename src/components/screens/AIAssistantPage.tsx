import React, { useState, useEffect, useRef } from 'react';
import { Card } from '../design-system/Card';
import { Button } from '../design-system/Button';
import { Icon } from '../design-system/Icon';
import { Badge } from '../design-system/Badge';
import { LoadingSpinner } from '../design-system/LoadingSpinner';

interface AIConversation {
  id: string;
  userMessage: string;
  aiResponse: string;
  timestamp: string;
  category: 'savings' | 'investments' | 'budgeting' | 'general';
}

export const AIAssistantPage: React.FC = () => {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversations, setConversations] = useState<AIConversation[]>([
    {
      id: '1',
      userMessage: 'How can I save more money this month?',
      aiResponse: 'Based on your spending patterns, I notice you spend ₦15,000 monthly on entertainment. Consider reducing this by 30% (₦4,500) and redirecting it to your emergency fund. Also, try the 50/30/20 rule: 50% needs, 30% wants, 20% savings.',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      category: 'savings'
    },
    {
      id: '2',
      userMessage: 'When should I invest my savings?',
      aiResponse: 'Great question! Since you have ₦5,000 in emergency funds, I recommend building it to ₦15,000 first (3-month expenses). After that, consider starting with low-risk investments like Treasury Bills or fixed deposits. Your savings rate of 25% is excellent!',
      timestamp: new Date(Date.now() - 43200000).toISOString(),
      category: 'investments'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversations]);

  const quickActions = [
    { text: 'Help me budget better', icon: 'budgeting', color: '#87CEEB' },
    { text: 'Investment advice', icon: 'crypto', color: '#FFD700' },
    { text: 'Savings strategies', icon: 'savings', color: '#228B22' },
    { text: 'Debt management', icon: 'bills', color: '#FF4040' }
  ];

  const insights = [
    {
      title: 'Spending Alert',
      description: 'You\'ve spent 85% of your entertainment budget this month',
      impact: 'medium' as const,
      actionable: true
    },
    {
      title: 'Savings Opportunity',
      description: 'Your salary increased but savings rate stayed the same',
      impact: 'high' as const,
      actionable: true
    },
    {
      title: 'Goal Progress',
      description: 'You\'re on track to reach your School Fees goal 2 weeks early!',
      impact: 'low' as const,
      actionable: false
    }
  ];

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setIsTyping(true);

    // Add user message
    const newConversation: AIConversation = {
      id: Date.now().toString(),
      userMessage,
      aiResponse: '',
      timestamp: new Date().toISOString(),
      category: 'general'
    };

    setConversations(prev => [...prev, newConversation]);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        'Based on your financial data, I recommend focusing on building your emergency fund first. You currently have ₦5,000, but aim for ₦15,000 to cover 3 months of expenses.',
        'I notice you\'re doing great with your savings goals! Your consistency with the School Fees goal shows discipline. Consider setting up automatic transfers to make it even easier.',
        'Looking at your spending patterns, you could save an additional ₦3,000 monthly by optimizing your bill payments and reducing unnecessary subscriptions.',
        'Your financial health score is 7.5/10. To improve it, focus on diversifying your savings and consider starting a small investment portfolio.',
        'Great question! I can help you create a personalized budget based on your income and spending patterns. Let\'s start with the 50/30/20 rule.'
      ];

      const aiResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setConversations(prev => 
        prev.map(conv => 
          conv.id === newConversation.id 
            ? { ...conv, aiResponse }
            : conv
        )
      );
      setIsTyping(false);
    }, 2000);
  };

  const handleQuickAction = (actionText: string) => {
    setInput(actionText);
  };

  return (
    <div className="p-4 space-y-6 pb-24">
      {/* Header */}
      <Card className="bg-gradient-to-r from-[#87CEEB] to-[#A0D8F1] text-white">
        <div className="flex items-center">
          <div className="bg-white bg-opacity-20 p-3 rounded-lg mr-3">
            <Icon name="literacy" color="white" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold">AI Financial Assistant</h2>
            <p className="text-sm opacity-90">Your personal finance advisor</p>
          </div>
        </div>
      </Card>

      {/* AI Insights */}
      <div>
        <h3 className="font-medium mb-3">Smart Insights</h3>
        <div className="space-y-3">
          {insights.map((insight, index) => (
            <Card key={index} className={`border-l-4 ${
              insight.impact === 'high' ? 'border-red-500 bg-red-50' :
              insight.impact === 'medium' ? 'border-yellow-500 bg-yellow-50' :
              'border-green-500 bg-green-50'
            }`}>
              <div className="flex items-start">
                <div className="mr-3">
                  <Icon 
                    name="notifications" 
                    color={
                      insight.impact === 'high' ? '#FF4040' :
                      insight.impact === 'medium' ? '#FFD700' :
                      '#228B22'
                    }
                    size={20}
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{insight.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                  {insight.actionable && (
                    <Button variant="outline" size="sm" className="mt-2">
                      Take Action
                    </Button>
                  )}
                </div>
                <Badge 
                  text={insight.impact.charAt(0).toUpperCase() + insight.impact.slice(1)} 
                  size="sm"
                  variant={insight.impact === 'high' ? 'secondary' : 'success'}
                />
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Conversation */}
      <div>
        <h3 className="font-medium mb-3">Chat with Assistant</h3>
        <Card className="h-80 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {conversations.map((conv) => (
              <div key={conv.id} className="space-y-3">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="bg-[#228B22] text-white rounded-lg px-3 py-2 max-w-[80%]">
                    <p className="text-sm">{conv.userMessage}</p>
                  </div>
                </div>
                
                {/* AI Response */}
                {conv.aiResponse && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg px-3 py-2 max-w-[80%]">
                      <div className="flex items-center mb-1">
                        <Icon name="literacy" color="#87CEEB" size={16} className="mr-1" />
                        <span className="text-xs font-medium text-gray-600">AI Assistant</span>
                      </div>
                      <p className="text-sm text-gray-800">{conv.aiResponse}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg px-3 py-2">
                  <div className="flex items-center">
                    <LoadingSpinner size="sm" />
                    <span className="text-sm text-gray-600 ml-2">AI is typing...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Area */}
          <div className="border-t p-3">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me about your finances..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-[#87CEEB] focus:border-[#87CEEB] text-sm"
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!input.trim() || isTyping}
                size="sm"
              >
                <Icon name="bills" size={16} />
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="font-medium mb-3">Quick Questions</h3>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="flex items-center justify-start p-3 h-auto"
              onClick={() => handleQuickAction(action.text)}
            >
              <Icon name={action.icon as any} color={action.color} size={20} className="mr-2" />
              <span className="text-sm">{action.text}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Financial Health Score */}
      <Card variant="elevated" className="bg-gradient-to-r from-blue-50 to-green-50">
        <div className="text-center">
          <h3 className="font-medium mb-2">Financial Health Score</h3>
          <div className="text-4xl font-bold text-green-600 mb-2">7.5/10</div>
          <p className="text-sm text-gray-600 mb-4">Good financial standing</p>
          <div className="flex justify-center space-x-4 text-xs">
            <div className="text-center">
              <div className="font-medium text-green-600">Savings</div>
              <div className="text-gray-600">Excellent</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-yellow-600">Budget</div>
              <div className="text-gray-600">Good</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-orange-600">Debt</div>
              <div className="text-gray-600">Fair</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
