import React from 'react';
import { Card } from '../design-system/Card';
import { Button } from '../design-system/Button';
import { Badge } from '../design-system/Badge';
import { Icon } from '../design-system/Icon';
import { ProgressBar } from '../design-system/ProgressBar';
export const LiteracyPage: React.FC = () => {
  const modules = [{
    title: 'Budgeting Basics',
    description: 'Learn how to create and stick to a budget',
    progress: 100,
    duration: '5 min',
    completed: true
  }, {
    title: 'Saving Strategies',
    description: 'Simple techniques to save money daily',
    progress: 60,
    duration: '8 min',
    completed: false
  }, {
    title: 'Understanding Loans',
    description: 'What you need to know before borrowing',
    progress: 0,
    duration: '10 min',
    completed: false,
    locked: true
  }, {
    title: 'Growing Your Business',
    description: 'Financial tips for small business owners',
    progress: 0,
    duration: '12 min',
    completed: false,
    locked: true
  }];
  return <div className="p-4 space-y-6">
      <div className="bg-[#228B22] text-white p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-1">Financial Literacy</h2>
        <p className="text-sm opacity-90 mb-4">
          Learn essential money skills through simple lessons
        </p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-80">Your progress</p>
            <div className="flex items-center">
              <span className="text-xl font-bold mr-2">2/8</span>
              <span className="text-sm">Modules</span>
            </div>
          </div>
          <Badge text="Level: Beginner" variant="secondary" className="border border-white" />
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="font-medium">Continue Learning</h3>
        {modules.map((module, index) => <Card key={index} className={module.locked ? 'opacity-70' : ''}>
            <div className="flex">
              <div className="mr-3 bg-[#FFD700] bg-opacity-20 p-2 rounded-lg">
                <Icon name="literacy" color="#FFD700" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">{module.title}</h4>
                  {module.completed ? <Badge text="Completed" variant="success" size="sm" /> : <span className="text-xs text-gray-500">
                      {module.duration}
                    </span>}
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {module.description}
                </p>
                {!module.completed && !module.locked && <div className="mt-2">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>{module.progress}%</span>
                    </div>
                    <ProgressBar progress={module.progress} size="sm" />
                  </div>}
                <div className="mt-3 flex">
                  {module.locked ? <div className="flex items-center text-sm text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                      <span className="ml-1">
                        Complete previous modules to unlock
                      </span>
                    </div> : module.completed ? <Button variant="secondary" size="sm">
                      Review
                    </Button> : <Button variant="primary" size="sm">
                      {module.progress > 0 ? 'Continue' : 'Start'}
                    </Button>}
                </div>
              </div>
            </div>
          </Card>)}
      </div>
      <div>
        <h3 className="font-medium mb-2">Your Achievements</h3>
        <div className="flex space-x-3 overflow-x-auto py-2">
          {[{
          name: 'First Lesson',
          icon: 'literacy',
          color: '#FFD700'
        }, {
          name: 'Budget Master',
          icon: 'budgeting',
          color: '#87CEEB'
        }].map((badge, index) => <div key={index} className="flex flex-col items-center w-20">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center bg-opacity-20`} style={{
            backgroundColor: `${badge.color}30`
          }}>
                <Icon name={badge.icon as any} color={badge.color} />
              </div>
              <span className="text-xs text-center mt-1">{badge.name}</span>
            </div>)}
          {[1, 2].map((_, index) => <div key={index} className="flex flex-col items-center w-20">
              <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M2 12h20"></path>
                </svg>
              </div>
              <span className="text-xs text-center mt-1">Locked</span>
            </div>)}
        </div>
      </div>
    </div>;
};