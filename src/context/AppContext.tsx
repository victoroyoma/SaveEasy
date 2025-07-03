import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { User, SavingsGoal, Transaction, Group, BillPayment, Notification, LiteracyModule, Challenge, Analytics } from '../types';
import { 
  mockUser, 
  mockSavingsGoals, 
  mockTransactions, 
  mockGroups, 
  mockBillPayments, 
  mockNotifications, 
  mockLiteracyModules, 
  mockChallenges, 
  mockAnalytics 
} from '../data/mockData';

// State interface
interface AppState {
  user: User;
  savingsGoals: SavingsGoal[];
  transactions: Transaction[];
  groups: Group[];
  billPayments: BillPayment[];
  notifications: Notification[];
  literacyModules: LiteracyModule[];
  challenges: Challenge[];
  analytics: Analytics;
  isLoading: boolean;
  error: string | null;
}

// Action types
type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'UPDATE_USER'; payload: Partial<User> }
  | { type: 'ADD_SAVINGS_GOAL'; payload: SavingsGoal }
  | { type: 'UPDATE_SAVINGS_GOAL'; payload: { id: string; updates: Partial<SavingsGoal> } }
  | { type: 'DELETE_SAVINGS_GOAL'; payload: string }
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'UPDATE_TRANSACTION'; payload: { id: string; updates: Partial<Transaction> } }
  | { type: 'ADD_BILL_PAYMENT'; payload: BillPayment }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'UPDATE_MODULE_PROGRESS'; payload: { id: string; progress: number; completed?: boolean } }
  | { type: 'JOIN_CHALLENGE'; payload: string }
  | { type: 'UPDATE_CHALLENGE_PROGRESS'; payload: { id: string; amount: number } }
  | { type: 'REFRESH_ANALYTICS' };

// Initial state
const initialState: AppState = {
  user: mockUser,
  savingsGoals: mockSavingsGoals,
  transactions: mockTransactions,
  groups: mockGroups,
  billPayments: mockBillPayments,
  notifications: mockNotifications,
  literacyModules: mockLiteracyModules,
  challenges: mockChallenges,
  analytics: mockAnalytics,
  isLoading: false,
  error: null
};

