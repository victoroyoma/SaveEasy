import { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { BackgroundPattern } from './components/design-system/BackgroundPattern';
import { Header } from './components/layout/Header';
import { Navigation } from './components/layout/Navigation';
import { Dashboard } from './components/screens/Dashboard';
import { SavingsPage } from './components/screens/SavingsPage';
import { LiteracyPage } from './components/screens/LiteracyPage';
import { GroupSavingsPage } from './components/screens/GroupSavingsPage';
import { BillPaymentsPage } from './components/screens/BillPaymentsPage';
import { TransactionsPage } from './components/screens/TransactionsPage';
import { AnalyticsPage } from './components/screens/AnalyticsPage';
import { ProfilePage } from './components/screens/ProfilePage';
import { NotificationsPage } from './components/screens/NotificationsPage';
import { AIAssistantPage } from './components/screens/AIAssistantPage';
import { BudgetPage } from './components/screens/BudgetPage';
import { InvestmentPage } from './components/screens/InvestmentPage';
import { LoanPage } from './components/screens/LoanPage';
import { MarketplacePage } from './components/screens/MarketplacePage';
import { VoiceBankingPage } from './components/screens/VoiceBankingPage';
import { CryptoPage } from './components/screens/CryptoPage';
import { IconType } from './components/design-system/Icon';
import { StyleGuide } from './components/design-system/StyleGuide';
import { DemoCenter } from './components/design-system/DemoCenter';

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<string>('dashboard');

  const navItems = [{
    name: 'Home',
    icon: 'home' as IconType,
    active: currentScreen === 'dashboard',
    onClick: () => setCurrentScreen('dashboard')
  }, {
    name: 'Save',
    icon: 'savings' as IconType,
    active: currentScreen === 'savings',
    onClick: () => setCurrentScreen('savings')
  }, {
    name: 'AI',
    icon: 'literacy' as IconType,
    active: currentScreen === 'ai-assistant',
    onClick: () => setCurrentScreen('ai-assistant')
  }, {
    name: 'Invest',
    icon: 'crypto' as IconType,
    active: currentScreen === 'investments',
    onClick: () => setCurrentScreen('investments')
  }, {
    name: 'More',
    icon: 'profile' as IconType,
    active: ['budget', 'loans', 'marketplace', 'voice', 'crypto'].includes(currentScreen),
    onClick: () => setCurrentScreen('profile')
  }];

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentScreen} />;
      case 'savings':
        return <SavingsPage />;
      case 'literacy':
        return <LiteracyPage />;
      case 'groups':
        return <GroupSavingsPage />;
      case 'bills':
        return <BillPaymentsPage />;
      case 'transactions':
        return <TransactionsPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'profile':
        return <ProfilePage onNavigate={setCurrentScreen} />;
      case 'notifications':
        return <NotificationsPage />;
      case 'ai-assistant':
        return <AIAssistantPage />;
      case 'budget':
        return <BudgetPage />;
      case 'investments':
        return <InvestmentPage />;
      case 'loans':
        return <LoanPage />;
      case 'marketplace':
        return <MarketplacePage />;
      case 'voice':
        return <VoiceBankingPage />;
      case 'crypto':
        return <CryptoPage />;
      case 'demo':
        return <DemoCenter />;
      case 'styleguide':
        return <StyleGuide />;
      default:
        return <Dashboard onNavigate={setCurrentScreen} />;
    }
  };

  const getScreenTitle = () => {
    switch (currentScreen) {
      case 'dashboard': return 'SaveEasy Africa';
      case 'savings': return 'Save Money';
      case 'literacy': return 'Financial Literacy';
      case 'groups': return 'Group Savings';
      case 'bills': return 'Pay Bills';
      case 'transactions': return 'Transaction History';
      case 'analytics': return 'Financial Analytics';
      case 'profile': return 'Profile';
      case 'notifications': return 'Notifications';
      case 'ai-assistant': return 'AI Financial Assistant';
      case 'budget': return 'Budget Manager';
      case 'investments': return 'Investment Portfolio';
      case 'loans': return 'Loan Management';
      case 'marketplace': return 'Marketplace';
      case 'voice': return 'Voice Banking';
      case 'crypto': return 'Crypto Wallet';
      case 'demo': return 'Demo Center - Investor Preview';
      case 'styleguide': return 'Style Guide';
      default: return 'SaveEasy Africa';
    }
  };

  // Pattern variant based on current screen
  const getPatternVariant = () => {
    switch (currentScreen) {
      case 'savings':
        return 'savings';
      case 'literacy':
        return 'literacy';
      case 'bills':
        return 'marketplace';
      default:
        return 'default';
    }
  };

  return (
    <BackgroundPattern variant={getPatternVariant()} className="min-h-screen pb-16">
      <Header 
        title={getScreenTitle()}
        showBackButton={currentScreen !== 'dashboard'} 
        onBackClick={() => setCurrentScreen('dashboard')}
        onProfileClick={() => setCurrentScreen('profile')}
      />
      <main className="max-w-md mx-auto bg-white shadow-sm min-h-screen">
        {renderScreen()}
      </main>
      <Navigation items={navItems} />
    </BackgroundPattern>
  );
}

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}