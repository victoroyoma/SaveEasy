import React from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { Icon } from './Icon';
import { Badge } from './Badge';
import { ProgressBar } from './ProgressBar';
import { BackgroundPattern } from './BackgroundPattern';
import { LoadingSpinner } from './LoadingSpinner';
import { NotificationBadge } from './NotificationBadge';
import { Logo } from './Logo';
export const StyleGuide: React.FC = () => {
  return <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        SaveEasy Africa UI Style Guide
      </h1>
      {/* Colors */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="h-20 bg-[#228B22] rounded-lg"></div>
            <p className="text-sm font-medium">Primary - Forest Green</p>
            <p className="text-xs text-gray-500">#228B22</p>
          </div>
          <div className="space-y-2">
            <div className="h-20 bg-[#FFD700] rounded-lg"></div>
            <p className="text-sm font-medium">Secondary - Golden Yellow</p>
            <p className="text-xs text-gray-500">#FFD700</p>
          </div>
          <div className="space-y-2">
            <div className="h-20 bg-[#87CEEB] rounded-lg"></div>
            <p className="text-sm font-medium">Accent - Sky Blue</p>
            <p className="text-xs text-gray-500">#87CEEB</p>
          </div>
          <div className="space-y-2">
            <div className="h-20 bg-[#FF4040] rounded-lg"></div>
            <p className="text-sm font-medium">Emergency - Coral Red</p>
            <p className="text-xs text-gray-500">#FF4040</p>
          </div>
        </div>
      </section>
      {/* Typography */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Typography</h2>
        <div className="space-y-4 bg-white p-4 rounded-lg">
          <div>
            <h1 className="text-2xl font-bold">Heading 1 - 24px</h1>
            <p className="text-sm text-gray-500">Font: Inter or Roboto, Bold</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Heading 2 - 20px</h2>
            <p className="text-sm text-gray-500">
              Font: Inter or Roboto, Semibold
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium">Heading 3 - 18px</h3>
            <p className="text-sm text-gray-500">
              Font: Inter or Roboto, Medium
            </p>
          </div>
          <div>
            <p className="text-base">Body Text - 16px</p>
            <p className="text-sm text-gray-500">
              Font: Inter or Roboto, Regular
            </p>
          </div>
          <div>
            <p className="text-sm">Secondary Text - 14px</p>
            <p className="text-sm text-gray-500">
              Font: Inter or Roboto, Regular
            </p>
          </div>
          <div>
            <p className="text-xs">Fine Print - 12px</p>
            <p className="text-sm text-gray-500">
              Font: Inter or Roboto, Regular
            </p>
          </div>
        </div>
      </section>
      {/* Logos */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Logo</h2>
        <div className="flex flex-wrap gap-8 bg-white p-4 rounded-lg">
          <div className="flex flex-col items-center">
            <Logo variant="full" size="lg" />
            <p className="text-sm mt-2">Full Logo</p>
          </div>
          <div className="flex flex-col items-center">
            <Logo variant="icon" size="lg" />
            <p className="text-sm mt-2">Icon Only</p>
          </div>
          <div className="flex flex-col items-center">
            <Logo variant="text" size="lg" />
            <p className="text-sm mt-2">Text Only</p>
          </div>
        </div>
      </section>
      {/* Icons */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Icons</h2>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4 bg-white p-4 rounded-lg">
          {[{
          name: 'savings',
          label: 'Savings'
        }, {
          name: 'literacy',
          label: 'Literacy'
        }, {
          name: 'community',
          label: 'Community'
        }, {
          name: 'bills',
          label: 'Bills'
        }, {
          name: 'budgeting',
          label: 'Budgeting'
        }, {
          name: 'offline',
          label: 'Offline'
        }, {
          name: 'goals',
          label: 'Goals'
        }, {
          name: 'notifications',
          label: 'Notifications'
        }, {
          name: 'profile',
          label: 'Profile'
        }, {
          name: 'home',
          label: 'Home'
        }, {
          name: 'crypto',
          label: 'Crypto'
        }, {
          name: 'loans',
          label: 'Loans'
        }, {
          name: 'marketplace',
          label: 'Marketplace'
        }, {
          name: 'challenges',
          label: 'Challenges'
        }, {
          name: 'emergency',
          label: 'Emergency'
        }].map(icon => <div key={icon.name} className="flex flex-col items-center p-2">
              <Icon name={icon.name as any} size={32} />
              <p className="text-xs mt-2">{icon.label}</p>
            </div>)}
        </div>
      </section>
      {/* Buttons */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Buttons</h2>
        <div className="space-y-6 bg-white p-4 rounded-lg">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Button Variants</h3>
            <div className="flex flex-wrap gap-2">
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="text">Text Button</Button>
              <Button variant="emergency">Emergency Button</Button>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Button Sizes</h3>
            <div className="flex flex-wrap gap-2 items-center">
              <Button size="xs">Extra Small</Button>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Button with Icons</h3>
            <div className="flex flex-wrap gap-2">
              <Button icon={<Icon name="savings" size={18} color="white" />}>
                Save Money
              </Button>
              <Button variant="secondary" icon={<Icon name="literacy" size={18} color="#333333" />}>
                Learn More
              </Button>
              <Button variant="outline" icon={<Icon name="community" size={18} />}>
                Join Group
              </Button>
              <Button variant="emergency" icon={<Icon name="emergency" size={18} color="white" />}>
                Emergency Fund
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Button States</h3>
            <div className="flex flex-wrap gap-2">
              <Button>Default</Button>
              <Button disabled>Disabled</Button>
              <Button loading>Loading</Button>
              <Button fullWidth>Full Width Button</Button>
            </div>
          </div>
        </div>
      </section>
      {/* Cards */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card variant="savings" title="Savings Balance" subtitle="Your progress towards goals">
            <div className="text-center py-2">
              <h2 className="text-3xl font-bold my-2">₦5,000</h2>
              <ProgressBar progress={65} color="#FFD700" showValue={true} currentValue={5000} targetValue={7500} size="md" />
              <div className="mt-4 flex justify-center gap-2">
                <Button variant="outline" size="sm" className="border-white text-white hover:bg-white hover:bg-opacity-20">
                  Withdraw
                </Button>
                <Button variant="outline" size="sm" className="border-white text-white hover:bg-white hover:bg-opacity-20">
                  Add Money
                </Button>
              </div>
            </div>
          </Card>
          <Card variant="literacy" title="Financial Literacy" subtitle="Learn essential skills" icon={<Icon name="literacy" size={24} />}>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Budgeting Basics</h4>
                <p className="text-sm text-gray-600">5 min audio lesson</p>
              </div>
              <Button variant="secondary" size="sm">
                Play
              </Button>
            </div>
            <div className="mt-3">
              <ProgressBar progress={60} variant="challenge" size="sm" />
              <p className="text-xs text-gray-500 mt-1">60% complete</p>
            </div>
          </Card>
          <Card variant="group" title="Market Traders Group" subtitle="12 members" icon={<Icon name="community" size={24} />}>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm">Weekly contribution</p>
                <p className="font-medium">₦1,000</p>
              </div>
              <Badge text="Active" variant="success" size="sm" />
            </div>
            <div className="mt-3">
              <p className="text-sm text-gray-600">
                Next contribution: Tomorrow
              </p>
            </div>
          </Card>
          <Card variant="emergency" title="Emergency Fund" subtitle="Quick access for urgent needs" icon={<Icon name="emergency" size={24} color="#FF4040" />}>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">₦2,000</h3>
              <p className="text-sm text-gray-600 mb-3">
                Available for emergencies
              </p>
              <Button variant="emergency" size="sm">
                Withdraw
              </Button>
            </div>
          </Card>
        </div>
      </section>
      {/* Progress Bars & Badges */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Progress Bars & Badges</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-lg">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Progress Bars</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm mb-1">Savings Progress (65%)</p>
                <ProgressBar progress={65} variant="savings" />
              </div>
              <div>
                <p className="text-sm mb-1">Loan Repayment (40%)</p>
                <ProgressBar progress={40} variant="loan" />
              </div>
              <div>
                <p className="text-sm mb-1">Challenge Progress (80%)</p>
                <ProgressBar progress={80} variant="challenge" />
              </div>
              <div>
                <p className="text-sm mb-1">With Values</p>
                <ProgressBar progress={50} showValue={true} currentValue={2500} targetValue={5000} />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Badges</h3>
            <div className="flex flex-wrap gap-2">
              <Badge text="Active" variant="success" />
              <Badge text="Pending" variant="secondary" />
              <Badge text="New" variant="primary" />
              <Badge text="Emergency" variant="emergency" />
              <Badge text="Savings Star" variant="achievement" icon={<Icon name="savings" size={14} color="#333333" />} />
              <Badge text="Budget Master" variant="challenge" icon={<Icon name="budgeting" size={14} color="#333333" />} />
            </div>
          </div>
        </div>
      </section>
      {/* Background Patterns */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Background Patterns</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm mb-2">Default Pattern</p>
            <div className="h-32 rounded-lg overflow-hidden">
              <BackgroundPattern variant="default" />
            </div>
          </div>
          <div>
            <p className="text-sm mb-2">Marketplace Pattern</p>
            <div className="h-32 rounded-lg overflow-hidden">
              <BackgroundPattern variant="marketplace" />
            </div>
          </div>
          <div>
            <p className="text-sm mb-2">Literacy Pattern</p>
            <div className="h-32 rounded-lg overflow-hidden">
              <BackgroundPattern variant="literacy" />
            </div>
          </div>
          <div>
            <p className="text-sm mb-2">Savings Pattern</p>
            <div className="h-32 rounded-lg overflow-hidden">
              <BackgroundPattern variant="savings" />
            </div>
          </div>
        </div>
      </section>
      {/* Loading States & Notifications */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Loading States & Notifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-lg">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Loading Spinners</h3>
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col items-center">
                <LoadingSpinner size="sm" variant="primary" />
                <p className="text-xs mt-2">Small</p>
              </div>
              <div className="flex flex-col items-center">
                <LoadingSpinner size="md" variant="secondary" />
                <p className="text-xs mt-2">Medium</p>
              </div>
              <div className="flex flex-col items-center">
                <LoadingSpinner size="lg" variant="emergency" />
                <p className="text-xs mt-2">Large</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Notification Badges</h3>
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <Icon name="notifications" size={32} />
                  <NotificationBadge count={3} className="absolute -top-1 -right-1" />
                </div>
                <p className="text-xs mt-2">Count: 3</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="relative">
                  <Icon name="notifications" size={32} />
                  <NotificationBadge count={99} className="absolute -top-1 -right-1" />
                </div>
                <p className="text-xs mt-2">Count: 99</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="relative">
                  <Icon name="notifications" size={32} />
                  <NotificationBadge count={100} maxCount={99} className="absolute -top-1 -right-1" />
                </div>
                <p className="text-xs mt-2">Count: 100 (99+)</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>;
};