// Reducer
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };
    
    case 'ADD_SAVINGS_GOAL':
      return {
        ...state,
        savingsGoals: [...state.savingsGoals, action.payload]
      };
    
    case 'UPDATE_SAVINGS_GOAL':
      return {
        ...state,
        savingsGoals: state.savingsGoals.map(goal =>
          goal.id === action.payload.id
            ? { ...goal, ...action.payload.updates }
            : goal
        )
      };
    
    case 'DELETE_SAVINGS_GOAL':
      return {
        ...state,
        savingsGoals: state.savingsGoals.filter(goal => goal.id !== action.payload)
      };
    
    case 'ADD_TRANSACTION':
      const newTransaction = action.payload;
      let updatedGoals = state.savingsGoals;
      let updatedUser = state.user;
      
      // Update related goals and user totals
      if (newTransaction.goalId) {
        updatedGoals = state.savingsGoals.map(goal =>
          goal.id === newTransaction.goalId
            ? { ...goal, currentAmount: goal.currentAmount + newTransaction.amount }
            : goal
        );
      }
      
      if (newTransaction.type === 'deposit') {
        updatedUser = {
          ...state.user,
          totalSavings: state.user.totalSavings + newTransaction.amount
        };
      } else if (newTransaction.type === 'withdrawal') {
        updatedUser = {
          ...state.user,
          totalSavings: Math.max(0, state.user.totalSavings - newTransaction.amount)
        };
      }
      
      return {
        ...state,
        transactions: [newTransaction, ...state.transactions],
        savingsGoals: updatedGoals,
        user: updatedUser
      };
    
    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map(transaction =>
          transaction.id === action.payload.id
            ? { ...transaction, ...action.payload.updates }
            : transaction
        )
      };
    
    case 'ADD_BILL_PAYMENT':
      return {
        ...state,
        billPayments: [action.payload, ...state.billPayments]
      };
    
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload
            ? { ...notification, read: true }
            : notification
        )
      };
    
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [action.payload, ...state.notifications]
      };
    
    case 'UPDATE_MODULE_PROGRESS':
      return {
        ...state,
        literacyModules: state.literacyModules.map(module =>
          module.id === action.payload.id
            ? { 
                ...module, 
                progress: action.payload.progress,
                completed: action.payload.completed ?? module.completed
              }
            : module
        )
      };
    
    case 'JOIN_CHALLENGE':
      return {
        ...state,
        challenges: state.challenges.map(challenge =>
          challenge.id === action.payload
            ? { ...challenge, participants: challenge.participants + 1 }
            : challenge
        )
      };
    
    case 'UPDATE_CHALLENGE_PROGRESS':
      return {
        ...state,
        challenges: state.challenges.map(challenge =>
          challenge.id === action.payload.id
            ? { ...challenge, currentAmount: Math.min(challenge.targetAmount, challenge.currentAmount + action.payload.amount) }
            : challenge
        )
      };
    
    case 'REFRESH_ANALYTICS':
      // Recalculate analytics based on current data
      const totalSavings = state.user.totalSavings;
      const monthlyTransactions = state.transactions.filter(t => {
        const transactionDate = new Date(t.date);
        const currentMonth = new Date().getMonth();
        return transactionDate.getMonth() === currentMonth;
      });
      
      const monthlyExpenses = monthlyTransactions
        .filter(t => t.type === 'bill_payment' || t.type === 'withdrawal')
        .reduce((sum, t) => sum + t.amount, 0);
      
      return {
        ...state,
        analytics: {
          ...state.analytics,
          totalSavings,
          monthlyExpenses
        }
      };
    
    default:
      return state;
  }
};

// Context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

// Provider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// Action creators
export const useAppActions = () => {
  const { dispatch } = useAppContext();

  return {
    setLoading: (loading: boolean) => dispatch({ type: 'SET_LOADING', payload: loading }),
    setError: (error: string | null) => dispatch({ type: 'SET_ERROR', payload: error }),
    updateUser: (updates: Partial<User>) => dispatch({ type: 'UPDATE_USER', payload: updates }),
    addSavingsGoal: (goal: SavingsGoal) => dispatch({ type: 'ADD_SAVINGS_GOAL', payload: goal }),
    updateSavingsGoal: (id: string, updates: Partial<SavingsGoal>) => 
      dispatch({ type: 'UPDATE_SAVINGS_GOAL', payload: { id, updates } }),
    deleteSavingsGoal: (id: string) => dispatch({ type: 'DELETE_SAVINGS_GOAL', payload: id }),
    addTransaction: (transaction: Transaction) => dispatch({ type: 'ADD_TRANSACTION', payload: transaction }),
    updateTransaction: (id: string, updates: Partial<Transaction>) => 
      dispatch({ type: 'UPDATE_TRANSACTION', payload: { id, updates } }),
    addBillPayment: (payment: BillPayment) => dispatch({ type: 'ADD_BILL_PAYMENT', payload: payment }),
    markNotificationRead: (id: string) => dispatch({ type: 'MARK_NOTIFICATION_READ', payload: id }),
    addNotification: (notification: Notification) => dispatch({ type: 'ADD_NOTIFICATION', payload: notification }),
    updateModuleProgress: (id: string, progress: number, completed?: boolean) => 
      dispatch({ type: 'UPDATE_MODULE_PROGRESS', payload: { id, progress, completed } }),
    joinChallenge: (id: string) => dispatch({ type: 'JOIN_CHALLENGE', payload: id }),
    updateChallengeProgress: (id: string, amount: number) => 
      dispatch({ type: 'UPDATE_CHALLENGE_PROGRESS', payload: { id, amount } }),
    refreshAnalytics: () => dispatch({ type: 'REFRESH_ANALYTICS' })
  };
};
